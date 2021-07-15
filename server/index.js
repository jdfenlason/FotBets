const dateFns = require('date-fns');
require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const pg = require('pg');
const app = express();

app.use(staticMiddleware);
const jsonMiddleWare = express.json();

app.use(jsonMiddleWare);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  const tokenAmount = 2000;
  if (!username || !password) {
    throw new ClientError(400, 'Username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword", "tokenAmount")
        values ($1, $2, $3)
        returning "userId", "username", "createdAt", "tokenAmount"
      `;
      const params = [username, hashedPassword, tokenAmount];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.json(user);
    })
    .catch(err => {
      if (err.code === '23505') {
        res.send(err.code);
      } else {
        next(err);
      }
    });
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'Invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword",
           "tokenAmount"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'Invalid login');
      }
      const { userId, hashedPassword, tokenAmount } = user;
      return argon2.verify(hashedPassword, password).then(isMatching => {
        if (!isMatching) {
          throw new ClientError(401, 'Invalid login');
        }
        const payload = { userId, username, tokenAmount };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        res.json({ token, user: payload });
      }).catch(err => res.send(err));
    })
    .catch(err => res.send(err));
});

app.patch('/api/token-amount', (req, res, next) => {
  const { userId, changeTokenAmount } = req.body.params;
  const sql = `
         update "users"
         set "tokenAmount" = $1
         where "userId" = $2
         returning "tokenAmount"
  `;
  const params = [changeTokenAmount, userId];
  db.query(sql, params)
    .then(result => {
      return res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/past-results', (req, res, next) => {
  const { dateString } = req.query;
  const plusOneDay = dateFns.addDays(dateFns.parseISO(dateString), 1);
  const utcDateFix = dateFns.format(plusOneDay, 'yyyy-MM-dd');
  const leagueId = 255;
  const sql = `
        select  "yesterdayGames"
        From "pastResults"
        where "leagueId" = $1
        and "date" = $2
        or "date" = $3
  `;
  const params = [leagueId, dateString, utcDateFix];
  db.query(sql, params).then(result => {
    if (result.rows.length) {
      return res.json(result.rows[0]);
    }
    Promise.all([
      getPastResults(leagueId, dateString),
      getPastResults(leagueId, utcDateFix)
    ]).then(pastResults => {
      const jsonPastResults = JSON.stringify(pastResults);
      const params = [dateString, leagueId, jsonPastResults];
      const sql = `
              insert into "pastResults" ("date", "leagueId", "yesterdayGames")
              values ($1, $2, $3)
              returning *`;
      db.query(sql, params).then(result => {
        return res.json(result.rows[0]);
      })
        .catch(err => next(err));
    });
  })
    .catch(err => next(err));
});

function postMatchWinners(yesterday, leagueId) {
  const sql = `
                select  "yesterdayGames"
                From "pastResults"
               where "date" = $1
              And "leagueId" = $2`;
  const params = [yesterday, leagueId];
  db.query(sql, params).then(result => {
    const betValidation = getPastResultsWinners(
      result.rows[0].yesterdayGames
    );
    return betValidation.forEach(betValidations => {
      const { fixtureId, winningTeamId, betResult } = betValidations;

      const sql = `
                      insert into "betValidation" ("fixtureId", "winningTeamId", "betResult", "date", "leagueId")
                      values($1, $2, $3, $4, $5)`;
      const params = [
        fixtureId,
        winningTeamId,
        betResult,
        yesterday,
        leagueId
      ];
      db.query(sql, params).then(result => {
        return result.rows;
      });
    });
  });
}

app.post('/api/bet-validation', (req, res, next) => {
  const leagueId = 255;
  const { yesterday } = req.body;
  const formatToday = getDateForResults();
  const sql = `
        select  "yesterdayGames"
        From "pastResults"
        where "date" = $1
        And "leagueId" = $2
  `;
  const params = [yesterday, leagueId];
  db.query(sql, params).then(result => {
    if (result.rows.length) {
      return res.json(result.rows[0]);
    }
    Promise.all([
      getPastResults(leagueId, yesterday),
      getPastResults(leagueId, formatToday)
    ])
      .then(pastResults => {
        const jsonPastResults = JSON.stringify(pastResults);
        const params = [yesterday, leagueId, jsonPastResults];
        const sql = `
              insert into "pastResults" ("date", "leagueId", "yesterdayGames")
              values ($1, $2, $3)
              returning *`;
        db.query(sql, params).then(result => {
          postMatchWinners(yesterday, leagueId);
          const sql = `
                      update "wagerInputs"
                      Set "betResult" = "betValidation"."betResult",
                      "betEvaluated" = $1
                      From "betValidation"
                      Where "wagerInputs"."fixtureId" = "betValidation"."fixtureId"
                      AND "wagerInputs"."betTeamId" = "betValidation"."winningTeamId"
                      returning "wagerInputs"."betResult"`;
          const betEvaluated = true;
          const params = [betEvaluated];
          db.query(sql, params).then(result => {
            const sql = `
 update "users"
  SET "tokenAmount" = "tokenAmount" + "v"."amountProfit"
  FROM "wagerInputs", (
    SELECT "wagerInputs"."userId" as "idUser",
    "wagerInputs"."profitAmount" AS "amountProfit"
    from "wagerInputs", "users"
    where "wagerInputs"."userId" = "users"."userId"
    and "betResult" = $1
    And "date" = $2
    Group by "wagerInputs"."betId"
    ) "v"
    where "users"."userId" = "v"."idUser"
    returning "users"."tokenAmount", "v"."idUser", "v"."amountProfit", "wagerInputs"."profitAmount"
    `
                      ;
            const betResult = true;
            const params = [betResult, yesterday];
            db
              .query(sql, params)
              .then(result => {
                return res.json(result.rows);
              });
          });
        });
      });
    return res.json(result.rows);
  })
    .catch(err => next(err));
});

app.get('/api/leaderboard/rank', (req, res, next) => {
  const { tokenAmount } = req.query;
  const sql = `
              Select (count ("userId") + 1) as rank
              From "users"
              where "tokenAmount" > $1

              `;
  const params = [tokenAmount];
  db.query(sql, params)
    .then(result => {
      const dbresult = result.rows;

      res.json(dbresult);
    })
    .catch(err => next(err));
});

app.get('/api/leaderboard', (req, res, next) => {
  const sql = `
              select "username", "tokenAmount"
              From "users"
              Order by
              "tokenAmount" DESC
              limit 10`;
  db.query(sql)
    .then(result => {
      const dbresult = result.rows;
      res.json(dbresult);
    })
    .catch(err => next(err));
});

app.get('/api/user-profile/past-bets', (req, res, next) => {
  const { userId } = req.query;
  const sql = ` select *
  From "wagerInputs"
  where "userId" = $1
  Order By
  "createdAt" DESC
  limit 3
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const dbresult = result.rows;
      res.json(dbresult);
    })
    .catch(err => next(err));
});

app.get('/api/week-games', (req, res, next) => {
  const leagueId = 255;
  const { year, firstDay } = getNewWeek();
  const sql = ` select *
  From "weekGames"
  where "leagueId" = $1
  AND   "firstDay" = $2
  `;
  const params = [leagueId, firstDay];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length) {
        return result.rows[0];
      }
      return getCurrentRound(year, leagueId)
        .then(currentRound => {
          return getCurrentFixtures(currentRound, year, leagueId);
        })
        .then(currentFixtures => {
          const jsonFixtures = JSON.stringify(currentFixtures);
          const params = [jsonFixtures, firstDay, leagueId];
          const sql = `
      insert  into "weekGames" ("fixtures", "firstDay","leagueId")
      values ($1, $2, $3)
      returning *
      `;
          return db.query(sql, params).then(result => {
            return result.rows[0];
          });
        });
    })
    .then(round => {
      res.json(round);
    })
    .catch(err => next(err));
});
app.post('/api/wager-input', (req, res, next) => {
  const { userId, fixtureId, wagerAmount, profitAmount, betTeamId, teamLogo, selectedDay } =
    req.body.newWager;
  const betResult = false;
  const betEvaluated = false;
  const sql = `
  insert into "wagerInputs" ("userId", "fixtureId", "wagerAmount", "profitAmount", "betTeamId", "teamLogo", "betResult", "date", "betEvaluated")
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;
  const params = [
    userId,
    fixtureId,
    wagerAmount,
    profitAmount,
    betTeamId,
    teamLogo,
    betResult,
    selectedDay,
    betEvaluated
  ];
  db.query(sql, params)
    .then(result => {
      return res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/wager-input', (req, res, next) => {
  const { userId } = req.query;
  const sql = `
  select "fixtureId"
  from "wagerInputs"
  Where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const dbresult = result.rows;
      const gamesBetOn = dbresult.map(fixturesId => {
        return fixturesId.fixtureId;
      });

      res.json(gamesBetOn);
    })
    .catch(err => next(err));
});

app.get('/api/user-profile', (req, res, next) => {
  const { userId } = req.query;
  const sql = `
  select "tokenAmount", "username"
  From "users"
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/team-form', (req, res, next) => {
  const { fixtureId, leagueId, awayId, homeId, utcDate } = req.query;
  const sql = `
    select *
    from "teamForm"
    where "date" = $1 AND
    "fixtureId" = $2
  `;
  const params = [utcDate, fixtureId];
  return db
    .query(sql, params)
    .then(result => {
      if (result.rows.length) {
        return res.json(result.rows);
      }
      return Promise.all([
        getTeamStats(req.query, homeId),
        getTeamStats(req.query, awayId)
      ]).then(response => {
        const jsonTeamDetails = JSON.stringify(response);
        const awayOdds = randomOdds(1, 6, 2);
        const homeOdds = randomOdds(1, 4, 2);
        const sql = `
      insert into "teamForm" ("date", "leagueId", "fixtureId", "homeId", "homeOdds", "awayOdds", "awayId", "teamDetails")
      values ($1, $2, $3, $4, $5, $6, $7, $8)
      returning "teamDetails", "awayOdds", "homeOdds"
      `;
        const params = [
          utcDate,
          leagueId,
          fixtureId,
          homeId,
          homeOdds,
          awayOdds,
          awayId,
          jsonTeamDetails
        ];
        return db.query(sql, params).then(result => {
          return res.json(result.rows);
        });
      });
    })
    .catch(err => next(err));
});

function getPastResultsWinners(pastFixtures) {
  const flattenResults = pastFixtures.flat(1);
  const mappedResults = flattenResults.map(yesterdayGames => {
    let winner;
    let betResult;

    if (yesterdayGames.teams.away.winner) {
      winner = yesterdayGames.teams.away.id;
      betResult = true;
    }
    if (yesterdayGames.teams.home.winner) {
      winner = yesterdayGames.teams.home.id;
      betResult = true;
    }
    if (
      !yesterdayGames.teams.home.winner &&
      !yesterdayGames.teams.away.winner
    ) {
      winner = 0;
      betResult = false;
    }
    const resultObj = {
      fixtureId: yesterdayGames.fixture.id,
      winningTeamId: winner,
      betResult: betResult
    };
    return resultObj;
  });
  return mappedResults;
}
function getDateForResults() {
  const today = new Date();
  const formatToday = dateFns.format(today, 'yyyy-MM-dd');
  return formatToday;
}

function getNewWeek() {
  const today = new Date();
  const year = today.getFullYear();
  const dayOfWeek = today.getDay();
  const daysSinceTuesday = dayOfWeek < 2 ? 2 - dayOfWeek - 7 : 2 - dayOfWeek;
  const firstDay = dateFns.addDays(today, daysSinceTuesday);
  const newWeek = {
    year: year,
    firstDay: firstDay
  };
  return newWeek;
}

const randomOdds = (min, max, decimalPlaces) => {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
};

function getPastResults(leagueId, date) {
  const { year } = getNewWeek();
  const init = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: { league: leagueId, date: date, season: year, status: 'FT' },
    headers: {
      'x-rapidapi-key': process.env.API_FOOTBALL_API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
  return axios.request(init).then(response => {
    return response.data.response;
  });
}

function getCurrentRound(currentYear, leagueId) {
  const init = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds',
    params: { league: leagueId, season: currentYear, current: 'true' },
    headers: {
      'x-rapidapi-key': process.env.API_FOOTBALL_API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
  return axios.request(init).then(response => {
    return response.data.response.pop();
  });
}

function getCurrentFixtures(round, currentSeason, leagueId) {
  const init = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: { league: leagueId, season: currentSeason, round: round },
    headers: {
      'x-rapidapi-key': process.env.API_FOOTBALL_API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
  return axios.request(init).then(response => {
    return response.data.response;
  });
}

function getTeamStats(obj, teamId) {
  const init = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
    params: {
      league: obj.leagueId,
      season: obj.currentSeason,
      team: teamId,
      date: obj.date
    },
    headers: {
      'x-rapidapi-key': process.env.API_FOOTBALL_API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
  return axios.request(init).then(response => {
    return response.data.response;
  });
}

app.use(errorMiddleware);

app.use(staticMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

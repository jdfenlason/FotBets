const dateFns = require('date-fns');
require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
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

app.patch('/api/token-amount', (req, res, next) => {
  const { userId, changeTokenAmount } = req.body.params;
  const sql = `
  update "users"
  set "tokenAmount" = $1
  where "userId" = $2
  returning "tokenAmount"
  `;
  const params = [changeTokenAmount, userId];
  db.query(sql, params).then(result => {
    res.json(result.rows[0]);
  }).catch(err => (next(err)));
});

// create function that grabs the result.rows.yesterdayGames and then creates an object that has the fixtureId and the winnerId if both false then game was draw. No betId to be sent.
function getPastResultsWinners(pastFixtures) {
  const mappedResults = pastFixtures.map(yesterdayGames => {
    let winner;
    if (yesterdayGames.teams.away.winner) {
      winner = yesterdayGames.teams.away.id;
    }
    if (yesterdayGames.teams.home.winner) {
      winner = yesterdayGames.teams.home.id;
    } else {
      winner = false;
    }
    const resultObj = {
      fixturesId: yesterdayGames.fixture.id,
      winningTeamId: winner
    };
    return resultObj;
  });
  return mappedResults;
}

app.get('/api/past-results', (req, res, next) => {
  const leagueId = 255;
  const formatDay = getDateForResults();
  const sql = `select  "yesterdayGames"
  From "pastResults"
  where "date" = $1
  And "leagueId" = $2
  `;
  const params = [formatDay[2], leagueId];
  db.query(sql, params).then(result => {
    if (result.rows.length) {
      getPastResultsWinners(result.rows[0].yesterdayGames);
      return res.json(result.rows[0]);
    }
    return Promise.all([
      getPastResults(leagueId, formatDay[0]),
      getPastResults(leagueId, formatDay[1]),
      getPastResults(leagueId, formatDay[2])
    ]).then(pastResults => {
      const flattenGames = pastResults.flat(1);
      const jsonPastResults = JSON.stringify(flattenGames);
      const params = [formatDay[2], leagueId, jsonPastResults];
      const sql = `
      insert into "pastResults" ("date", "leagueId", "yesterdayGames")
      values ($1, $2, $3)
      returning *
    `;
      db.query(sql, params).then(results => {
        res.json(results.rows[0]);
      });
    });
  })
    .catch(err => (next(err)));
});

function getDateForResults() {
  const today = new Date();
  const dayNums = [3, 2, 1];
  const newFormattedDays = dayNums.map(format => {
    const subtract = dateFns.subDays(today, format);
    const formatDay = dateFns.format(subtract, 'yyyy-MM-dd');
    return formatDay;
  });
  return newFormattedDays;
}

function getPastResults(leagueId, date) {
  const { year } = getNewWeek();
  const init = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: { league: leagueId, date: date, season: year },
    headers: {
      'x-rapidapi-key': process.env.API_FOOTBALL_API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
  return axios.request(init).then(response => {
    return response.data.response;
  });
}

app.get('/api/leaderboard', (req, res, next) => {
  const sql = `
  select "userName", "tokenAmount"
  From "users"
  Order by
  "tokenAmount" DESC
  limit 10
    `;
  db.query(sql).then(result => {
    const dbresult = result.rows;
    res.json(dbresult);
  }).catch(err => next(err));
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
  db.query(sql, params).then(result => {
    const dbresult = result.rows;
    res.json(dbresult);
  }).catch(err => next(err));
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
  const { userId, fixtureId, wagerAmount, profitAmount, betTeamId, teamLogo } =
  req.body.newWager;
  const betResult = 'Pending';
  const dateObj = new Date();
  const dateString = dateObj.toLocaleDateString();
  const date = dateString.slice(0, 4);
  const sql = `
  insert into "wagerInputs" ("userId", "fixtureId", "wagerAmount", "profitAmount", "betTeamId", "teamLogo", "betResult", "date")
  values ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  const params = [
    userId,
    fixtureId,
    wagerAmount,
    profitAmount,
    betTeamId,
    teamLogo,
    betResult,
    date
  ];
  db.query(sql, params)
    .then(result => {
      return res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/wager-input', (req, res, next) => {
  const sql = `
  select "fixtureId"
  from "wagerInputs" `;

  db.query(sql)
    .then(result => {
      const dbresult = result.rows;
      const gamesBetOn = dbresult.map(fixturesId => {
        return fixturesId.fixtureId;
      }
      );

      res.json(gamesBetOn);
    })
    .catch(err => next(err));
});

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

app.get('/api/user-profile', (req, res, next) => {
  const { userId } = req.query;
  const sql = `
  select "tokenAmount", "userName"
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
        return result.rows;
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
      returning "teamDetails"
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
          return result.rows[0];
        });
      });
    })
    .then(teamDetails => {
      return res.json(teamDetails);
    })
    .catch(err => next(err));
});

const randomOdds = (min, max, decimalPlaces) => {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
};
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

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

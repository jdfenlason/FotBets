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

function getNewWeek() {
  const today = new Date();
  const year = today.getFullYear();
  const dayOfWeek = today.getDay();
  const daysSinceTuesday = dayOfWeek < 2 ? 2 - dayOfWeek - 7 : 2 - dayOfWeek;
  const firstDay = dateFns.addDays(today, daysSinceTuesday);
  return [year, firstDay];
}

app.get('/api/odds/', (req, res, next) => {
  const { date, fixtureId } = req.query;
  const sql = `
  select "oddsDetails"
  from "weekOdds"
  Where "date" = $1
  `;
  const params = [date];
  db.query(sql, params).then(result => {
    if (result.rows.length) {
      return result.rows;
    }
    return getOdds(date).then(oddsDetails => {
      const jsonOddsDetails = JSON.stringify(oddsDetails);
      const sql = `
      insert into "weekOdds" ("date", "oddsDetails")
      values ($1, $2)
      returning "oddsDetails"
      `;
      const params = [date, jsonOddsDetails];
      return db
        .query(sql, params)
        .then(result => {
          const oddDetails = result.rows;
          const oddsDetailsMapped = oddDetails.map(oddsDetail => {
            const filteredOdds = oddsDetail.oddsDetails.filter(oddsDetails => {
              return oddsDetails.fixture.id === fixtureId;
            });
            return filteredOdds;
          });
          const flatten = oddsDetailsMapped.flat(1);
          return res.json(flatten);
        });
    });
  }).then(oddDetails => {
    const oddsDetailsMapped = oddDetails.map(oddsDetail => {
      const filteredOdds = oddsDetail.oddsDetails.filter(oddsDetails => {
        return Number(oddsDetails.fixture.id) === Number(fixtureId);
      });
      return filteredOdds;
    });
    const flatten = oddsDetailsMapped.flat(1);
    return res.json(flatten);
  })
    .catch(err => next(err));
});

function getOdds(date) {
  const init = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
    params: { date: date },
    headers: {
      'x-rapidapi-key': process.env.API_FOOTBALL_API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
  return axios.request(init).then(response => {
    return response.data.response;
  });
}
app.get('/api/week-games/', (req, res, next) => {
  const leagueId = 30;
  const [year, firstDay] = getNewWeek();
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

app.get('/api/week-games/:date', (req, res, next) => {
  const sql = `
   select "fixtures"
      from "weekGames"
`;
  db.query(sql)
    .then(result => {
      const time = new Date();
      const formatDate = dateFns.format(time, 'yyyy-MM-dd');
      const dbresult = result.rows;
      const todayGames = dbresult.map(fixtures => {
        const filteredGames = fixtures.fixtures.filter(fixture => {
          return fixture.fixture.date.slice(0, 10) === formatDate;
        });
        return filteredGames;
      });
      const flatten = todayGames.flat(1);
      res.json(flatten);
    })
    .catch(err => next(err));
});

app.get('/api/team-form/', (req, res, next) => {
  const { fixtureId, leagueId, awayId, homeId, utcDate } = req.query;
  const sql = `
    select "teamDetails"
    from "teamForm"
    where "date" = $1 AND
    "fixtureId" = $2
  `;
  const params = [utcDate, fixtureId];
  return db.query(sql, params)
    .then(result => {
      if (result.rows.length) {
        return result.rows;
      }
      return Promise.all([
        getTeamStats(req.query, homeId),
        getTeamStats(req.query, awayId)
      ]).then(teamDetails => {
        const jsonTeamDetails = JSON.stringify(teamDetails);
        const sql = `
      insert into "teamForm" ("date", "leagueId", "fixtureId", "homeId", "awayId", "teamDetails")
      values ($1, $2, $3, $4, $5, $6)

      returning "teamDetails"
      `;
        const params = [
          utcDate,
          leagueId,
          fixtureId,
          homeId,
          awayId,
          jsonTeamDetails
        ];
        return db
          .query(sql, params)
          .then(result => {
            return result.rows[0];
          })
          .then(teamDetails => {
            return res.json(teamDetails);
          });
      });
    })
    .then(teamDetails => {
      return res.json(teamDetails);
    })
    .catch(err => next(err));
});

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

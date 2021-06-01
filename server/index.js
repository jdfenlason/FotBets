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

app.get('/api/week-games/', (req, res, next) => {
  const leagueId = 255;
  const today = new Date();
  const year = today.getFullYear();
  const dayOfWeek = today.getDay();
  const daysSinceTuesday = dayOfWeek < 2 ? 2 - dayOfWeek - 7 : 2 - dayOfWeek;
  const firstDay = dateFns.addDays(today, daysSinceTuesday);
  const sql =
` select *
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
        }).then(currentFixtures => {
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
    }).then(round => {
      res.json(round);
    }).catch(err => next(err));

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
  return axios.request(init)
    .then(response => {
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
app.get('/api/team-form', (req, res, next) => {
  const sql = `
    select "matchDetails"
    From "teamForm"
    `;
  db.query(sql)
    .then(result => {
      const dbresult = result.rows[0];
      res.json(dbresult);
    });
});
app.get('/api/week-games/:date', (req, res, next) => {
  const sql = `
   select "fixtures"
      from "weekGames"
`;
  db.query(sql)
    .then(result => {
      const dbresult = result.rows;
      const todayGames = dbresult.map(fixtures => {
        const filteredGames = fixtures.fixtures.filter(fixture => {
          const time = new Date();
          const formatDate = dateFns.format(time, 'yyyy-MM-dd');
          return fixture.fixture.date.slice(0, 10) === formatDate;
        });
        return filteredGames;
      });
      const flatten = todayGames.flat(1);
      res.json(flatten);
    })
    .catch(err => next(err));
});

app.post('/api/team-form/:teamId', (req, res, next) => {
  const { utcDate } = req.body.teamId;
  const sql = `
    select *
    from "teamForm"
    where "date" = $1
  `;
  const params = [utcDate];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length) {
        return result.rows[0];
      }
      return Promise.all([
        getHomeForm(req.body.teamId),
        getAwayForm(req.body.teamId)
      ])
        .then(concatPromises => {
          return [].concat.apply([], concatPromises);
        })
        .then(matchDetails => {
          const jsonMatchDetails = JSON.stringify(matchDetails);
          const sql = `
      insert into "teamForm" ("date", "matchDetails")
      values ($1, $2)
      returning *
      `;
          const params = [utcDate, jsonMatchDetails];
          return db.query(sql, params).then(result => {
            return result.rows[0];
          });
        });
    })
    .then(matchdetails => {
      res.json(matchdetails);
    })
    .catch(err => next(err));
});

function getAwayForm(obj) {
  const init = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
    params: { league: obj.leagueId, season: obj.currentSeason, team: obj.awayId, date: obj.date },
    headers: {
      'x-rapidapi-key': process.env.API_FOOTBALL_API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
  return axios.request(init).then(response => {
    return response.data.response;
  });
}
function getHomeForm(obj) {
  const init = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
    params: { league: obj.leagueId, season: obj.currentSeason, team: obj.homeId, date: obj.date },
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

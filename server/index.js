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

app.get('/api/week-games/:date', (req, res) => {
  const sql = `
   select "matches"
      from "week-games"
`;
  db.query(sql)
    .then(result => {
      const dbresult = result.rows[0];
      const todayGames = dbresult.matches;
      const time = new Date();
      const formatDate = dateFns.format(time, 'yyyy-MM-dd');
      const filter = todayGames.filter(fixture => {
        return fixture.fixture.date.slice(0, 10) === formatDate;
      });
      res.json(filter);
    })
    .catch(err => console.error(err));
});

app.get('/api/week-games', (req, res) => {
  const sql = `
      select "matches"
      from "week-games"
      `;
  db.query(sql)
    .then(result => {
      if (!result.rows[0]) {
        getApiData();
      } else {
        res.json(result.rows[0]);
      }
    }).catch(err => console.error(err));
});

app.get('/api/week-games', (req, res) => {
  const sql = `
      select "matches"
      from "week-games"
      `;
  db.query(sql)
    .then(result => {
      if (!result.rows[0]) {
        getApiData();
      } else {
        res.json(result.rows[0]);
      }
    }).catch(err => console.error(err));
});

function getApiData() {
  const init = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: { league: '253', season: '2021', round: 'Regular Season - 10' },
    headers: {
      'x-rapidapi-key': process.env.API_FOOTBALL_API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
  axios.request(init)
    .then(response => {
      const JsonData = JSON.stringify(response.data.response);
      const sql = `
          insert  into "week-games" ("matches", "first-day")
          values ($1, $2)
          `;
      const wednesday = 'Wednesday';
      const params = [JsonData, wednesday];
      db.query(sql, params).then(result => {

      })
        .catch(err => console.error(err));
    });
}

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

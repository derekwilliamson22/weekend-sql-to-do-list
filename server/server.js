// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// globals
//const port = 3000;

let pool;
if (process.env.DATABASE_URL) {
  console.log("Gonna connect to a heroku DB");
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
}
else {
  console.log("Assuming we're running locally");
  pool = new pg.Pool({
    database: 'weekend_to_do_app',
    host: 'local',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 40000,
  });
}

// spin up server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`standing by on ${port}`);
}); // end server up

app.get('/tasks', (req, res) => {
  console.log('/tasks GET hit');
  const queryString = `SELECT * FROM "tasks" ORDER BY "id" ASC`;
  pool
    .query(queryString)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.log('something amiss in task get', err);
      res.sendStatus(500);
    });
}); // end /tasks GET

app.post('/tasks', (req, res) => {
  console.log('in /tasks POST hit:', req.body);
  const queryString = `INSERT INTO "tasks" (task_name, task_desc, task_time) VALUES ($1, $2, $3)`;
  pool
    .query(queryString, [
      req.body.task_name,
      req.body.task_desc,
      req.body.task_time,
    ])
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('somethings amiss with task add', err);
      res.sendStatus(500);
    });
}); // end POST

app.delete('/tasks/:id', (req, res) => {
  let body = req.body;
  let id = req.params.id; // id of the thing to delete
  console.log('Delete route called with id of', id, body);

  // TODO - REPLACE BELOW WITH YOUR CODE
  const queryString = `DELETE FROM "tasks" WHERE "id" = $1;`; // TODO
  pool
    .query(queryString, [id])
    .then((response) => {
      console.log('back from delete', response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error', error);
      res.sendStatus(500);
    });
});

// found this code at: https://www.arclab.com/en/kb/htmlcss/display-date-time-javascript-php-ssi.html
// and this: https://www.postgresql.org/docs/8.3/functions-datetime.html#FUNCTIONS-DATETIME-CURRENT
app.put('/tasks/:id', (req, res) => {
  let timestamp = new Date();
  let formattedTimestamp =
    ('0' + (timestamp.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + timestamp.getDate()).slice(-2) +
    '/' +
    timestamp.getFullYear() +
    ' ' +
    ('0' + timestamp.getHours()).slice(-2) +
    ':' +
    ('0' + timestamp.getMinutes()).slice(-2);
  let id = req.params.id;
  const queryString = `UPDATE "tasks" SET "task_complete" = 'TRUE',
                        "task_time_completed" = $1
                         WHERE "id" = $2;`;
  pool
    .query(queryString, [formattedTimestamp, id])
    .then((response) => {
      console.log('back from update', response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error', error);
      res.sendStatus(500);
    });
}); //end updateTask

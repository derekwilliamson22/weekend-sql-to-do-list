// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require( 'pg' );

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

// globals
const port = 3001;

const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 40000
})

// spin up server
app.listen( port, ()=>{
    console.log('standing by on', port);
}) // end server up

app.get('/tasks', (req, res)=>{
    console.log('/tasks GET hit');
    const queryString = `SELECT * FROM "tasks"`;
    pool
    .query(queryString)
    .then((results)=>{
        res.send(results.rows);
    })
    .catch((err)=>{
    console.log('something amiss in task get', err);
    res.sendStatus(500);
    });
}); // end /tasks GET

app.post('/tasks', (req, res)=>{
    console.log('in /tasks POST hit:', req.body);
    const queryString = `INSERT INTO "tasks" (task_name, task_desc, task_time) VALUES ($1, $2, $3)`;
    pool
    .query(queryString, [
        req.body.task_name,
        req.body.task_desc,
        req.body.task_time,
    ])
    .then((results)=>{
        res.sendStatus(201);
    })
    .catch((err)=>{
        console.log('somethings amiss with task add', err);
        res.sendStatus(500);
    });
}); // end POST

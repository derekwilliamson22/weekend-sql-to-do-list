const express = require( 'express' );
const router = express.Router();
const pool = require( '../modules/pool' );
const { query } = require('../modules/pool');

router.get('/', (req, res)=>{
    console.log( '/tasks GET hit' );
    const queryString = `SELECT * FROM "tasks"`;
    pool.query( queryString ).then( ( results )=>{
        res.send( results.rows );
    }).catch( ( error )=>{
        console.log('something amiss in task get', error );
        res.sendStatus( 500 );
    })
}) // end /tasks GET

router.post('/', (req, res)=>{
    console.log( '/tasks POST hit:', req.body );
    const queryString = `INSERT INTO "tasks" (task_name, task_desc, task_time) values ( $1, $2, $3 )`;
    pool.query( queryString, [req.body.task_name, req.body.task_desc, req.body.task_time ]).then((results)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('somethings amiss with task add', error );
        res.sendStatus( 500 );
    })
}) // end POST


module.exports = router;

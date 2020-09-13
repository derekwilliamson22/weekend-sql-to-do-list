// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tasks = require('./routes/tasks.route');
// uses
app.use( express.static('server/public'));
app.use( bodyParser.urlencoded({extended: true}));
app.use('/tasks', tasks);

// globals
const port = 3000;

// spin up server
app.listen( port, ()=>{
    console.log('standing by on', port);
}) // end server up
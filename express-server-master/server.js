const config = require('./server-token/config/dbconfig');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todolist = require('./server-token/router/todolist');
const usertoken = require('./server-token/router/usertoken');

const db = mongoose.connect(config.mongodb);
db.connection.on('error', function(error) {
  console.log('databse err' + error);
});
db.connection.on('open', function() {
  console.log('------databse success------');
});
mongoose.Promise = global.Promise;

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
  })
);

app.use('/api/token', usertoken);
app.use('/api/todolist', todolist);

app.listen(port, () => {
  console.log(`open ${port}`);
});

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// use process.env variables to keep private variables,
// be sure to ignore the .env file in github
require('dotenv').config();

// Express Middleware
const helmet = require('helmet'); // creates headers that protect from attacks (security)
const bodyParser = require('body-parser'); // turns response into usable format
const cors = require('cors');  // allows/disallows cross-site communication
const morgan = require('morgan'); // logs requests

var isProduction = process.env.DATABASE_URL ? true : false;

var db = {};

if(isProduction){
  // db Connection w/ Heroku
  db = require('knex')({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL || 
      "postgres://gjqlhvnhleneub:dd5149eb82a5b15ad13719f5a237e402d50e9d23e7c8ac72daf918f9381d22b6@ec2-54-204-35-248.compute-1.amazonaws.com:5432/d7mtiics2ervga",
      ssl: true,
    }
  });

} else{
  // db Connection w/ localhost
  db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgres',
      database : 'crud-starter-api'
    }
  });
}

// Controllers - aka, the db queries
const main = require('./controllers/main');

// App
const app = express();

// Schema
const schema = require('./schemas/schema');

app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(morgan('combined')); // use 'tiny' or 'combined'

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.get('/', (req, res) => res.send('hello world'));
app.get('/crud/users', (req, res) => main.getUsersTableData(req, res, db));
app.post('/crud/users', (req, res) => main.postUsersTableData(req, res, db));
app.put('/crud/users', (req, res) => main.putUsersTableData(req, res, db));
app.delete('/crud/users', (req, res) => main.deleteUsersTableData(req, res, db));

app.get('/crud/tasks', (req, res) => main.getTasksTableData(req, res, db));
app.post('/crud/tasks', (req, res) => main.postTasksTableData(req, res, db));
app.put('/crud/tasks', (req, res) => main.putTasksTableData(req, res, db));
app.delete('/crud/tasks', (req, res) => main.deleteTasksTableData(req, res, db));

// App Server Connection
app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT || 5000}`)
});
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

const db = require('./pgAdaptor');

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
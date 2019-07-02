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

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList } = require('graphql')

//Define User type
const userType = new GraphQLObjectType({
  name: 'User',
  type: 'Query',
  description: 'A user',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user.',
    },
    first: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    last: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    email: {
      type: GraphQLString,
      description: 'The email of the user.',
    },
    phone: {
      type: GraphQLString,
      description: 'The phone of the user.',
    },
    location: {
        type: GraphQLString,
        description: 'The location of the user.',
      },
    hobby: {
        type: GraphQLString,
        description: 'The hobby of the user.',
      },
    added: {
        type: GraphQLString,
        description: 'The date added of the user.',
      }
  }
})

//schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    type: 'Query',
    fields: {
      users: {
        type: new GraphQLList(userType),
        resolve: function(){
            return db.select('*').from('users')
                     .then(items => {
                        if(items.length){
                            return items;
                        } else {
                            return {dataExists: 'false'};
                        }
                        })
                      .then(items => items)
                      .catch(err => console.log({dbError: 'db error'}))
        }
      }
    }
  })
})

module.exports = schema
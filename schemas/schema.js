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

// query
const query = new GraphQLObjectType({
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
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    type: 'Mutation',
    fields: {
      addUser: {
        type: userType,
        args: {
            first: { type: GraphQLString },
            last: { type: GraphQLString },
            email: { type: GraphQLString },
            phone: { type: GraphQLString },
            location: { type: GraphQLString },
            hobby: { type: GraphQLString }
        },
        resolve: function(parentValue, args){
            const { first, last, email, phone, location, hobby } = args;
            const added = new Date();
            return db('users').insert({first, last, email, phone, location, hobby, added})
              .returning('*')
              .then(item => {
                  console.log(item);
                  return item[0];
                })
              .catch(function(err){
                console.log(err);
                res.status(400).json({dbError: 'db error'})
              });
        }
      }
    }
});

//schema
const schema = new GraphQLSchema({
  query: query,
  mutation: mutation
})

module.exports = schema
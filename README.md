# postgres-api-server A CRUD Server with Postgres integration

Built on top of express using nodejs.

Git clone and do:

```
npm install
npm start
```

Don't forget to add the tables to the database first with:

```
CREATE TABLE users (
 id serial PRIMARY KEY,
 first VARCHAR(100),
 last VARCHAR(100),
 email text UNIQUE NOT NULL,
 phone VARCHAR(100),
 location VARCHAR(100),
 hobby VARCHAR(100),
 added TIMESTAMP NOT NULL
);
```
And
```
CREATE TABLE tasks (
 id serial PRIMARY KEY,
 name VARCHAR(100),
 action VARCHAR(100)
);
```

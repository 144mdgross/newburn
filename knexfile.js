'use strict';

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/newburn_dev',
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  },
test: {
    client: 'pg',
    connection: 'postgres://localhost/newburn_test'
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  },
  production: {
    "client": "pg",
    "connection": process.env.DATABASE_URL
  }
};

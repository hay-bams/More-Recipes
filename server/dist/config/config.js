'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  development: {
    username: 'postgres',
    password: '123solution',
    database: 'more-recipes',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '123solution',
    database: 'more-recipes-test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'production'
  }
};
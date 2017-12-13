module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'more-recipes',
    host: process.env.DB_HOST ,
    port: process.DB_PORT,
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
    use_env_variable: 'DATABASE_URL'
  }
};

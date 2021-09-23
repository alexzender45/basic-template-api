require("dotenv").config();

module.exports = {
  development: {
    database: "metacare",
    url: process.env.DB_DEV_URL,
    dialect: "postgres",
  },
  // test: {
  // database: "voiceer_test",
  // use_env_variable: process.env.DB_TEST_URL,
  // dialect: "postgres",
  // logging: false,
  // },
  // production: {
  // database: "voiceer_prod",
  // use_env_variables: "DATABASE_URL",
  // dialect: "postgres",
  // },
  DB_DEV_URL: process.env.DB_DEV_URL,
  PORT: process.env.PORT || 9000,
  SWAPI_URL: process.env.SWAPI_URL,
};

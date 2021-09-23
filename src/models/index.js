const path = require("path");
const fs = require("fs");
const Sequelize = require("sequelize");
const dbConfig = require("../core/config");
var pg = require("pg");
const { DB_DEV_URL } = require("../core/config");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
const db = {};

let sequelize;
sequelize = new Sequelize(DB_DEV_URL, {
  dialect: "postgres",
  config,
});

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

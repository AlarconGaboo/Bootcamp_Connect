// app/models/index.js
const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false, // Suprime los mensajes de las consultas SQL
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.user = require("./user.model.js")(sequelize, Sequelize);
db.bootcamp = require("./bootcamp.model.js")(sequelize, Sequelize);

// Relación muchos a muchos entre Usuario y Bootcamp
db.user.belongsToMany(db.bootcamp, { through: "user_bootcamp", as: "bootcamps" });
db.bootcamp.belongsToMany(db.user, { through: "user_bootcamp", as: "users" });

module.exports = db;

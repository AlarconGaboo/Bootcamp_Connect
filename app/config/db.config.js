// app/config/db.config.js
module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "123456", // reemplaza con la contraseña de tu usuario postgres
  DB: "db_bootcamp",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
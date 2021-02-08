require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "typing",
    host: "localhost",
    dialect: "mysql",
    timezone: "+09:00",
  },

  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_NAME,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: "mysql",
  },
};

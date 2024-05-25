const { Sequelize } = require("sequelize");

const db = new Sequelize("rnwvn1", "root", "Heet23@6", {
    host: "localhost",
    dialect: "mysql"
})
module.exports = db;
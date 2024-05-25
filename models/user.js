const { STRING, INTEGER } = require("sequelize");
const db = require("../config/db");

const Users=db.define("User",{
    username:STRING,
    email:STRING,
    password:STRING,
    number:INTEGER
},{
    createdAt:false,
    updatedAt:false,
});

module.exports=Users;
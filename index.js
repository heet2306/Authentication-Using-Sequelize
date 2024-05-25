
const express = require('express');
const db = require('./config/db');
const userRoute = require('./Routes/userRoute');
const localStrategyInitializer = require('./middlewares/userValidate');
const passport = require('passport');
const app = express();
const session=require("express-session"); 
app.set('view engine', 'ejs');
app.set("views", __dirname + '/views')
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded());
app.use(session({secret:"secret-key"}));
localStrategyInitializer(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use("/User", userRoute)
app.get("/", (req, res) => {
    res.render("index")
})
app.listen(8090, async () => {
    console.log(("listening on port 8090"));
    await db.sync()
    console.log("database connection");
})
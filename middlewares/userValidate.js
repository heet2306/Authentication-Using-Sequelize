const Users = require("../models/user")
const localstrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const passport = require("passport")
const localStrategyInitializer = (passport) => {
    passport.use(new localstrategy({ usernameField: "email" }, async (email, password, done) => {
        let user = await Users.findOne({ where: { "email": email } })
        if (!user) {
            return done(null, false)
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return done(null, false)
        }
        return done(null, user)
    }
    )
    )
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    });
    passport.deserializeUser(async (id, done) => {
        let user = await Users.findByPk(id)
        return done(null, user)
    })
}
module.exports = localStrategyInitializer
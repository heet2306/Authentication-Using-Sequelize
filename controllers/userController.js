const Users = require("../models/user")
const bcrypt = require("bcrypt");
const { SendMail } = require("../service/mail");
const handlePost = async (req, res) => {
    try {
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword
        let user = await Users.create(req.body)
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}
const handleGet = async (req, res) => {
    try {
        let users = await Users.findAll()
        res.send(users)
    } catch (error) {
        res.send(error)
    }
}

const handleUpdate = async (req, res) => {
    let { id } = req.params;
    let user = await Users.findByPk(id)
    user = await user.update(req.body);
    res.send(user)
}
const handlDelete = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await Users.findByPk(id)
        if (!user) {
            return res.send("user not found")
        }
        user.destroy();
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}
//SignUp Page
const getSignUp = async (req, res) => {
    res.render("signup")
}
const getLoginPage = async (req, res) => {
    res.render("login")
}

const handleLogin = async (req, res) => {
    let { email } = req.body;
    let user = await Users.findOne({ where: { email: email } }, { raw: true });
    if (!user) {
        res.send("user not found");
    }


    let isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.send("password mismatch");
    }

    res.send(user);
};

const optGen = async (req, res) => {
    let { email } = req.body;
    // let user = await Users.findOne({ where: { email: email } }, { raw: true });
    // if (!user) {
    //     res.send("user not found");
    // }
    let otp = Math.round(Math.random() * 10000)
    await SendMail(email, otp)
    res.send("OTP Send Successfully");
}
module.exports = { handlePost, handleGet, handleUpdate, handlDelete, getSignUp, getLoginPage, handleLogin,optGen }
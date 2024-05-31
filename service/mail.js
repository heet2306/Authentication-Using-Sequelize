const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rwvn1.heet.rm@gmail.com',
        pass: 'wbtt nwjv eidt yqoh'

    }
})

const SendMail = async (to, opt) => {
    const mailOptions = {
        from: 'rwvn1.heet.rm@gmail.com',
        to: to,
        subject: 'Sending Email using Node.js',
        html: `<h1>Your OTP Is:${opt}</h1>`
    }

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Email sent:' + info.response)
        }
    })
}

module.exports = {
    SendMail
}
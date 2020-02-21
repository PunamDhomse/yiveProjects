const nodemailer = require("nodemailer");

sendMail = function (data) {
    return new Promise(async (resolve, reject) => { 
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'yivetest1@gmail.com',
                pass: '1234567@yive'
            }
        });
        await transporter.sendMail({
            from: 'Yive Support',
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html ? data.html : ''
        });
        return resolve(true);

    });
}

module.exports = {
    sendMail
}
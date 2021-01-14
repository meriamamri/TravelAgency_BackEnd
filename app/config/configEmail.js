var nodemailer = require("nodemailer");
/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/
smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'safalandari@gmail.com',
        pass: 'ingenieur2020'
    }
});

module.exports = smtpTransport;
/*------------------SMTP Over-----------------------------*/
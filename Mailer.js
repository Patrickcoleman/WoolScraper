const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'patrick.mailservice@gmail.com',
        pass: 'qssd ltbw mlfb ofrw'
    }
});

function mail(target, content){
    let mailOptions = {
        from: 'patrick.mailservice@gmail.com',
        to: target,
        subject: 'Automated deal service',
        text: content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred:', error);
        }
        console.log('Email sent: ' + info.response);
    });
}

module.exports = mail;
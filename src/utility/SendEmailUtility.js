const nodemailer = require("nodemailer");


const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {

const transporter = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 25,
        secure: false, // use TLS
        auth: {
            user: "info@teamrabbil.com",
            pass: "~sR4[bhaC[Qs",
        },
        tls: {
          // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: 'Inventory <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    }

    return await transporter.sendMail(mailOptions)

}

module.exports = SendEmailUtility


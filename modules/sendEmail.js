const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sendEmail = async (email, param1, param2, temp, mailSubject) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD,
            },
        });

        ejs.renderFile(__dirname + temp, { param1, param2 }, async function (err, data) {
            if (err) {
                console.log(err);
            } else {
                transporter.sendMail({
                    from: {
                        name: 'Gotex',
                        address: process.env.EMAIL
                    },
                    to: email,
                    subject: mailSubject,
                    html: data,
                }, (error, result) => {
                    if (error) return console.error(error);
                    return console.log(result);
                });
                console.log("email sent successfully");
            }
        })
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

module.exports = sendEmail
import nodemailer from 'nodemailer';

async function sendVerificationEmail(to, subject, body) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `OxiMart ${process.env.SMTP_USER}`,
        to,
        subject,
        html: body,
    };

    const info=await transporter.sendMail(mailOptions);
    return info;
}

export default sendVerificationEmail;
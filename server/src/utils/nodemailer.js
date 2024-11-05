const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',// change this if you're using the default SMTP transport
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const sendVerifiedEmail = async (email, code) => {
    try {
        const info = await transporter.sendMail({
            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your Verification code',
            text: `Your verification code ${code}`,
            html: `<p>Your verification code is <strong>${code}</strong> </p>`, // html body
        });
        console.log('Email sent: ', info.response); 
        return info;
    }catch(error) {
        console.error('Failed to send email', error);
        throw error;
    }
};


module.exports = {transporter, sendVerifiedEmail};
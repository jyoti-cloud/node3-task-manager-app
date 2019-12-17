const sgMail = require('@sendgrid/mail');
// const sendGridAPIKEY = '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';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to:'jyotikunj14@gmail.com',
//     from:'jyotikunj14@gmail.com',
//     subject:'This is my first send grid email in task manager app.',
//     text:'I hope this email is successfully received in your inbox.'
// })
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jyotikunj14@gmail.com',
        subject: 'Thanks for joining in.',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jyotikunj14@gmail.com',
        subject: 'Cancellation email',
        text: `Hello ${name}, Team is here to ask you that why you are removing your account.`
    })
}
module.exports = {
    sendWelcomeEmail,sendCancellationEmail
}


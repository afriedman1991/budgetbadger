const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendEmail = (userName, userEmail, userHash) => {
  let passwordRecoveryLink = `<a href="localhost:1337/PasswordResetPage/${userHash}">reset your password here</a>`
  const msg = {
    to: userEmail,
    from: 'sender@example.org',
    subject: 'Hello world',
    text: 'Hello plain world!',
    html: `<p>Hello ${userName}! Here is your password recovery link: ${passwordRecoveryLink}.</p><p> Please be aware that this link will only be active for fifteen (15) minutes. Thank you for choosing Budget Badger!</p>`,
  };
  sgMail.send(msg).then(() => {
    console.log('MESSAGE SENT SUCCESSFULLY:', msg);
  })
  .catch(error => {
  
    //Log friendly error
    console.error(error.toString());
  
    //Extract error msg
    const {message, code, response} = error;
  
    //Extract response msg
    const {headers, body} = response;
  });

}

module.exports = {sendEmail};
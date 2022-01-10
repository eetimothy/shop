const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'http://developers.google.com/oauthplayground'


const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

//send mail
const sendEmail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    }) 

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "Group Up Registration",
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; color: #192c30;">Welcome to Group Up!</h2>
        <p>Congratulations! You're almost set to start using Group Up.
            Please click on the link below to validate your email address.
        </p>
    
        <div>${url}</div>
        </div>
    `
    }
    
    smtpTransport.sendMail(mailOptions, (err, info) => {
        if(err) return err;
        return info
    })
}


{/* <a href=${url} style="background: #F05E23; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
    
<p>If the button doesn't work for any reason, you can also click on the link below:</p> */}

module.exports = sendEmail
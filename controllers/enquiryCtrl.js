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

const enquiryCtrl = {
    enquiry: async (req, res) => {

        oauth2Client.setCredentials({
            refresh_token: MAILING_SERVICE_REFRESH_TOKEN
        })
        

        let data = req.body


        let smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: SENDER_EMAIL_ADDRESS,
                clientId: MAILING_SERVICE_CLIENT_ID,
                clientSecret: MAILING_SERVICE_CLIENT_SECRET,
                refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
                
            }
        }) 

        let mailOptions = {
            from: data.email,
            to: "support@group-buy.io",
            subject: `${data.enquiryType}`,
            html: `<p>${data.name}</p>
                  <p>${data.email}</p>
                  <p>${data.mobile}</p>
                  <p>${data.message}</p>`,
          };

        smtpTransport.sendMail(mailOptions, (error, response) => {
            if (error) {
                res.status(500).json({ msg: error.message })
            } else {
                res.json({ msg: "Sent Enquiry" })
            }
            smtpTransport.close()
        })
        
    }
}

module.exports = enquiryCtrl
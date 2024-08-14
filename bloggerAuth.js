const { google } = require('googleapis');
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/blogger'],
});

app.get('/oauthcallback', async (req, res) => {
  const { tokens } = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  res.send('Authentication successful!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Authorize this app by visiting: ${authUrl}`);
});

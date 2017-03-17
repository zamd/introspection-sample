/**
Create an App Specific Password demo
**/

const jwt = require('jsonwebtoken');
const request = require('superagent-bluebird-promise');
require('dotenv').config();

let accessToken;

// authenticate
request
.post(`${process.env.AUTH0_TENANT}/oauth/token`)
.send({ 
  grant_type: 'client_credentials',
  client_id: process.env.AUTH0_MGMTAPI_CLIENTID, 
  client_secret: process.env.AUTH0_MGMTAPI_CLIENTSECRET,
  audience: process.env.AUTH0_MGMTAPI_IDENTIFIER
}).then(res => {
  accessToken = res.body.access_token;
  if (!accessToken) {
    throw new Error('Unable to obtain access token');
  }
  // now we have a token, delete the ASP
  return request
    .delete(`${process.env.AUTH0_MGMTAPI_IDENTIFIER}users/${process.env.AUTH0_USER_ID}/application-passwords/asp_uee5Ikc4FkhK2GPY`)
    .set('Authorization', 'Bearer ' + accessToken)
    .send();
}).then(res => {
  console.log('ASP deleted');
})
.catch(err => {
  console.log(err.body);
});
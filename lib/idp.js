const fs = require('fs');
const path = require('path');

// Identity Providers Options
const idp_options = {
  sso_login_url: "https://auth-dev.id-uruguay.com:8444/v1.1/idp/profile/SAML2/Redirect/SSO",
  sso_logout_url: "https://auth-dev.id-uruguay.com:8444/v1.1/idp/profile/SAML2/Redirect/SLO",
  certificates: fs.readFileSync(path.resolve(__dirname, "./files/idp/cert.pem")).toString(),
  force_authn: false,
  sign_get_request: true,
  allow_unencrypted_assertion: false
};


module.exports = idp_options;
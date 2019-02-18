const fs = require('fs');
const path = require("path");
const saml2 = require('saml2-js');

// Service Provider Options
const sp_options = {
  entity_id: "sp-node",
  certificate: fs.readFileSync(path.resolve(__dirname, "./files/sp/cert.pem")).toString(),
  private_key: fs.readFileSync(path.resolve(__dirname, "./files/sp/key.pem")).toString(),
  assert_endpoint: "http://saml.example.com:2000/assert",
  relay_state: "http://localhost:2000/assert",
  force_authn: false,
  auth_context: { comparison: "exact", class_refs: ["urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport"] },
  nameid_format: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
  sign_get_request: true,
  allow_unencrypted_assertion: false
};

module.exports = sp_options;



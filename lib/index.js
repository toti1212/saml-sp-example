const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const saml2 = require('saml2-js');

const sp_options = require('./sp.js');
const idp_options = require('./idp.js');


// Create ServiceProvider and IdentityProvider
const sp = new saml2.ServiceProvider(sp_options);
const idp = new saml2.IdentityProvider(idp_options);


// App express
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));

// Home
app.get("/", function(req, res) {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

// Login enpoint
app.get("/login", function(req, res) {
  sp.create_login_request_url(idp, sp_options, function(err, login_url, request_id) {
    if (err != null)
      return res.send(500);
    res.redirect(login_url);
  });
});

// Assert endpoint for when login completes
app.post("/assert", function(req, res) {
  
  var options = {request_body: req.body};
  sp.post_assert(idp, options, function(err, saml_response) {
    console.log(saml_response);
    if (err != null) {
      console.log(err);
      return res.send(500);
    }
 
    // Save name_id and session_index for logout
    // Note:  In practice these should be saved in the user session, not globally.
    name_id = saml_response.user.name_id;
    session_index = saml_response.user.session_index;
 
    res.send("Hello #{saml_response.user.name_id}!");
  });
});


app.listen(2000);

const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AYlPdTuCpHJQCbRW4y2PHEDxYfgKmYUzpo2QUdIN8Bp4sZQYx2PTlZmXhEimJAkHwkPQai4U1xQwAlil",
  client_secret:
    "EKG7s_-GZSQcOxuyYXPxBjhcR7vNtAV6u5-pgLPgpaDFjOi7LUQZQSG5quYJbLAhwe4PDHAS7yJB0K6i",
});

module.exports = paypal;

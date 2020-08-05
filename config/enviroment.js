const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory
});



const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "pushpendra7060@gmail.com",
      pass: "Pushpendra@1998",
    },
  },

  google_client_id:
    "567797113711-j2b21g4l37tiqjisghqugc89047c995n.apps.googleusercontent.com",
  google_client_sccrit: "nuaxJX23d9jcnVsMrG0sUM-X",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "secret",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "pushpendra7060@gmail.com",
      pass: "Pushpendra@1998",
    },
  },

  google_client_id: process.env.CODEIAL_GOOGOE_CLIENT_ID,
  google_client_sccrit: process.env.CODEIAL_GOOGLE_CLIENT_SCRIT,
  google_callback_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.CODEIAL_JWT_SCRET,
  morgan: {
    mode: 'combined',
    options: {stream: accessLogStream}
}
};

module.exports =
  eval(process.env.CODEIAL_ENVIROMENT) == undefined
    ? development
    : eval(process.env.CODEIAL_ENVIROMENT);

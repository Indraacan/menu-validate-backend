var express = require("express");
var path = require("path");
const bodyParser = require ('body-parser')
const cors = require ('cors')
const jwt = require("jsonwebtoken");
const privateKey = "sayasuka";

var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require ('mongoose')
require ("dotenv").config();

var indexRouter = require("./routes/index");
const menuRouter = require("./routes/Menu");
const categoryRouter = require ("./routes/Category")
const userRouter = require ("./routes/User")
var app = express();
mongodConnect = process.env.DB_LOCAL
mongoose.connect(mongodConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors())
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/menu",validateUser, menuRouter);
app.use("/user", userRouter)
app.use("/category", categoryRouter)

function validateUser (req, res, next){
    jwt.verify(req.headers['access-token'], privateKey, (err, decoded)=> {
      if (err){
        res.json(err);
      }
      else {
        req.body.userId = decoded.id;
        next();
      }
    })
  }

module.exports = app;
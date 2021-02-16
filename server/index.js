const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./models");
const passport = require("passport");
const passportConfig = require("./config/JWTStrategy");

const authRouter = require("./routes/auth");
const problemRouter = require("./routes/problem");

const app = express();
sequelize.sync();
passportConfig(passport);

app.set("port", process.env.PORT || 8080);

app.use(logger("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/problem", problemRouter);
// app.use("/recipes", recipesRouter);
// app.use("/callback", oauthRouter);

// 배포 테스트용
app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.listen(app.get("port"));

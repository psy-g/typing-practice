const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const { sequelize } = require("./models");

// 환경변수를 통해 production 포트로 변경
const port = 8080;

// const usersRouter = require("./routes/user");
// const fridgesRouter = require("./routes/fridge");
// const recipesRouter = require("./routes/recipe");
// const oauthRouter = require("./routes/oauth");

app.use(express.json());
sequelize.sync();

// 환경변수를 통해 cors production origin 으로 변경
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST",
    credentials: true,
  })
);
app.use(
  session({
    secret: "typing",
    resave: false,
    saveUninitialized: true,
  })
);

// routes
// app.use("/users", usersRouter);
// app.use("/myfridge", fridgesRouter);
// app.use("/recipes", recipesRouter);
// app.use("/callback", oauthRouter);

// 배포 테스트용
app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.listen(port, () => {
  console.log("server on " + port);
});

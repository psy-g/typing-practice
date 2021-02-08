require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// const { sequelize } = require("./models");

const app = express();
// sequelize.sync();

app.set("port", 8080);

// app.use(logger("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.listen(app.get("port"));

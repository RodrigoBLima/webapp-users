const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")
const env = require("dotenv")
const db = require("./models");
const initRoutes = require("./routes/");

global.__basedir = __dirname;

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

env.config()

db.sequelize.sync();
initRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Running at localhost:${process.env.PORT}`);
});

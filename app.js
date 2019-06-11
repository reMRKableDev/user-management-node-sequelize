/* Database required modules. */
const { connector } = require("./database/config/dbConfig");

/* Helper required modules */
const routesController = require("./controllers/routesController");

/* Server required modules */
const express = require("express");
const morgan = require("morgan");

/* Configure app */
const app = express();
const port = process.env.PORT || 3000;

/* Set view engine */
app.set("view engine", "ejs");

/* Establish the required middleware */
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

/* Routes */
app.get("/", routesController.getHome);
app.post("/", routesController.postAxiosCall);
app.get("/users", routesController.getUsers);

/* Connect database to app when app is fired up. */
connector
  .sync({ force: true })
  .then(() => {
    app.listen(port, () => console.log(`I've got ears on port: ${port}`));
  })
  .catch(error =>
    console.error(
      `Something went wrong when connecting to database: ${error.stack}`
    )
  );

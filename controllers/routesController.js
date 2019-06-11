const axios = require("axios");
const helperFunctions = require("../helpers/helperFunctions");

module.exports = {
  getHome: (req, res) => {
    res.render("index");
  },
  postAxiosCall: (req, res) => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        let responseArray = response.data;
        helperFunctions.populateDatabase(responseArray);
        res.redirect("/users");
      })
      .catch(error => {
        console.error(
          `Something went wrong when trying to read API data ${error.stack}`
        );
        res.redirect("/");
      });
  },
  getUsers: (req, res) => {
    helperFunctions.findUsers(res);
  }
};

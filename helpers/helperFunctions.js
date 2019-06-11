const UserManagement = require("../database/models/UserManagement");

module.exports = {
  populateDatabase: responseArray => {
    responseArray.forEach(element => {
      let apiName = element.name,
        apiUsername = element.username,
        apiEmail = element.email,
        apiAddress =
          element.address.street +
          " " +
          element.address.suite +
          " " +
          element.address.city +
          " " +
          element.address.zipcode,
        apiPhone = element.phone,
        apiWebsite = element.website,
        apiCompanyName = element.company.name;

      // ADD METHOD TO FIND OR CREATE NEW USERS IN DATABASE
    });
  },
  findUsers: res => {
    // ADD METHOD TO FIND ALL USERS IN DATABASE
  }
};

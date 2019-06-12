const UserManagement = require("../database/models/UserManagement");
const { Op } = require("../database/config/dbConfig");

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

      UserManagement.findOrCreate({
        where: { email: apiEmail },
        defaults: {
          name: apiName,
          username: apiUsername,
          address: apiAddress,
          phone: apiPhone,
          website: apiWebsite,
          companyName: apiCompanyName
        }
      })
        .then(() => {
          console.log("Successfully added users");
        })
        .catch(error => {
          console.error(`Something went wrong when creating: ${error.stack}`);
        });
    });
  },
  findAllUsers: res => {
    UserManagement.findAll()
      .then(foundUsersFromDb => {
        let foundUsers = foundUsersFromDb.map(user => {
          return {
            name: user.dataValues.name,
            username: user.dataValues.username,
            email: user.dataValues.email,
            address: user.dataValues.address,
            phone: user.dataValues.phone,
            website: user.dataValues.website,
            companyName: user.dataValues.companyName
          };
        });
        res.render("users", { users: foundUsers });
      })
      .catch(error => {
        console.error(
          `Something went wrong when finding the user: ${error.stack}`
        );
        res.redirect("/");
      });
  },
  searchUser: (req, res) => {
    UserManagement.findAll({
      where: { name: { [Op.iLike]: `%${req.body.user}%` } }
    })
      .then(foundUserFromDb => {
        if (foundUserFromDb === undefined || foundUserFromDb.length == 0) {
          //TODO: Send a flash message to user
          res.redirect("/");
        } else {
          res.render("results", { user: foundUserFromDb[0].dataValues });
        }
      })
      .catch(error => {
        console.error(
          `Something went wrong when retrieving the searched user: ${
            error.stack
          }`
        );
        res.redirect("/search");
      });
  }
};

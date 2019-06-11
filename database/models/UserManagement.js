const { connector, Sequelize } = require("../config/dbConfig");

module.exports = connector.define("user-management-sq", {
  name: {
    type: Sequelize.STRING,
    validate: { notEmpty: true }
  },
  username: {
    type: Sequelize.STRING,
    validate: { notEmpty: true }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  address: {
    type: Sequelize.STRING,
    validate: { notEmpty: true }
  },
  phone: {
    type: Sequelize.STRING,
    validate: { notEmpty: true }
  },
  website: {
    type: Sequelize.STRING,
    validate: { notEmpty: true }
  },
  companyName: {
    type: Sequelize.STRING,
    validate: { notEmpty: true }
  }
});

const contactsPath = require("./contactsPath");

const listContacts = async () => {
  return await contactsPath();
};

module.exports = listContacts;

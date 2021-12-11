const contactsPath = require("./contactsPath");

const getContactById = async (contactId) => {
  const contacts = await contactsPath();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

module.exports = getContactById;

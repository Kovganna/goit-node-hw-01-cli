const fs = require("fs/promises");
const path = require("path");
const contactsPath = require("./contactsPath");

const removeContact = async (contactId) => {
  const contacts = await contactsPath();

  const getId = contacts.findIndex(
    (contact) => contactId === contact.id.toString()
  );
  if (getId === -1) {
    return;
  }
  const update = contacts.splice(getId, 1);
  await fs.writeFile(
    path.join(__dirname, "../db", "contacts.json"),

    JSON.stringify(contacts, null, 4)
  );
  return update;
};

module.exports = removeContact;

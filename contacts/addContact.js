const fs = require("fs/promises");
const path = require("path");
const contactsPath = require("./components/contactsPath");

const addContact = async (name, email, phone) => {
  const contacts = await contactsPath();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts", "db", "contacts.json"),
    JSON.stringify(contacts, null, 4)
  );
  return newContact;
};

module.exports = addContact;

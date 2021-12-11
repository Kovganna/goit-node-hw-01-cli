const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "contacts", "db", "contacts.json"),
    "utf8"
  );
  const result = JSON.parse(content);
  return result;
};

const listContacts = async () => {
  return await contactsPath();
};

const getContactById = async (contactId) => {
  const contacts = await contactsPath();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

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
    path.join(__dirname, "contacts", "db", "contacts.json"),

    JSON.stringify(contacts, null, 4)
  );
  return update;
};

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

module.exports = { listContacts, getContactById, removeContact, addContact };

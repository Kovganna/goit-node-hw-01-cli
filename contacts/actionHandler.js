const colors = require("colors");
const { Command } = require("commander");
const addContact = require("./addContact");
const getContactById = require("./getContactById");
const listContacts = require("./listContacts");
const removeContact = require("./removeContact");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.log(colors.green("Contact found"));
        console.log(contactById);
        return;
      }
      console.log(colors.blue("Contact not found"));

      break;

    case "add":
      const contact = await addContact(name, email, phone);
      console.log(colors.green("New contact added"));
      console.log(contact);
      break;

    case "remove":
      const removeContactById = await removeContact(id);
      if (removeContactById) {
        console.log(colors.yellow("Contact was deleted"));
        console.log(removeContactById);
        return;
      }
      console.log(colors.blue("Contact not found"));

      break;

    default:
      console.warn(colors.red("Unknown action type!"));
  }
};

// invokeAction(argv).then(() => console.log("Success"));

(async () => {
  await invokeAction(argv);
})();

module.exports = invokeAction;

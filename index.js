const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const startCli = async (argv) => {
  try {
    await invokeAction(argv);
  } catch (error) {
    console.log(error);
  }
};

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const contactList = await contacts.listContacts();
        console.table(contactList);
      break;

    case "get":
        const oneContact = await contacts.getContactById(id);
        console.log(oneContact);
      break;

    case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
      break;

    case "remove":
        const deleteContact = await contacts.removeContact(id);
        console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};


startCli(argv);
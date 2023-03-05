const fs = require('fs').promises;
const path = require("path");
const { nanoid } = require("nanoid");


contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (contactList) => await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const contactList = await listContacts();
    const result = contactList.find(item => item.id === contactId);
    return result || null;
};

const addContact = async (name, email, phone) => {
    const contactList = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contactList.push(newContact);
    await updateContacts(contactList);
    return newContact;
};

const removeContact = async (contactId) => {
    const contactList = await listContacts();
    const index = contactList.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contactList.splice(index, 1);
    await updateContacts(contactList);
    return result;
};



module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
};
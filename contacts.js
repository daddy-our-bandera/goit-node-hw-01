const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error(err.message);
  }
}

async function updateContact(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.filter(contact => contact.id === contactId);
  } catch (error) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedList = contacts.filter(contact => contact.id != contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedList));
    const deletedContact = contacts.find(contact => contact.id == contactId);
    return deletedContact;
  } catch (error) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(8), name, email, phone };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
  } catch (error) {
    console.error(err.message);
  }
}
module.exports = { listContacts, getContactById, removeContact, addContact };

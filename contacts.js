const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const string = data.toString();
  console.log(string);
  const object = JSON.parse(string);
  return object;
}

async function getContactById(contactId) {
  const object = await listContacts();
  const contact = object.find((el) => Number(el.id) === contactId);
  return contact;
}

async function removeContact(contactId) {
  const object = await listContacts();

  const filteredContacts = object.filter((el) => Number(el.id) !== contactId);

  const jsonFilteredFiles = JSON.stringify(filteredContacts);

  fs.writeFile(contactsPath, jsonFilteredFiles, "utf8");

  console.log(await listContacts());
}

async function addContact(name, email, phone) {
  const object = await listContacts();

  const contact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };

  object.push(contact);
  const jsonContacts = JSON.stringify(object);

  await fs.writeFile(contactsPath, jsonContacts);

  console.log(await listContacts());
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

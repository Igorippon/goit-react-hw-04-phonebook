import { useEffect, useMemo, useState } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { Layuot } from "./Layout";
import { nanoid } from 'nanoid';
import { Filter } from "./Filter/Filter";
import { ContactForm } from "./ContactForm/ContactForm.js";
import { ContactList } from "./ContactList/ContactList.js";

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const getInitialContacts = () => {
  return JSON.parse(localStorage.getItem("contacts")) ?? initialState;
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts]);

  const addContact = newContact => {
    const contactName = contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());
    if (contactName) {
      alert(`${newContact.name} is already contacts.`)
      return
    }
    setContacts(prevContacts =>
      [{ id: nanoid(), ...newContact }, ...prevContacts],
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId))
  };

  const handleChange = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const visibilContact = useMemo(() => { return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())); }, [contacts, filter]);

  return (
    <Layuot>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter}
        onChange={handleChange}
      />
      <ContactList
        visibilContact={visibilContact}
        onDelete={deleteContact}
      />
      <GlobalStyle />
    </Layuot>
  );
}

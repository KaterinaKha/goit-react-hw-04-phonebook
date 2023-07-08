import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { FilterContacts } from './Filter/Filter';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  const addContact = data => {
    const newContact = {
      ...data,
      id: nanoid(),
    };

    contacts.some(({ name }) => name === data.name)
      ? alert(`${data.name} is already in contacts`)
      : setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const filterContact = event => setFilter(event.target.value.toLowerCase());

  const filteredContactsList = () => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidMount() {
  //   const localStorageContacts = localStorage.getItem('contacts');
  //   if (localStorageContacts !== null) {
  //     this.setState({ contacts: JSON.parse(localStorageContacts) });
  //     // console.log(JSON.parse(localStorageContacts));
  //   }
  // }

  // componentDidUpdate(prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     const savedContacts = JSON.stringify(this.state.contacts);
  //     localStorage.setItem('contacts', savedContacts);
  //     // console.log(savedContacts);
  //   }
  // }

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <FilterContacts value={filter} onFilterInput={filterContact} />
      <ContactList
        contacts={filteredContactsList()}
        onDeleteContact={deleteContact}
      />
    </>
  );
}

export default App;

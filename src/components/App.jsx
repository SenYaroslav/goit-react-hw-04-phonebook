import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const App = () => {
  const localContacts = localStorage.getItem('contacts');
  const parsedLocalContacts = JSON.parse(localContacts);

  const [contacts, setContacts] = useState(
    parsedLocalContacts ? parsedLocalContacts : []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const nameList = contacts.map(contact => contact.name);

    if (nameList.includes(data.name)) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts(state => [...state, data]);
    }
  };

  const handleFilterInput = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDeleteBtn = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  const filteredContacts = getVisibleContacts();

  return (
    <div
      style={{
        padding: '30px',
        boxSizing: 'border-box',
        fontSize: '18px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm formSubmitHandler={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter
        title="Find contacts by name"
        filter={filter}
        handleFilterInput={handleFilterInput}
      />
      <ContactList
        contacts={filteredContacts}
        handleDeleteBtn={handleDeleteBtn}
      />
    </div>
  );
};

export default App;

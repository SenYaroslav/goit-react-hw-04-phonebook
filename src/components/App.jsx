import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    const parsedLocalContacts = JSON.parse(localContacts);
    
    if (parsedLocalContacts) {
      this.setState({ contacts: parsedLocalContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = data => {
    const nameList = this.state.contacts.map(contact => contact.name);

    if (nameList.includes(data.name)) {
      alert(`${data.name} is already in contacts`);
    } else
      this.setState(prevState => {
        return { contacts: [...prevState.contacts, data] };
      });
  };

  handleFilterInput = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleDeleteBtn = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div
        style={{
          padding: '30px',
          boxSizing: 'border-box',
          fontSize: '18px',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter
          title="Find contacts by name"
          filter={filter}
          handleFilterInput={this.handleFilterInput}
        />
        <ContactList
          contacts={visibleContacts}
          handleDeleteBtn={this.handleDeleteBtn}
        />
      </div>
    );
  }
}

export default App;

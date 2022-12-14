import PropTypes from 'prop-types';
import React from 'react';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, handleDeleteBtn }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          handleDeleteBtn={handleDeleteBtn}
        />
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  handleDeleteBtn: PropTypes.func.isRequired,
};

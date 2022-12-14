import PropTypes from 'prop-types';
import React from 'react';
import css from './PhoneBook.module.css';

const ContactItem = ({ id, name, number, handleDeleteBtn }) => {
  return (
    <li className={css.contact__item} id={id}>
      <p className={css.contact__name}>{name}:</p>
      <span className={css.contact__number}>
        {number}
        <button
          className={css.contact__btn}
          type="button"
          onClick={() => handleDeleteBtn(id)}
        >
          Delete
        </button>
      </span>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

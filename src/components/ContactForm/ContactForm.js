import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import scss from './contactForm.module.scss';

export default function ContactForm({ submitForm }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // const onInputChange = event => {
  // const { name, value } = event.target;
  //   setName(name);
  //   setNumber(event.currentTarget.value);
  // };

  const onSubmitChange = event => {
    event.preventDefault();
    const newContact = { id: nanoid(), name, number };
    submitForm(newContact);
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={scss.form} onSubmit={onSubmitChange}>
      <label className={scss.formLabel}>
        <span>Name</span>
        <input
          className={scss.formInput}
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={scss.formLabel}>
        <span>Number</span>
        <input
          className={scss.formInput}
          value={number}
          onChange={e => setNumber(e.target.value)}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={scss.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import scss from './contactForm.module.scss';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  onSubmitChange = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const newContact = { id: nanoid(), name, number };
    //   console.log(this.props);
    this.props.submitForm(newContact);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={scss.form} onSubmit={this.onSubmitChange}>
        <label className={scss.formLabel}>
          <span>Name</span>
          <input
            className={scss.formInput}
            value={this.state.name}
            onChange={this.onInputChange}
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
            value={this.state.number}
            onChange={this.onInputChange}
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
}

ContactForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
};

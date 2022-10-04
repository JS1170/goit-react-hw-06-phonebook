import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('keyContacts', JSON.stringify(contacts));
    }
  }

  componentDidMount() {
    const contactsLocalStorage = JSON.parse(
      localStorage.getItem('keyContacts')
    );
    if (contactsLocalStorage) {
      this.setState({
        contacts: contactsLocalStorage,
      })
    }
      
  }

  submitFormValue = newContactObject => {
    if (this.checkName(newContactObject.name)) {
      alert(`${newContactObject.name} is already in contacts.`);
      return;
    }
    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts, newContactObject],
      };
    });
  };

  checkName = name => {
    return this.state.contacts.find(contact => {
      return name.toLowerCase() === contact.name.toLowerCase();
    });
  };

  filterContacts = () => {
    return this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
  };

  deleteCurrentItem = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => {
        return contact.id !== id;
      }),
    });
  };

  onChangeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  render() {
    return (
      <div style={{ marginLeft: '40px' }}>
        <h1>Phonebook</h1>
        <ContactForm submitForm={this.submitFormValue} />

        <h2>Contacts</h2>
        <Filter onChangeFilter={this.onChangeFilter} />
        <ContactList
          contacts={this.filterContacts()}
          deleteBtn={this.deleteCurrentItem}
        />
      </div>
    );
  }
}

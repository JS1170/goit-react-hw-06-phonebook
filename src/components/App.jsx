import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, changeFilter, deleteContacts } from 'Redux/contactsSlice';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

// const baseContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];


export default function App() {
  
  // const localContacts = localStorage.getItem('keyContacts');
  // const parsLocalContacts = JSON.parse(localContacts);

  // const [contacts, setContacts] = useState(() =>
  //   parsLocalContacts?.length > 0 ? parsLocalContacts : baseContacts
  // );

  // const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   localStorage.setItem('keyContacts', JSON.stringify(contacts));
  // }, [contacts]);

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const submitFormValue = newContactObject => {
    if (checkName(newContactObject.name)) {
      alert(`${newContactObject.name} is already in contacts.`);
      return;
    }
    dispatch(addContacts(newContactObject))
    // setContacts(prevContact => [...prevContact, newContactObject]);
  };

  const checkName = name => {
    return state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const filterContacts = () => {
    return state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(state.filter.toLowerCase());
    });
  };

  const deleteCurrentItem = id => {
    dispatch(deleteContacts(id))
    // setContacts(
    //   state.contacts.filter(contact => {
    //     return contact.id !== id;
    //   })
    // );
  };

  const onChangeFilter = event => {
    // setFilter(event.target.value);
    dispatch(changeFilter(event.target.value))
  };

  return (
    <div style={{ marginLeft: '40px' }}>
      <h1>Phonebook</h1>
      <ContactForm submitForm={submitFormValue} />

      <h2>Contacts</h2>
      <Filter onChangeFilter={onChangeFilter} />
      <ContactList
        contacts={filterContacts()}
        deleteBtn={deleteCurrentItem}
      />
    </div>
  );
}

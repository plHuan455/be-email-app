import { createSlice } from '@reduxjs/toolkit';
import { Contact, ContactGroup } from './interface';

export interface ContactState {
  contactsList: Contact[];
  contactGroupsList: ContactGroup[];
}

const contactsListDefault: Contact[] = [
  {
    id: 1,
    avatar: '',
    first_name: 'Contact',
    last_name: 'Name 1',
    mail: 'contact1@mail.mail',
  },
  {
    id: 2,
    avatar: '',
    first_name: 'Contact',
    last_name: 'Name 2',
    mail: 'contact2@mail.mail',
  },
  {
    id: 3,
    avatar: '',
    first_name: 'Contact',
    last_name: 'Name 3',
    mail: 'contact3@mail.mail',
  },
];

const contactGroupsListDefault: ContactGroup[] = [
  {
    id: 1,
    group_name: 'Nhóm test 1',
    members: contactsListDefault,
  },
  {
    id: 2,
    group_name: 'Nhóm test 2',
    members: contactsListDefault,
  },
  {
    id: 3,
    group_name: 'Nhóm test 3',
    members: contactsListDefault,
  },
];

const initialState: ContactState = {
  contactsList: contactsListDefault,
  contactGroupsList: contactGroupsListDefault,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    deleteContacts(state, actions) {
      const cloneContactsList = [...state.contactsList];

      const position = cloneContactsList.findIndex(
        (contact) => contact.id === +actions.payload,
      );

      cloneContactsList.splice(position, 1);

      localStorage.setItem('contacts-list', JSON.stringify(cloneContactsList));

      return {
        ...state,
        contactsList: [...cloneContactsList],
      };
    },
    editContactsList(state, actions) {
      const { id, data } = actions.payload;

      const position = state.contactsList.findIndex((contact) => contact.id === +id);

      const cloneContactsList = [...state.contactsList];

      cloneContactsList.splice(position, 1, data);

      localStorage.setItem('contacts-list', JSON.stringify(cloneContactsList));

      return { ...state, contactsList: [...cloneContactsList] };
    },
    pushContactsList(state, actions) {
      const nextId = state.contactsList.length + 1;

      const nextContact = [
        ...state.contactsList,
        { ...actions.payload, id: nextId },
      ];

      localStorage.setItem('contacts-list', JSON.stringify(nextContact));

      return { ...state, contactsList: nextContact };
    },
    setContactsList(state, actions) {
      localStorage.setItem('contacts-list', JSON.stringify(actions.payload));
      return { ...state, contactsList: actions.payload };
    },
  },
});

export const {
  setContactsList,
  pushContactsList,
  editContactsList,
  deleteContacts,
} = contactSlice.actions;
export default contactSlice.reducer;

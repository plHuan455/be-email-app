import { createSlice } from '@reduxjs/toolkit';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  mail: string;
  avatar: string;
}

export interface ContactState {
  contactsList: Contact[];
}

const initialState: ContactState = {
  contactsList: [
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
  ],
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

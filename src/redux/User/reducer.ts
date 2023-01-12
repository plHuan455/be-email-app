import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseDataFromLocalStorage } from '@utils/functions';

export interface UserSignature {
  name: string;
  id: number;
  text_html: string;
}
export interface UserState {
  name: string;
  age: number;
  phone: number | string;
  avatar?: string;
  email: string;
  signature?: UserSignature;
}

const LOCAL_STORAGE_SIGNATURE = 'curr_signature_data';

const initialState: UserState = {
  name: 'Nguyễn Văn A',
  age: 18,
  phone: '01231818',
  avatar: '',
  email: 'nguyenvana@gmail.com',
  signature: parseDataFromLocalStorage(LOCAL_STORAGE_SIGNATURE)
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return {...action.payload, signature: state.signature};
    },
    removeUser(state, action) {
      return {...action.payload, signature: state.signature};
    },
    setSignature(state, action: PayloadAction<UserSignature | undefined>) {
      if(!action.payload) {
        localStorage.removeItem(LOCAL_STORAGE_SIGNATURE);
      } else {
        localStorage.setItem(LOCAL_STORAGE_SIGNATURE, JSON.stringify(action.payload));
      }
      state.signature = action.payload;
      return state;
    }
  },
});

export const { setUser, removeUser, setSignature } = userSlice.actions;
export default userSlice.reducer;

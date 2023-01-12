import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const initialState: UserState = {
  name: 'Nguyễn Văn A',
  age: 18,
  phone: '01231818',
  avatar: '',
  email: 'nguyenvana@gmail.com',
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
    setSignature(state, action: PayloadAction<UserSignature>) {
      state.signature = action.payload;
      return state;
    }
  },
});

export const { setUser, removeUser, setSignature } = userSlice.actions;
export default userSlice.reducer;

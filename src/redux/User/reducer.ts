import { createSlice } from '@reduxjs/toolkit';
export interface UserState {
  name: string;
  age: number;
  phone: number | string;
  avatar?: string;
  email: string;
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
      return action.payload;
    },
    removeUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

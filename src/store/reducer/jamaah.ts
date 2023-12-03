import { createSlice } from '@reduxjs/toolkit';
import { JamaahType } from '../../constants';
import { HandlerInsertJamaah } from '../helper';

const initialState: JamaahType = {
  id: 0,
  name: '',
  phoneNumber: '',
  uniqueId: '',
};

export const jamaahReducer = createSlice({
  name: 'jamaah',
  initialState,
  reducers: {
    insertJamaah: HandlerInsertJamaah,
  },
});

export const { insertJamaah } = jamaahReducer.actions;
export default jamaahReducer.reducer;

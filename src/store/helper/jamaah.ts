import { PayloadAction } from '@reduxjs/toolkit';
import { JamaahType } from '../../constants';

export const HandlerInsertJamaah = (
  state: JamaahType,
  action: PayloadAction<JamaahType>,
) => {
  state.name = action.payload.name;
  state.phoneNumber = action.payload.phoneNumber;
  state.uniqueId = action.payload.uniqueId;
  state.qrString = action.payload.qrString;
};

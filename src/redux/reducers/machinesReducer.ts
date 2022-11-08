import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Field} from '../../types';

export interface Machine {
  id: string;
  name: string;
  machineCategoryId: string;
  fields: Field[];
}

interface MachinesState {
  machines: Machine[];
}

const initialState: MachinesState = {
  machines: [],
};

const machinesSlice = createSlice({
  name: 'machineCategories',
  initialState,
  reducers: {
    setMachines: (state, {payload}: PayloadAction<Machine[]>) => ({
      ...state,
      machines: payload,
    }),
  },
});

export const {setMachines} = machinesSlice.actions;
export default machinesSlice;

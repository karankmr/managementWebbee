import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MachineCategory} from '../../components/categories/AddCategories';

interface MachineCategoriesState {
  totalMachineCategories: MachineCategory[];
}

const initialState: MachineCategoriesState = {
  totalMachineCategories: [],
};

const machineCategoriesSlice = createSlice({
  name: 'machineCategories',
  initialState,
  reducers: {
    setMachineCategories: (
      state,
      {payload}: PayloadAction<MachineCategory[]>,
    ) => ({
      ...state,
      totalMachineCategories: payload,
    }),
  },
});

export const {setMachineCategories} = machineCategoriesSlice.actions;
export default machineCategoriesSlice;

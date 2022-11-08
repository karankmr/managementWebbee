import {combineReducers} from '@reduxjs/toolkit';
import machineCategoriesSlice from './machineCategoriesReducer';
import machinesSlice from './machinesReducer';

const rootReducer = combineReducers({
  machineCategories: machineCategoriesSlice.reducer,
  machines: machinesSlice.reducer,
});

export default rootReducer;

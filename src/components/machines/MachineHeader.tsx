import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {MachineCategory} from '../categories/AddCategories';
import {Machine, setMachines} from '../../redux/reducers/machinesReducer';
import uuid from 'react-native-uuid';

interface Props {
  machineCategory: MachineCategory;
}
const MachineHeader: React.FunctionComponent<Props> = ({machineCategory}) => {
  const {machines} = useReduxSelector(state => state.machines);
  const dispatch = useReduxDispatch();
  const handleAddNewItem = () => {
    dispatch(setMachines([...machines, machineTemplate()]));
  };

  const machineTemplate = (): Machine => {
    return {
      id: `${uuid.v4()}`,
      name: '',
      machineCategoryId: machineCategory.id,
      fields: machineCategory.fields,
    };
  };

  return (
    <View style={styles.root}>
      <Text variant="headlineLarge">{machineCategory.categoryName}</Text>
      <Button mode="contained" onPress={handleAddNewItem}>
        Add new item
      </Button>
    </View>
  );
};

export default MachineHeader;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

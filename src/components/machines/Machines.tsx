import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import MachineHeader from './MachineHeader';
import MachineCard from './MachineCard';
import {useReduxSelector} from '../../redux/store';
import {MachineCategory} from '../categories/AddCategories';
import {Machine} from '../../redux/reducers/machinesReducer';

interface Props {
  machineCategory: MachineCategory;
}
const Machines: React.FunctionComponent<Props> = ({machineCategory}) => {
  const {machines} = useReduxSelector(state => state.machines);
  const [machinesByCategory, setMachinesByCategory] = useState<Machine[]>([]);

  const getMachinesByCategoryId = useCallback(
    (machineCategoryId: string) =>
      machines.filter(val => val?.machineCategoryId === machineCategoryId),
    [machines],
  );

  useEffect(() => {
    setMachinesByCategory(getMachinesByCategoryId(machineCategory.id));
  }, [getMachinesByCategoryId, machineCategory.id]);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <MachineHeader machineCategory={machineCategory} />
        <Divider style={styles.divider} />
      </View>
      {!machinesByCategory.length ? (
        <Text style={styles.title} variant="titleMedium">
          {'No item to display'}
        </Text>
      ) : (
        machinesByCategory.map(data => (
          <>
            <MachineCard data={data} key={data.id} />
            <Divider style={styles.divider} />
          </>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 8,
  },
  header: {
    width: '100%',
    marginBottom: 16,
  },
  divider: {
    backgroundColor: 'grey',
  },
  title: {
    alignSelf: 'center',
  },
});

export default Machines;

import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Machines from '../components/machines/Machines';
import {useReduxSelector} from '../redux/store';
import {Text} from 'react-native-paper';

const Dashboard = () => {
  const {totalMachineCategories} = useReduxSelector(
    state => state.machineCategories,
  );

  return (
    <ScrollView style={styles.root}>
      {totalMachineCategories.length > 0 ? (
        totalMachineCategories.map(val => <Machines machineCategory={val} />)
      ) : (
        <Text style={styles.text} variant="bodyMedium">
          Nothing to display yet :(
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    padding: 64,
  },
});
export default Dashboard;

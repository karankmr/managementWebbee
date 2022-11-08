import {View, ScrollView, StyleSheet} from 'react-native';
import AddCategories, {
  MachineCategory,
} from '../components/categories/AddCategories';
import {Button, Text} from 'react-native-paper';
import React from 'react';
import uuid from 'react-native-uuid';
import {useReduxDispatch, useReduxSelector} from '../redux/store';
import {setMachineCategories} from '../redux/reducers/machineCategoriesReducer';

const ManageCategories = () => {
  const {totalMachineCategories} = useReduxSelector(
    state => state.machineCategories,
  );
  const dispatch = useReduxDispatch();

  const createCategoryTemplate = (): MachineCategory => ({
    id: `${uuid.v4()}`,
    categoryName: '',
    fields: [],
    titleField: '',
  });

  const handleAddNewMachineCategory = () => {
    const newMachineCategories = [
      ...totalMachineCategories,
      createCategoryTemplate(),
    ];
    dispatch(setMachineCategories(newMachineCategories));
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.main}>
        {totalMachineCategories.length > 0 ? (
          totalMachineCategories.map((eachMachineCategory, index) => (
            <AddCategories
              totalMachineCategories={totalMachineCategories}
              machineData={eachMachineCategory}
              index={index}
              key={index}
            />
          ))
        ) : (
          <Text style={styles.text} variant="bodyMedium">
            Nothing to display yet :(
          </Text>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleAddNewMachineCategory}
          style={styles.addCatBtn}>
          Add new category
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 8,
  },
  main: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  addCatBtn: {
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    padding: 64,
  },
});

export default ManageCategories;

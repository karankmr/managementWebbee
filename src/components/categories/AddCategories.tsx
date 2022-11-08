import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  Divider,
  List,
  Menu,
  Provider,
  Text,
  TextInput,
} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {setMachineCategories} from '../../redux/reducers/machineCategoriesReducer';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {setMachines} from '../../redux/reducers/machinesReducer';
import InputField from './InputField';
import {FIELD_TYPES} from '../../constants';
import {Field} from '../../types';

export interface MachineCategory {
  id: string;
  categoryName: string;
  fields: Field[];
  titleField: string;
}

interface Props {
  machineData: MachineCategory;
  totalMachineCategories: MachineCategory[];
  index: number;
}

const AddCategories: React.FC<Props> = ({
  machineData,
  totalMachineCategories,
  index,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const {machines} = useReduxSelector(state => state.machines);
  const dispatch = useReduxDispatch();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handlePress = () => setExpanded(!expanded);

  const createFieldTemplate = (type: string, name?: string): Field => ({
    id: `${uuid.v4()}`,
    name: name ?? '',
    type,
  });

  const editField = (field: Field, input: string) => {
    return machineData.fields.map(val => {
      if (field.id === val.id) {
        return {...field, name: input};
      }
      return val;
    });
  };

  const handleFieldInput = (field: Field, val: string) => {
    const newTotalmachines = totalMachineCategories.map(eachMachine => {
      if (machineData.id === eachMachine.id) {
        return {...machineData, fields: editField(field, val)};
      }
      return eachMachine;
    });
    dispatch(setMachineCategories(newTotalmachines));

    const newMachines = machines.map(eachMachine => {
      if (eachMachine.machineCategoryId === machineData.id) {
        return {
          ...eachMachine,
          fields: eachMachine.fields.map(eachField => {
            if (eachField.id === field.id) {
              return {...eachField, name: val};
            }
            return eachField;
          }),
        };
      }
      return eachMachine;
    });
    dispatch(setMachines(newMachines));
  };

  const addFieldToMachine = (
    machine: MachineCategory,
    fieldType: string,
    template: Field,
  ) => {
    return {
      ...machine,
      fields: [...machine.fields, template],
    };
  };

  const handleAddNewField = (type: string) => {
    const template = createFieldTemplate(type);
    const newTotalmachinesCategory = totalMachineCategories.map(eachMachine => {
      if (machineData.id === eachMachine.id) {
        return addFieldToMachine(machineData, type, template);
      }
      return eachMachine;
    });
    dispatch(setMachineCategories(newTotalmachinesCategory));

    const newMachines = machines.map(eachMachine => {
      if (eachMachine.machineCategoryId === machineData.id) {
        return {
          ...eachMachine,
          fields: [...eachMachine.fields, template],
        };
      }
      return eachMachine;
    });
    dispatch(setMachines(newMachines));
  };

  const editMachineCategoryName = (input: string) => {
    return {
      ...machineData,
      categoryName: input,
    };
  };

  const handleOnChangeCategoryName = (input: string) => {
    const newTotalmachines = totalMachineCategories.map(eachMachine => {
      if (machineData.id === eachMachine.id) {
        return editMachineCategoryName(input);
      }
      return eachMachine;
    });
    dispatch(setMachineCategories(newTotalmachines));
  };

  const handleCategoryDelete = () => {
    const newTotalmachines = totalMachineCategories.filter(
      eachMachine => machineData.id !== eachMachine.id,
    );
    dispatch(setMachineCategories(newTotalmachines));
  };

  const handleFieldDelete = (id: string) => {
    const newTotalmachines = totalMachineCategories.map(eachMachine => {
      if (machineData.id === eachMachine.id) {
        return {
          ...machineData,
          fields: machineData.fields.filter(eachField => eachField.id !== id),
        };
      }
      return eachMachine;
    });
    dispatch(setMachineCategories(newTotalmachines));
  };

  return (
    <Provider>
      <View style={[styles.root, {zIndex: 1 - index}]}>
        <Text style={styles.catName} variant="titleLarge">
          {machineData?.categoryName}
        </Text>

        <TextInput
          label="Category name"
          value={machineData.categoryName}
          onChangeText={val => handleOnChangeCategoryName(val)}
          mode={'outlined'}
          style={styles.catName}
        />

        {machineData.fields.map(field => (
          <InputField
            handleFieldDelete={handleFieldDelete}
            handleFieldInput={handleFieldInput}
            field={field}
          />
        ))}

        <View style={[styles.titleField, {backgroundColor: 'blue'}]}>
          <Button
            mode="contained"
            onPress={() => openMenu()}
            style={styles.titleFieldBtn}>
            Title Field {machineData.titleField}
          </Button>
        </View>

        <View style={styles.container}>
          <List.Section
            style={[styles.listContainer, expanded && styles.listExpanded]}>
            <List.Accordion
              title="ADD NEW FIELD"
              expanded={expanded}
              onPress={handlePress}>
              {FIELD_TYPES.map(type => (
                <List.Item
                  title={type}
                  style={styles.eachList}
                  onPress={() => {
                    handleAddNewField(type);
                    setExpanded(false);
                  }}
                />
              ))}
            </List.Accordion>
          </List.Section>

          <Button
            icon="delete"
            onPress={handleCategoryDelete}
            style={styles.deleteBtn}>
            REMOVE
          </Button>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingTop: 16,
    marginBottom: 16,
  },
  catName: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  titleField: {
    marginTop: 16
  },
  titleFieldBtn: {
    borderRadius: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    backgroundColor: '#e3e3e3',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  listContainer: {
    borderWidth: 0.2,
    borderRadius: 8,
    overflow: 'hidden',
    width: 200,
    marginRight: 'auto',
  },
  listExpanded: {
    position: 'absolute',
    left: 16,
  },
  deleteBtn: {
    width: 100,
    marginTop: 16,
    height: 56,
  },
  eachList: {
    zIndex: 999,
    backgroundColor: 'white',
  },
});

export default AddCategories;

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Switch, Text, TextInput} from 'react-native-paper';
import {Machine, setMachines} from '../../redux/reducers/machinesReducer';
import DatePicker from 'react-native-date-picker';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {Field, FieldType} from '../../types';

interface Props {
  data: Machine;
}
const MachineCard: React.FunctionComponent<Props> = ({data}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const dispatch = useReduxDispatch();
  const {machines} = useReduxSelector(state => state.machines);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const editMachine = (field: Field, input: string | boolean) => {
    return machines.map(val => {
      if (data.machineCategoryId === val.machineCategoryId) {
        return {
          ...val,
          fields: data.fields.map(eachField => {
            if (field.id === eachField.id) {
              return {...field, value: input};
            }
            return eachField;
          }),
        };
      }
      return val;
    });
  };

  const handleFeildInputChange = (field: Field, input: string) => {
    const {type} = field;
    switch (type) {
      case FieldType.TEXT:
        dispatch(setMachines(editMachine(field, input)));
        break;
      case FieldType.NUMBER:
        dispatch(setMachines(editMachine(field, input)));
        break;
      case FieldType.CHECKBOX:
        dispatch(setMachines(editMachine(field, isSwitchOn ?? false)));
        break;
      default: // date
        dispatch(setMachines(editMachine(field, date.toDateString())));
    }
  };

  const renderMachineFields = (field: Field) => {
    const {type, name, value} = field;
    switch (type) {
      case FieldType.TEXT:
        return (
          <TextInput
            label={name}
            // @ts-ignore
            value={value}
            onChangeText={val => handleFeildInputChange(field, val)}
            mode={'outlined'}
            style={styles.input}
          />
        );
      case FieldType.NUMBER:
        return (
          <TextInput
            label={name}
            // @ts-ignore
            value={value}
            onChangeText={val => handleFeildInputChange(field, val)}
            mode={'outlined'}
            style={styles.input}
          />
        );
      case FieldType.CHECKBOX:
        return (
          <View style={styles.checkBox}>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              style={styles.switch}
            />
            <Text variant="titleSmall">{name}</Text>
          </View>
        );
      case FieldType.DATE:
        return (
          <View style={styles.date}>
            <Button
              mode="outlined"
              onPress={() => setOpen(true)}
              style={styles.dateBtn}>
              {date.toDateString() || name}
            </Button>
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={val => {
                setOpen(false);
                setDate(val);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <Text style={styles.label} variant="titleSmall">
              {name}
            </Text>
          </View>
        );
      default:
        break;
    }
  };

  const handleMachineDelete = () => {
    const newMachines = machines.filter(val => val.id !== data.id);
    dispatch(setMachines(newMachines));
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title} variant="titleLarge">
        {data.name}
      </Text>
      {data.fields.map(field => renderMachineFields(field))}
      <Button
        icon="delete"
        onPress={handleMachineDelete}
        style={styles.deleteBtn}>
        REMOVE
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
  },
  deleteBtn: {
    width: 150,
    marginTop: 16,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 16,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  switch: {
    marginRight: 16,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  dateBtn: {
    borderRadius: 8,
  },
  label: {
    paddingLeft: 40,
  },
});

export default MachineCard;

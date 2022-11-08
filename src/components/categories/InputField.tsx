import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {Field} from '../../types';

interface Props {
  handleFieldInput: (field: Field, val: string) => void;
  handleFieldDelete: (id: string) => void;
  field: Field;
}

const InputField: React.FunctionComponent<Props> = ({
  field,
  handleFieldInput,
  handleFieldDelete,
}) => {
  return (
    <View style={styles.root}>
      <TextInput
        label="Field"
        value={field.name}
        onChangeText={val => handleFieldInput(field, val)}
        mode={'outlined'}
        style={styles.input}
      />
      <Text style={styles.inputText} variant="bodyMedium">
        {field.type.toUpperCase()}
      </Text>
      <Button
        icon="delete"
        onPress={() => handleFieldDelete(field.id)}
        style={styles.deleteBtn}
        children={''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  input: {
    flex: 1,
    marginRight: 16,
  },
  inputText: {
    width: 88,
  },
  deleteBtn: {
    marginRight: -30,
  },
});

export default InputField;

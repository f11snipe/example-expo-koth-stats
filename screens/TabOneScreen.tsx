import { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

import EditScreenInfo from '../components/EditScreenInfo';
import SearchResults from '../components/SearchResults';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import useAxios from '../hooks/useAxios';

type FormData = {
  subject: string
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [subject, setSubject] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      subject: ''
    }
  });

  const onSubmit = (data: FormData) => setSubject(data.subject);
  const hasSubject = (): boolean => !!subject && subject !== '';

  return (
    <View style={styles.container}>
      {hasSubject() ? (
        <SearchResults subject={subject} />
      ): (
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder='Search...'
                onChangeText={onChange}
                value={value}
              />
            )}
            name="subject"
          />
          {errors.subject && <Text>This is required.</Text>}

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      )}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#ffffff',
    color: '#000000'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

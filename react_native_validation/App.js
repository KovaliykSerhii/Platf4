import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    Alert.alert("Success", "Validation passed!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format"
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Card Number</Text>
      <Controller
        control={control}
        rules={{
          required: "Card number is required",
          pattern: {
            value: /^\d{16}$/,
            message: "Card must have exactly 16 digits"
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="card"
      />
      {errors.card && <Text style={styles.error}>{errors.card.message}</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  }
});

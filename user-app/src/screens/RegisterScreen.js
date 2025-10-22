import React, { useState } from 'react';
import { View, TextInput, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/userSlice';
import CustomButton from '../components/CustomButton';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector(s => s.user);

  const onRegister = async () => {
    if (!name || !phone) return Alert.alert('Name and phone required');
    try {
      await dispatch(register({ name, phone, password })).unwrap();
      navigation.navigate('Main');
    } catch (err) {
      Alert.alert('Register failed', err || 'Error');
    }
  };

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontWeight: '700', marginBottom: 8 }}>Register</Text>
      <TextInput placeholder="Full name" value={name} onChangeText={setName} style={{ borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginBottom: 8 }} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={{ borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginBottom: 8 }} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginBottom: 12 }} />
      <CustomButton title={status === 'loading' ? 'Creating...' : 'Create account'} onPress={onRegister} disabled={status === 'loading'} />
      {error && <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text>}
    </View>
  );
}

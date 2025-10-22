import React, { useState } from 'react';
import { View, TextInput, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import CustomButton from '../components/CustomButton';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const onLogin = async () => {
    try {
      await dispatch(login({ phone, password })).unwrap();
      navigation.navigate('Main');
    } catch (err) {
      Alert.alert('Login failed', err || 'Invalid credentials');
    }
  };

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontWeight: '700', marginBottom: 8 }}>Login</Text>
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={{ borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginBottom: 8 }} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginBottom: 12 }} />
      <CustomButton title={status === 'loading' ? 'Logging in...' : 'Login'} onPress={onLogin} disabled={status === 'loading'} />
      <Text style={{ marginTop: 12, color: '#0a84ff' }} onPress={() => navigation.navigate('Register')}>Create account</Text>
      {error && <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text>}
    </View>
  );
}

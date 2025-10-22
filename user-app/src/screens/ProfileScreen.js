import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, loadProfile } from '../redux/slices/userSlice';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector(s => s.user);

  useEffect(() => { dispatch(loadProfile()); }, [dispatch]);

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>Profile</Text>
      <Text style={{ marginTop: 8 }}>Name: {user?.name || '—'}</Text>
      <Text>Phone: {user?.phone || '—'}</Text>
      <View style={{ marginTop: 12 }}>
        <Button title="Logout" onPress={() => dispatch(logout())} />
      </View>
    </View>
  );
}

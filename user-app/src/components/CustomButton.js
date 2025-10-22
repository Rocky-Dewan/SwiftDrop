import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, disabled && { opacity: 0.6 }]} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: '#0a84ff', padding: 12, borderRadius: 8, alignItems: 'center' },
  text: { color: '#fff', fontWeight: '600' }
});

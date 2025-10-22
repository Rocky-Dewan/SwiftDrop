import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loader({ size = 'large' }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

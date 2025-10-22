import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CartItem({ item, onRemove, onUpdateQty }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '600' }}>{item.name}</Text>
        <Text>৳ {item.price}</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => onUpdateQty(item.product, Math.max(1, item.qty - 1))} style={styles.qtyBtn}><Text>-</Text></TouchableOpacity>
          <Text style={{ marginHorizontal: 8 }}>{item.qty}</Text>
          <TouchableOpacity onPress={() => onUpdateQty(item.product, item.qty + 1)} style={styles.qtyBtn}><Text>+</Text></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onRemove(item.product)} style={{ marginTop: 6 }}><Text style={{ color: '#d00' }}>Remove</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { padding: 12, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', padding: 4, borderRadius: 6 },
  qtyBtn: { paddingHorizontal: 8 }
});

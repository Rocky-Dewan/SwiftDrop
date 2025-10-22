import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress, onAdd }) {
  const img = product.images && product.images[0] ? `http://10.0.2.2:5000${product.images[0]}` : 'https://via.placeholder.com/150';
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <Image source={{ uri: img }} style={styles.image} />
      <View style={styles.right}>
        <Text numberOfLines={1} style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>৳ {product.price}</Text>
        <TouchableOpacity onPress={() => onAdd(product)} style={styles.addBtn}><Text style={{ color: '#fff' }}>Add</Text></TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  image: { width: 80, height: 80, borderRadius: 8 },
  right: { flex: 1, paddingLeft: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600' },
  price: { marginTop: 6 },
  addBtn: { marginTop: 8, backgroundColor: '#0a84ff', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, alignSelf: 'flex-start' }
});


import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, Alert } from 'react-native';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

export default function ProductDetails({ route, navigation }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data)).catch(err => {
      console.error(err);
      Alert.alert('Error', 'Failed to load product');
    });
  }, [id]);

  if (!product) return <View style={{ padding: 16 }}><Text>Loading...</Text></View>;

  const img = product.images && product.images[0] ? `http://10.0.2.2:5000${product.images[0]}` : 'https://via.placeholder.com/400';

  return (
    <ScrollView style={{ padding: 12 }}>
      <Image source={{ uri: img }} style={{ width: '100%', height: 260, borderRadius: 8 }} />
      <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 12 }}>{product.name}</Text>
      <Text style={{ marginTop: 8, fontSize: 16 }}>৳ {product.price}</Text>
      <Text style={{ marginTop: 12 }}>{product.description}</Text>
      <View style={{ marginTop: 18 }}>
        <Button title="Add to Cart" onPress={() => { dispatch(addToCart({ product, qty: 1 })); navigation.navigate('Cart'); }} />
      </View>
    </ScrollView>
  );
}

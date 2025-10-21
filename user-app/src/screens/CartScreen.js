import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { removeFromCart, updateQty } from '../redux/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const items = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onRemove = (id) => dispatch(removeFromCart(id));
  const onUpdateQty = (productId, qty) => dispatch(updateQty({ productId, qty }));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = items.length ? 30 : 0;
  const total = subtotal + deliveryFee;

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={items} keyExtractor={i => i.product} renderItem={({ item }) => (
        <CartItem item={item} onRemove={onRemove} onUpdateQty={onUpdateQty} />
      )} 
  );
}

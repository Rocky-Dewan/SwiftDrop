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
      )} ListEmptyComponent={<Text style={{ padding: 12 }}>Your cart is empty</Text>} />
      <View style={{ padding: 12, borderTopWidth: 1, borderColor: '#eee' }}>
        <Text>Subtotal: ৳ {subtotal.toFixed(2)}</Text>
        <Text>Delivery: ৳ {deliveryFee.toFixed(2)}</Text>
        <Text style={{ fontWeight: '700', marginTop: 6 }}>Total: ৳ {total.toFixed(2)}</Text>
        <View style={{ marginTop: 10 }}>
          <Text onPress={() => navigation.navigate('Checkout')} style={{ color: '#0a84ff', fontWeight: '600' }}>Proceed to Checkout</Text>
        </View>
      </View>
    </View>
  );
}

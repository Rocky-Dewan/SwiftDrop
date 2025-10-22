import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../components/CustomButton';
import { placeOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';

export default function CheckoutScreen() {
  const cart = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [address, setAddress] = useState('');

  const onPlaceOrder = async () => {
    if (!address) return Alert.alert('Address required');
    const payload = {
      items: cart.map(i => ({ product: i.product, qty: i.qty })),
      shippingAddress: { addressLine: address },
      paymentMethod: 'Cash On Delivery',
      deliveryFee: 30
    };
    try {
      const res = await dispatch(placeOrder(payload)).unwrap();
      dispatch(clearCart());
      Alert.alert('Order placed', `Order ID: ${res._id}`);
      nav.navigate('Orders');
    } catch (err) {
      Alert.alert('Error', err || 'Failed to place order');
    }
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + (cart.length ? 30 : 0);

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontWeight: '700', marginBottom: 8 }}>Delivery Address</Text>
      <TextInput placeholder="Enter full address" value={address} onChangeText={setAddress} style={{ borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginBottom: 12 }} />
      <Text>Subtotal: ৳ {subtotal.toFixed(2)}</Text>
      <Text>Delivery: ৳ {cart.length ? '30.00' : '0.00'}</Text>
      <Text style={{ fontWeight: '700', marginTop: 8 }}>Total: ৳ {total.toFixed(2)}</Text>
      <View style={{ marginTop: 12 }}>
        <CustomButton title="Place Order" onPress={onPlaceOrder} disabled={cart.length === 0} />
      </View>
    </View>
  );
}

import React, { useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../redux/slices/orderSlice';

export default function OrderHistory() {
  const dispatch = useDispatch();
  const { list, status } = useSelector(s => s.orders);

  useEffect(() => { dispatch(fetchMyOrders()); }, [dispatch]);

  if (status === 'loading') return <View style={{ padding: 12 }}><Text>Loading...</Text></View>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={list} keyExtractor={o => o._id} renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
          <Text style={{ fontWeight: '700' }}>Order {item._id}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Total: ৳ {item.totalPrice}</Text>
        </View>
      )} ListEmptyComponent={<Text style={{ padding: 12 }}>No orders yet</Text>} />
    </View>
  );
}

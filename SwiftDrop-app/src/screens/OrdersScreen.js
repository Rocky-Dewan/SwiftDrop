import React, { useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../redux/slices/orderSlice";
import DeliveryCard from "../components/DeliveryCard";

const OrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <ScrollView style={{ padding: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Active Orders</Text>
      {orders.map((o) => (
        <DeliveryCard key={o._id} order={o} onPress={() => navigation.navigate("OrderDetails", { order: o })} />
      ))}
    </ScrollView>
  );
};

export default OrdersScreen;

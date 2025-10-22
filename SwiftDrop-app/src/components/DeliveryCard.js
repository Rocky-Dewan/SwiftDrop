import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DeliveryCard = ({ order, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>Order #{order._id}</Text>
      <Text>Customer: {order.customerName}</Text>
      <Text>Address: {order.address}</Text>
      <Text>Total: ৳{order.total}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6
  }
});

export default DeliveryCard;

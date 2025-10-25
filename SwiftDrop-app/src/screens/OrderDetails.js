import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StatusBadge from "../components/StatusBadge";
import MapTracker from "../components/MapTracker";

const OrderDetails = ({ route }) => {
  const { order } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.title}>Order #{order._id}</Text>
      <StatusBadge status={order.status} />
      <Text style={styles.info}>Customer: {order.customerName}</Text>
      <Text style={styles.info}>Address: {order.address}</Text>
      <MapTracker destination={order.destination} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  info: { marginVertical: 4 }
});

export default OrderDetails;

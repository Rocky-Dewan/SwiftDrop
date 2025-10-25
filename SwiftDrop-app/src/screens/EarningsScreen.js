import React from "react";
import { View, Text } from "react-native";

const EarningsScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Earnings</Text>
      <Text>Total Deliveries: 58</Text>
      <Text>Total Earnings: ৳ 12,800</Text>
      <Text>Last Payment: ৳ 3,500</Text>
    </View>
  );
};

export default EarningsScreen;

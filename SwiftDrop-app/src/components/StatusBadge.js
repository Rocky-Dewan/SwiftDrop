import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatusBadge = ({ status }) => {
  const colors = {
    pending: "#f39c12",
    picked: "#2980b9",
    delivered: "#27ae60",
    cancelled: "#e74c3c"
  };

  return (
    <View style={[styles.badge, { backgroundColor: colors[status] || "#7f8c8d" }]}>
      <Text style={styles.text}>{status.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  text: {
    color: "white",
    fontWeight: "600"
  }
});

export default StatusBadge;

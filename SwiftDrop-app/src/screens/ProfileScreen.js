import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/deliverySlice";

const ProfileScreen = () => {
  const { agent } = useSelector((state) => state.delivery);
  const dispatch = useDispatch();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Profile</Text>
      <Text>Name: {agent?.name}</Text>
      <Text>Email: {agent?.email}</Text>
      <TouchableOpacity
        onPress={() => dispatch(logout())}
        style={{ backgroundColor: "red", padding: 12, borderRadius: 8, marginTop: 20 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

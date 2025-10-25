import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { loginDeliveryAgent } from "../redux/slices/deliverySlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) return Alert.alert("Error", "Please fill all fields");
    dispatch(loginDeliveryAgent({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SwiftDrop Agent Login</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: "#27ae60", padding: 14, borderRadius: 8 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "600" }
});

export default LoginScreen;

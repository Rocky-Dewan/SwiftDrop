import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const MapTracker = ({ destination }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  if (!location) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        <Marker coordinate={location} title="You" pinColor="blue" />
        {destination && (
          
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 250, borderRadius: 12, overflow: "hidden", marginVertical: 10 },
  map: { width: "100%", height: "100%" }
});

export default MapTracker;

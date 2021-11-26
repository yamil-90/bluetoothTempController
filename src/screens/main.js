import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, View } from 'react-native';
import BluetoothScanner from '../components/BluetoothScanner';
import Temperature from '../components/Temperature';

export default function App() {
  const [temperature, setTemperature] = useState(0);

  return (
    <View style={styles.container}>
      <BluetoothScanner
        temperature={temperature}
        setTemperature={setTemperature} />
      <Temperature
        temperature={temperature}
        setTemperature={setTemperature} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

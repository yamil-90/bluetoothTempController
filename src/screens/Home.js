import React, { useState } from 'react';
import { StatusBar, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

import BluetoothScanner from '../components/BluetoothScanner';
import Temperature from '../components/Temperature';
import Loading from '../components/utils/Loading';

const Home = ({ navigation }) => {
  const [temperature, setTemperature] = useState(null);
 const [isConnected, setIsConnected] = useState(false);

 const [loading, setLoading] = useState(false)
  return (
    <View style={styles.container}>
        {isConnected? <Text>conectado</Text> : <Text>no conectado</Text>}
        <Loading
          loading={loading}
        />
      <BluetoothScanner
        temperature={temperature}
        setTemperature={setTemperature}
        navigation={navigation}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        loading={loading}
        setLoading={setLoading}
        />
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
export default Home;
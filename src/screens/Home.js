import React, { useEffect, useState } from 'react';
import { StatusBar, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

import BluetoothScanner from '../components/BluetoothScanner';
import Temperature from '../components/Temperature';
import Loading from '../components/utils/Loading';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']);

import { BleManager } from 'react-native-ble-plx';

export const manager = new BleManager();

const Home = ({ navigation }) => {
  const [temperature, setTemperature] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [device, setDevice] = useState('');

  const [loading, setLoading] = useState(false)

  const sendTemperature = (temperature)=>{
    const msg = {
      temperature: temperature
    }
    manager.writeCharacteristicWithResponseForDevice(
      msg
    )
    .then((resp) => {
      console.log('WRITE resp = ', resp);
    })
    .catch((err) => {
      console.log('WRITE err = ', err);
    });
  }

  useEffect(() => {
    if(isConnected){
      sendTemperature(temperature)
    }
  }, [isConnected]);
  

  return (
    <View style={styles.container}>
      {isConnected ? <Text>conectado</Text> : <Text>no conectado</Text>}
      <Loading
        loading={loading}
      />
      <BluetoothScanner
        setDevice={setDevice}
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
        setTemperature={setTemperature}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
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
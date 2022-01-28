import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import BluetoothScanner from '../components/BluetoothScanner';
import Temperature from '../components/Temperature';
import Loading from '../components/utils/Loading';
import { LogBox } from 'react-native';
import { btoa } from 'react-native-quick-base64';

LogBox.ignoreLogs(['new NativeEventEmitter']);

import { BleManager } from 'react-native-ble-plx';

export const manager = new BleManager();

const Home = ({ navigation }) => {
  //placeholders
  const SerialServiceUUID = '0000dfb0-0000-1000-8000-00805f9b34fb';
  const SerialCharacteristicUUID = '0000dfb1-0000-1000-8000-00805f9b34fb';

  const [temperature, setTemperature] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [device, setDevice] = useState('');
  const [updateTemp, setUpdateTemp] = useState(false);
  const [newTemperature, setNewTemperature] = useState(null);

  const [loading, setLoading] = useState(false);

  const sendTemperature = async (newTemperature) => {
    const msg = btoa.encode(newTemperature)
    await manager.writeCharacteristicWithResponseForDevice(
      device.id,
      SerialServiceUUID,
      SerialCharacteristicUUID,
      msg
    )
      .then((resp) => {
        console.log('WRITE resp = ', resp);
      })
      .catch((err) => {
        console.log('WRITE err = ', err);
      });
  }

  const getTemperature = async () => {
      await manager.readCharacteristicForService(
        device.id,
        SerialServiceUUID,
      )
      .then((resp) => {
        setTemperature(resp.temperature)
        console.log('WRITE resp = ', resp);
      })
      .catch((err) => {
        console.log('WRITE err = ', err);
      });
  }
  useEffect(() => {
    if (isConnected){
      getTemperature()
    }
  }, []);
  

  useEffect(() => {
    if (isConnected && updateTemp) {
      sendTemperature(newTemperature)
    }
  }, [isConnected, updateTemp]);


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
        setUpdateTemp={setUpdateTemp}
        newTemperature={newTemperature}
         setNewTemperature={setNewTemperature}
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
import React, { useState, useEffect } from 'react';
import { View, PermissionsAndroid, StyleSheet } from 'react-native';
import { manager } from '../screens/Home';
import ModalBluetooth from './ModalBluetooth';
import Options from './Options';

const MoreIcon = require('../../resources/android-three-dots-icon-9.jpg')


// BlueetoothScanner does:
// - access/enable bluetooth module
// - scan bluetooth devices in the area
// - list the scanned devices



const requestPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    title: "Request for Location Permission",
    message: "Bluetooth Scanner requires access to Fine Location Permission",
    buttonNeutral: "Ask Me Later",
    buttonNegative: "Cancel",
    buttonPositive: "OK"
  }
  );
  return (granted === PermissionsAndroid.RESULTS.GRANTED);
}

const activateBluetooth = async () => {
  const btState = await manager.state()
  // test is bluetooth is supported
  if (btState === "Unsupported") {
    alert("Bluetooth no esta disponible");
    return (false);
  }
  // enable if it is not powered on
  if (btState !== "PoweredOn") {
    await manager.enable();
  } else {
    await manager.disable();
  }
  return (true);
}


export default function BluetoothScanner(props) {
  const [logData, setLogData] = useState([]);
  const [logCount, setLogCount] = useState(0);
  const [scannedDevices, setScannedDevices] = useState({});
  const [deviceCount, setDeviceCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { isConnected, setIsConnected, loading, setLoading, navigation, setDevice } = props;

  useEffect(() => {
    manager.onStateChange(async (state) => {
      const subscription = manager.onStateChange((state) => {
        const newLogData = logData;
        newLogData.push(state);
        setLogCount(newLogData.length);
        setLogData(newLogData);
        subscription.remove();
      }, true);
      return () => subscription.remove();
    });
  }, [manager]);

  const scanDevices = async () => {
    // setIsVisible(true) //TODO sacar esto para el deploy
    //TODO cambiar texto si esta conectado
    const btState = await manager.state()
    // test if bluetooth is powered on
    setLoading(true)
    if (btState !== "PoweredOn") {
      setLoading(false)
      alert("Bluetooth no esta encendido");
      return (false);
    }
    // explicitly ask for user's permission
    const permission = await requestPermission();
    if (permission) {
      setIsVisible(true);
      setLoading(false)
      manager.startDeviceScan(null, null, (error, device) => {
        // error handling
        if (error) {

          console.log(error);
          return;
        }
        // found a bluetooth device
        if (device.name) {

          // console.log(`${device.name} (${device.id})}`);
          const newScannedDevices = scannedDevices;
          newScannedDevices[device.id] = device;
          setDeviceCount(Object.keys(newScannedDevices).length);
          setScannedDevices(scannedDevices);
        }
      });
    }
    return (true);
  }
  const navigateTo = () => {
    navigation.navigate('Contacto')
  }



  return (
    <View style={styles.view}>
      <View style={{ height: 50 }}>
        <Options
          button={MoreIcon}
          buttonStyle={{ width: 32, height: 40, margin: 7.5, resizeMode: "contain" }}
          destructiveIndex={1}
          options={["Activar Bluetooth", "Escanear Dispositivos", "Contacto", 'Cancelar']}
          actions={[activateBluetooth, scanDevices, navigateTo]} />
      </View>
      <ModalBluetooth
        setDevice={setDevice}
        manager={manager}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        logData={logData}
        logCount={logCount}
        deviceCount={deviceCount}
        scannedDevices={scannedDevices}
        setDeviceCount={setDeviceCount}
        setScannedDevices={setScannedDevices}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        loading={loading}
        setLoading={setLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    right: 0,
    height: 'auto'
  },
  listView: {
    paddingHorizontal: 10,
    height: 'auto',
  },
  btn: {
    alignItems: "center",
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#3572b0',
    borderRadius: 5,
    marginHorizontal: 1
  },
  text: {
    color: "#fff",
    fontSize: 18
  },
})
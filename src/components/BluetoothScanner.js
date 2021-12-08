import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, PermissionsAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import ModalBluetooth from './ModalBluetooth';
import OptionsMenu from 'react-native-option-menu';

const MoreIcon = require('../../resources/android-three-dots-icon-9.jpg')


// BlueetoothScanner does:
// - access/enable bluetooth module
// - scan bluetooth devices in the area
// - list the scanned devices
export const manager = new BleManager();


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

const scanDevices = async () => {
  // setIsVisible(true) //TODO sacar esto para el deploy
  //TODO cambiar texto si esta conectado
  const btState = await manager.state()
  // test if bluetooth is powered on
  if (btState !== "PoweredOn") {
    alert("Bluetooth no esta encendido");
    return (false);
  }
  // explicitly ask for user's permission
  const permission = await requestPermission();
  if (permission) {
    manager.startDeviceScan(null, null, async (error, device) => {
      // error handling
      if (error) {
        console.log(error);
        return
      }
      // found a bluetooth device
      // if (device.name) {
      setIsVisible(true)

      // console.log(`${device.name} (${device.id})}`);
      const newScannedDevices = scannedDevices;
      newScannedDevices[device.id] = device;
      await setDeviceCount(Object.keys(newScannedDevices).length);
      await setScannedDevices(scannedDevices);
      // }
    });
  }
  return (true);
}

export default function BluetoothScanner({navigation}) {
  const [logData, setLogData] = useState([]);
  const [logCount, setLogCount] = useState(0);
  const [scannedDevices, setScannedDevices] = useState({});
  const [deviceCount, setDeviceCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false)

  const navigateTo =()=>{
    navigation.navigate('Contacto')
  }
  

  useEffect(() => {
    manager.onStateChange((state) => {
      const subscription = manager.onStateChange(async (state) => {
        // console.log(state);
        const newLogData = logData;
        newLogData.push(state);
        await setLogCount(newLogData.length);
        await setLogData(newLogData);
        subscription.remove();
      }, true);
      return () => subscription.remove();
    });
  }, [manager]);

  return (
    <View style={styles.view}>
        <View style={{height:50  }}>
        <OptionsMenu
          button={MoreIcon}
          buttonStyle={{ width: 32, height: 40, margin: 7.5, resizeMode: "contain"}}
          destructiveIndex={1}
          options={["Activar Bluetooth", "Escanear Dispositivos", "Contacto", 'Cancelar']}
          actions={[activateBluetooth, scanDevices, navigateTo]} />
        </View>
      <View style={styles.listView}>
        <ModalBluetooth
          manager={manager}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          logData={logData}
          logCount={logCount}
          deviceCount={deviceCount}
          scannedDevices={scannedDevices}
          setDeviceCount={setDeviceCount}
          setScannedDevices={setScannedDevices} />
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
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
          }}><Text style={styles.text}>Activar Bluetooth</Text></TouchableOpacity> */}

      </View>

      <View style={styles.listView}>

        {/* <TouchableOpacity
          style={styles.btn}
          title="Escanear Dispositivos"
          onPress={async () => {
            // setIsVisible(true) //TODO sacar esto para el deploy
            //TODO cambiar texto si esta conectado
            const btState = await manager.state()
            // test if bluetooth is powered on
            if (btState !== "PoweredOn") {
              alert("Bluetooth no esta encendido");
              return (false);
            }
            // explicitly ask for user's permission
            const permission = await requestPermission();
            if (permission) {
              manager.startDeviceScan(null, null, async (error, device) => {
                // error handling
                if (error) {
                  console.log(error);
                  return
                }
                // found a bluetooth device
                // if (device.name) {
                setIsVisible(true)

                // console.log(`${device.name} (${device.id})}`);
                const newScannedDevices = scannedDevices;
                newScannedDevices[device.id] = device;
                await setDeviceCount(Object.keys(newScannedDevices).length);
                await setScannedDevices(scannedDevices);
                // }
              });
            }
            return (true);
          }}><Text style={styles.text}>Escanear Dispositivos</Text></TouchableOpacity> */}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position:'absolute',
    right:0,
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
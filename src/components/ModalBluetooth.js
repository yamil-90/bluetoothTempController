import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';

export default function ModalBluetooth(props) {
  const { logData, logCount, deviceCount, setDeviceCount, scannedDevices, setScannedDevices, isVisible, setIsVisible, manager } = props

  const closeModal = () => {
    manager.stopDeviceScan()
    setScannedDevices({})
    setDeviceCount(0)
    setIsVisible(false)
  }
  const connectDevice = (device) => {
    
    device.connect()
      .then((device) => {
        return device.discoverAllServicesAndCharacteristics()
      })
      .then((device) => {
        console.log(device)
        console.log('yeeees')
      })
      .catch((error) => {
        // Handle errors
        console.log(error)
        device.cancelConnection()
        console.log('disconected')
      });
    Alert.alert(device.name, `id: ${device.id}, nombre: ${device.name}, readable: ${device.isReadable}`)
  }

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {/* <Text style={{fontWeight: "bold"}}>Bluetooth Log ({logCount})</Text>

            <FlatList
          data={logData}
          renderItem={({item}) => {
            return (<Text>{item}</Text>)
          }}
        /> */}
      <Text style={{ fontWeight: "bold" }}>Dispositivos Escaneados({deviceCount})</Text>
      <FlatList
        data={Object.values(scannedDevices)}
        renderItem={({ item }) => {
          return (
            <>
            <TouchableOpacity onPress={() => connectDevice(item)} style={styles.btn}>
              <Text style={styles.text}>{`${item.name}(${item.isConnectable})`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>console.log(item.isConnected())} ><Text>desconectar</Text></TouchableOpacity>
            </>
            )
        }}
      />
    </Overlay>
  )
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    marginTop: 30,
    height: 'auto',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center'
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
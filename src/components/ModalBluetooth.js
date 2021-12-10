import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import Loading from './utils/Loading';

export default function ModalBluetooth(props) {
  const { 
    logData,
    logCount,
    deviceCount,
    setDeviceCount,
    scannedDevices,
    setScannedDevices,
    isVisible,
    setIsVisible,
    manager,
    isConnected,
    setIsConnected,
    loading,
    setLoading
  } = props

  const closeModal = () => {
    manager.stopDeviceScan()
    setScannedDevices({})
    setDeviceCount(0)
    setIsVisible(false);
    setLoading(false)
  }
  const connectDevice = async (device) => {
    // console.log(device)

    manager.cancelDeviceConnection(device.id);
    setLoading(true);
    await device.connect()
      .then((device) => {
        return device.discoverAllServicesAndCharacteristics()
      })
      .then((device) => {
        // console.log(device)
        console.log('yeeees')
        setLoading(false)
        setIsConnected(true)
        Alert.alert(device.name ? device.name : 'NO NAME', `id: ${device.id}, nombre: ${device.name}, readable: ${device.isReadable} El dispositivo esta conectado`)
      })
      .catch((error) => {
        // Handle errors
        console.log(error)
        device.cancelConnection()
        console.log('disconected')
        setLoading(false)
        Alert.alert('no se pudo conectar al dispositivo')
      });
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
      <Text style={{ fontWeight: "bold" }}>Dispositivos Escaneados({deviceCount}) {loading?'loading': 'not loading'}</Text>
      <FlatList
        data={Object.values(scannedDevices)}
        renderItem={({ item }) => {
          return (
            <>
            {/* <Loading
              loading={loading}
              setLoading={setLoading}
            /> */}
              <TouchableOpacity onPress={() => connectDevice(item)} style={styles.btn}>
                <Text style={styles.text}>{`${item.name ? item.name : 'NO NAME'}(${item.isConnectable}) local name: ${item.localName} id: ${item.id}`}</Text>
              </TouchableOpacity>
              {item.isConnected()._U ?
                <TouchableOpacity style={styles.btn} onPress={() => console.log(item.isConnected()._U)} ><Text>desconectar</Text></TouchableOpacity>
                : null}
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
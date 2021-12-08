import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, View } from 'react-native';

import BluetoothScanner from '../components/BluetoothScanner';
import Options from '../components/Options';
import Temperature from '../components/Temperature';

const Home = ({ navigation }) => {
  const [temperature, setTemperature] = useState(0);

  return (
    <View style={styles.container}>
        {/* <Options
         temperature={temperature}
         setTemperature={setTemperature}
        /> */}
      <BluetoothScanner
        temperature={temperature}
        setTemperature={setTemperature}
        navigation={navigation} />
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
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ModalTemperature from './ModalTemperature'

export default function Temperature(props) {
  const { temperature, setTemperature, isConnected, setIsConnected, newTemperature, setNewTemperature } = props;



  const changeTemperature = (value) => {
    if (newTemperature !== null) {
      if (value == '.') {
        console.log('not null');
        let temp = `${newTemperature}${value}`
        setNewTemperature(temp)
      } else {
        console.log('not null');
        let temp = "" + newTemperature + value
        setNewTemperature(+temp)
        if (isNaN(newTemperature)) {
          setNewTemperature(null)
        }
      }
    } else {
      console.log('log');
      setNewTemperature(+value)
    }
  }
  const changeByOne = (value) => {
    if (isConnected) {
      setTemperature(temperature + value)
    }
  }
  const setToTemperature = (value) => {
    if (newTemperature !== null && typeof (+temperature) !== 'number') {
      setNewTemperature(value)
    }
  }
  const enterTemperature = () => {
    if (newTemperature !== null && typeof (newTemperature) == 'number' && isConnected) {
      setTemperature(+newTemperature)
      setNewTemperature(null)
    } else setNewTemperature(null)
  }
  return (
    <View style={styles.view}>
      <View style={styles.temperature_container}>
        <View style={styles.temperature}>
          {newTemperature !== null ?
            <Text style={styles.newTemperature_text}>{newTemperature}</Text> :
            <Text style={styles.newTemperature_text}>--</Text>}
          <View style={styles.main_temp}>
            {temperature !== null ?
              <View style={styles.units}>
                <Text style={styles.temperature_text}>
                  {temperature.toFixed(1)}
                </Text>
                <Text style={styles.units_text}> ºC</Text>
              </View>
              :
              <Text style={styles.temperature_text}>--</Text>}

          </View>
        </View>
        <View style={styles.side_buttons}>
          <TouchableOpacity style={styles.side_triangle_up} onPress={() => changeByOne(+1)}><Text style={styles.text}>+</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.triangle_down, styles.side_triangle_up]} onPress={() => changeByOne(-1)}><Text style={styles.text}>-</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttons}>

        <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={() => changeTemperature(7)}><Text style={styles.text}>7</Text></TouchableOpacity>
        <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={() => changeTemperature(8)}><Text style={styles.text}>8</Text></TouchableOpacity>
        <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={() => changeTemperature(9)}><Text style={styles.text}>9</Text></TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.red_TouchableOpacity} onPress={() => changeTemperature(4)}><Text style={styles.text}>4</Text></TouchableOpacity>
        <TouchableOpacity style={styles.red_TouchableOpacity} onPress={() => changeTemperature(5)}><Text style={styles.text}>5</Text></TouchableOpacity>
        <TouchableOpacity style={styles.red_TouchableOpacity} onPress={() => changeTemperature(6)}><Text style={styles.text}>6</Text></TouchableOpacity>

      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={() => changeTemperature(1)}><Text style={styles.text}>1</Text></TouchableOpacity>
        <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={() => changeTemperature(2)}><Text style={styles.text}>2</Text></TouchableOpacity>
        <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={() => changeTemperature(3)}><Text style={styles.text}>3</Text></TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.red_TouchableOpacity} onPress={() => changeTemperature('.')}><Text style={styles.text}>.</Text></TouchableOpacity>
        <TouchableOpacity style={styles.red_TouchableOpacity} onPress={() => changeTemperature(0)}><Text style={styles.text}>0</Text></TouchableOpacity>
        <TouchableOpacity style={styles.red_TouchableOpacity} onPress={() => enterTemperature()}><Icon style={styles.text} name="subdirectory-arrow-left" /></TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    flex: 1,
    top: 100,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
  },
  temperature: {
    flexDirection: 'column',
    justifyContent: 'center',

  },
  temperature_container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row'

  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10

  },
  red_TouchableOpacity: {
    alignItems: "center",
    justifyContent: 'center',
    width: 60,
    height: 60,
    padding: 10,
    backgroundColor: '#90a6de',
    borderRadius: 5,
    marginHorizontal: 5
  },
  blue_TouchableOpacity: {
    alignItems: "center",
    justifyContent: 'center',
    width: 60,
    height: 60,
    padding: 10,
    backgroundColor: '#3572b0',
    borderRadius: 5,
    marginHorizontal: 5
  },
  text: {
    color: "#fff",
    fontSize: 20
  },
  temperature_text: {
    fontSize: 60,
  },
  newTemperature_text: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    fontSize: 20
  },
  main_temp: {
  },
  units: {
    flexDirection: 'row'
  },
  units_text: {

    fontSize: 20,
  },
  side_buttons: {
    flexDirection: 'column',
    position: 'absolute',
    right: 10
  },
  side_triangle_up: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#3572b0",
    marginBottom: 5
  },
  triangle_down: {
    transform: [{ rotate: "180deg" }],
  },
})
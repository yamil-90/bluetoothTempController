import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native';
import ModalTemperature from './ModalTemperature'

export default function Temperature(props){
    const {temperature, setTemperature}=props;
    const [isVisible, setIsVisible] = useState(false)

    const changeTemperature=(value)=>{
        if(temperature!==null){
          setTemperature(temperature+value)
        }
        
      }
      const setToTemperature=(value)=>{
        if(temperature!==null){
          setTemperature(value)
        }
      }
    return(
       <View style={styles.view}>
        {/* <Text>Temperatura</Text> */}
      <View style={styles.temperature}>
      <ModalTemperature
       isVisible={isVisible}
       setIsVisible={setIsVisible}
       temperature={temperature}
       setTemperature={setTemperature}
      />
      {temperature!==null? <Text onPress={()=>setIsVisible(true)} style={styles.temperature_text}>{temperature.toFixed(1)}</Text> : <Text style={styles.temperature_text}>--</Text>}<Text style={styles.units}>ºc</Text>
      </View>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={()=>changeTemperature(1)}><Text style={styles.text}>+1</Text></TouchableOpacity>
      <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={()=>changeTemperature(5)}><Text style={styles.text}>+5</Text></TouchableOpacity>
      <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={()=>changeTemperature(10)}><Text style={styles.text}>+10</Text></TouchableOpacity>
      </View>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.red_TouchableOpacity}  onPress={()=>changeTemperature(-1)}><Text style={styles.text}>-1</Text></TouchableOpacity>
      <TouchableOpacity style={styles.red_TouchableOpacity}  onPress={()=>changeTemperature(-5)}><Text style={styles.text}>-5</Text></TouchableOpacity>
      <TouchableOpacity style={styles.red_TouchableOpacity}  onPress={()=>changeTemperature(-10)}><Text style={styles.text}>-10</Text></TouchableOpacity>
      
      </View>
      <View style={styles.buttons}>

      <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={()=>setToTemperature(10)}><Text style={styles.text}>10</Text></TouchableOpacity>
      <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={()=>setToTemperature(20)}><Text style={styles.text}>20</Text></TouchableOpacity>
      <TouchableOpacity style={styles.blue_TouchableOpacity} onPress={()=>setToTemperature(30)}><Text style={styles.text}>30</Text></TouchableOpacity>
      </View>
       </View>
    )
}

const styles = StyleSheet.create({
  view:{
    position: 'absolute',
    flex:1,
    top: 200,
    alignItems:'center',

    justifyContent:'flex-end',
  },
    temperature:{
        flexDirection:'row',
        justifyContent:'center',
        
      },
      buttons:{
        flexDirection:"row",
        alignItems:"center", 
        marginTop:10  
        
      },
      red_TouchableOpacity:{
        alignItems: "center",
        justifyContent:'center',
        width: 60,
        height: 60,
        padding: 10,
        backgroundColor:'#90a6de',
        borderRadius:5,
        marginHorizontal:5
      },
      blue_TouchableOpacity:{
        alignItems: "center",
        justifyContent:'center',
        width: 60,
        height: 60,
        padding: 10,
        backgroundColor:'#3572b0',
        borderRadius:5,
        marginHorizontal:5
      },
      text:{
        color:"#fff",
        fontSize:20
      },
      temperature_text:{
        fontSize: 110,
        justifyContent:'center',
        alignItems:'center',
      },
      units:{
        justifyContent:'flex-start',
        alignItems: 'flex-start'
      }
})
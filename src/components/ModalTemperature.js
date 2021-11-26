import React, { useState } from 'react';
import  {StyleSheet, Text, TextInput } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements';
export default function ModalBluetooth(props){
    const {temperature, setTemperature, isVisible, setIsVisible} = props
    const [newTemperature, setNewTemperature] = useState(null)

    const closeModal= () => {
        setIsVisible(false)
    }

    const onSubmit = () =>{
        setTemperature(+newTemperature)
        setIsVisible(false)
    }

    return (
        <Overlay 
        isVisible={isVisible} 
        overlayStyle={styles.overlay}
        onBackdropPress={closeModal}
        
        >
                    <Text style={{fontWeight: "bold"}}>Nueva temperatura</Text>
        <TextInput
        keyboardType='numbers-and-punctuation'
        style={styles.input}
        onChange={e =>setNewTemperature(e.nativeEvent.text)}
        />
           <Button
           title={'Cambiar'}
           onPress={onSubmit}
           />
        
        </Overlay>
    )
}
const styles = StyleSheet.create({
    overlay:{
        marginTop:30,
        height:'auto',
        width:'80%',
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        fontSize: 40,
        textAlign:'center'
    }
})
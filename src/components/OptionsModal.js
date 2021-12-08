import React, { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements';
import BluetoothScanner from './BluetoothScanner';

const OptionsModal= (props)=> {
   const {isVisible, setIsVisible}=props

    const closeModal = () => {
        setIsVisible(false)
    }

    
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.overlay}
            onBackdropPress={closeModal}

        >
            <Text style={{ fontWeight: "bold" }}>opciones</Text>
            <BluetoothScanner
            
            />

        </Overlay>
    )
}
const styles = StyleSheet.create({
    overlay: {
        marginTop: 30,
        height: 'auto',
        width: '80%',
        top:0
    },
    input: {
        fontSize: 40,
        textAlign: 'center'
    }
})

export default OptionsModal;
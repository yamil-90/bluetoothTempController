import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';


const Loading =(props)=>{
    const {loading, setLoading}= props;
    

    return(
        <Overlay
      isVisible={loading}
      overlayStyle={styles.overlay}
      backdropStyle={styles.backdropOverlay}
    ><ActivityIndicator /></Overlay>
    )
}
export default Loading;

const styles = StyleSheet.create({
    overlay: {
      marginTop: 30,
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: "#000",
      fontSize: 18
    },
    backdropOverlay:{
        display:'none'
    }
  })
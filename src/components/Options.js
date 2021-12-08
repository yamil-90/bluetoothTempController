import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import OptionsModal from './OptionsModal';

const Options = (props) => {
    const [isVisible, setIsVisible] = useState(false)


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.options}
                onPress={() => setIsVisible(true)}>
                <Text>...</Text>
            </TouchableOpacity>
            <OptionsModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                props={props}
                
            />
        </View>
    )
}
export default Options;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'red',
        alignSelf: 'flex-end',
    },
    options: {
        height: 50,
        width: 50,

        alignItems:'center'

    }
})
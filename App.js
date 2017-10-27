import React from 'react';
import {AppRegistry,StyleSheet, View} from 'react-native';
global.hostAddress = 'http://10.0.3.2:9000';
const Register = require('./src/components/RegisterView');
export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Register/>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 30,
    }
});

AppRegistry.registerComponent('Memegenerator', () => App);
import React, {Component} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity , TextInput, Keyboard, ScrollView, SafeAreaView} from 'react-native';
import { Button, Header } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';


export default class Logo extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      logoLoaded: false,
    };
  }
  async componentDidMount (){
    await Font.loadAsync({
      'apercu-bold': require('../../assets/fonts/apercu_bold.ttf'),
    });

    this.setState({ logoLoaded: true });
  }

  render() {
    if (this.state.logoLoaded){
      return (
         <View style = {styles.logocontainer}>
            <Image 
              style = {{width: 73, height: 47}}
              source = {require('../../assets/yellow-logo.png')}
            />
          </View>
      );
    }
    else{
      return(
        <Text> 
          off 
        </Text>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },



  logo:{
    alignSelf: 'center',
    color: 'white',
    fontSize: 40,
    fontWeight: '900',
    fontFamily: 'apercu-bold'
  },

  logocontainer:{
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: 73,
    height: 47,
    justifyContent: 'center',
  },

});
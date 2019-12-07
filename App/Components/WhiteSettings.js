import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity , TextInput, Keyboard, ScrollView, SafeAreaView} from 'react-native';
import { Button, Header } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import RBSheet from "react-native-raw-bottom-sheet";
import {NotifyFriendSettings} from '../Components';
import { withNavigation } from 'react-navigation';

export default class WhiteSettings extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      logoLoaded: false,
      color: 'white',
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
        <View styles = {styles.header}>
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={350}
            duration={250}
      closeOnDragDown={true}
            customStyles={{
              container: {
          justifyContent: 'flex-start',
          alignItems: 'stretch',
              }
            }}
          >
            <NotifyFriendSettings />
          </RBSheet>

          <TouchableOpacity  onPress={() => {this.RBSheet.open();}}>
            <View style = {styles.settingsbutton}>
              <Icon name="edit" color="white" size = {35}  ></Icon>
      </View> 
          </TouchableOpacity>
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

  header:{
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',

  },


  settingsbutton:{
    height: 47,
    alignItems: 'flex-start',
    justifyContent: 'center' ,
    marginRight: 10,

  }
});
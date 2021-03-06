import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity , TextInput, Keyboard, ScrollView, SafeAreaView} from 'react-native';
import { Button, Header } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import RBSheet from "react-native-raw-bottom-sheet";
import {NotifyFriendSettings} from '../Components';

export default class CustomHeader extends React.Component {
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
          <Header 
            centerComponent = {<Logo/>}
            rightComponent = {<SettingsButton/>}
            containerStyle={{
              alignItems: 'center',
              backgroundColor: 'red',
              width: '90%',

            }}
          />
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
const Logo = () => 
         <View style = {styles.logocontainer}>
            <Text style= {styles.logo}> 
              off 
            </Text>
          </View>
;

const SettingsButton = () => 
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
				<Icon name="bars" iconStyle= "light" color="black" size = {40}  ></Icon>
			</View> 
          </TouchableOpacity>
    </View>
;

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },

  header:{
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '15%',
  },

  logo:{
    alignSelf: 'center',
    color: 'white',
    fontSize: 40,
    fontWeight: '900',
    fontFamily: 'apercu-bold'
  },

  logocontainer:{
    backgroundColor: '#FFD826',
    borderRadius: 25,
    width: 73,
    height: 47,
    justifyContent: 'center',
  },

  settingsbutton:{
  	height: 47,
  }
});
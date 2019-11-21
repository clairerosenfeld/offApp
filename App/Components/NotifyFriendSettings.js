import React, {Component} from 'react';
import * as Font from 'expo-font';

import { Switch, StyleSheet, Text, View, TouchableOpacity , TextInput, Keyboard, ScrollView, SafeAreaView} from 'react-native';


export default class NotifyFriendSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      text: false,
      email: false,
      call: false,
      textMessage: "sry. can't respond rn. on a disconnect.",
      emailMessage: "I'm on a disconnect. I can't respond right now. Best, Jacob. ",
      callMessage: "Call me back in an hour. I'm on a disconnect."
    };
  }

  toggleText = (value) =>{
    this.setState({text: value})
  }

  toggleEmail = (value) =>{
    this.setState({email: value})
  }

  toggleCall = (value) =>{
    this.setState({call: value})
  }

  updateText = (text) =>{
    this.setState({textMessage:text})
  }

  updateEmail = (text) =>{
    this.setState({emailMessage:text})
  }

  updateCall = (text) =>{
    this.setState({callMessage:text})
  }
  async componentDidMount (){
    await Font.loadAsync({
      'apercu-med': require('../../assets/fonts/apercu_medium.ttf'),
      'apercu-reg': require('../../assets/fonts/apercu_regular.ttf'),
      'apercu-mono': require('../../assets/fonts/apercu_mono.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {

    if (this.state.fontLoaded){
      return(
        <SafeAreaView style = {styles.container}>
          <ScrollView>
            <View style = {styles.row}>
              <Text style = {styles.titlefont}> Auto Text</Text>
              <Switch
                trackColor = {{true: '#FFD826'}}
                onValueChange = {this.toggleText}
                value = {this.state.text}
              />
            </View>

            {this.state.text ? ( 
              <TextInput
                style = {styles.detailfont}
                value = {this.state.textMessage}
                onChangeText={text => this.updateText(text)}
                multiline = {true}
              />
              ):( null)}
   
            <View style = {styles.row}>
              <Text style = {styles.titlefont}> Auto Email</Text>
             <Switch
                trackColor = {{true: '#FFD826'}}
                onValueChange = {this.toggleEmail}
                value = {this.state.email}
              />
            </View>
            
            {this.state.email ? ( 
              <TextInput
                style = {styles.detailfont}
                value = {this.state.emailMessage}
                onChangeText={text => this.updateEmail(text)}
                multiline = {true}
              />            
              ):( null
              )}


            <View style = {styles.row}>
              <Text style = {styles.titlefont}> Auto Call-Reply</Text>
             <Switch
                trackColor = {{true: '#FFD826'}}
                onValueChange = {this.toggleCall}
                value = {this.state.call}
              />
            </View>

            {this.state.call ? ( 
              <TextInput
                style = {styles.detailfont}
                value = {this.state.callMessage}
                onChangeText={text => this.updateCall(text)}
                multiline = {true}
              />            ):( null
              )}

          </ScrollView>
        </SafeAreaView>
       )
    }
    else{
      return(
        <Text> loading</Text>
        )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  titlefont:{
    fontSize: 18,
    fontFamily: 'apercu-reg',
    color: 'black',
  },

  detailfont:{
    flexDirection: 'row',
    fontSize: 14,
    fontFamily: 'apercu-mono',
    color: 'grey',
    backgroundColor: '#F8F8F8',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    textAlignVertical: 'center',

  },

  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
    height: 50,
  },



});
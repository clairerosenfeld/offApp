import React, {Component} from 'react';
import * as Font from 'expo-font';

import { Switch, StyleSheet, Text, View, TouchableOpacity , TextInput, Keyboard, ScrollView, SafeAreaView} from 'react-native';
import { withNavigation ,NavigationEvents} from 'react-navigation';


class NotifyFriendSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      text: props.navigation.getParam('tb', false),
      email: props.navigation.getParam('eb', false),
      call: props.navigation.getParam('cb', false),
      textMessage: props.navigation.getParam('text-response', "Hey! On a disconnect rn. Will get back to you ASAP:)"),
      emailMessage: props.navigation.getParam('email-response', "Hello--\nI'm on a disconnect at the moment, so I can't respond to your email right now. I'll get back to your as soon as I can.\nBest, Claire. "),
      callMessage: props.navigation.getParam('call-response', "Call me back in an hour. I'm on a disconnect.")
    };
  }

  toggleText = (value) =>{
    this.setState({text: value})  ;
    this.props.navigation.setParams({tb: value });
   
  //  this.setState({textMessage: this.props.navigation.getParam('textr', 'deafult')})

  };
  toggleEmail = (value) =>{
    this.setState({email: value});
    this.props.navigation.setParams({eb: value });
      }

  toggleCall = (value) =>{
    this.setState({call: value});
    this.props.navigation.setParams({cb: value });  }

  updateText = (text) =>{
    this.setState({textMessage:text})
    this.props.navigation.setParams({'text-response': text });
  }

  updateEmail = (text) =>{
    this.setState({emailMessage:text})
    this.props.navigation.setParams({'email-response': text });

  }

  updateCall = (text) =>{
    this.setState({callMessage:text})
    this.props.navigation.setParams({'call-response': text });
  }
  async componentDidMount (){
    await Font.loadAsync({
      'apercu-med': require('../../assets/fonts/apercu_medium.ttf'),
      'apercu-reg': require('../../assets/fonts/apercu_regular.ttf'),
      'apercu-mono': require('../../assets/fonts/apercu_mono.ttf'),
    });

    this.setState({ fontLoaded: true });
    this.props.navigation.setParams({'email-response': this.state.emailMessage });
    this.props.navigation.setParams({'text-response': this.state.textMessage });
    this.props.navigation.setParams({'call-response': this.state.callMessage });

  }


  render() {

    if (this.state.fontLoaded){
      return(
        <SafeAreaView style = {styles.container}>
          <ScrollView>
            <View style = {styles.row}>
              <Text style = {styles.titlefont}>Auto Text</Text>
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
                returnKeyType='done'
                onSubmitEditing={Keyboard.dismiss}


              />
              ):( null)}
   
            <View style = {styles.row}>
              <Text style = {styles.titlefont}>Auto Email</Text>
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
                returnKeyType='done'
                onSubmitEditing={Keyboard.dismiss}

              />            
              ):( null
              )}


            <View style = {styles.row}>
              <Text style = {styles.titlefont}>Auto Call-Reply</Text>
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
                returnKeyType='done'
                onSubmitEditing={Keyboard.dismiss}

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

export default withNavigation(NotifyFriendSettings);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
    paddingTop: 5,
    paddingBottom: 7,
    paddingHorizontal: '10%',
    textAlignVertical: 'center',
    alignItems: 'center',

  },

  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
    height: 50,
  },



});
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity , TextInput, Keyboard, ScrollView, SafeAreaView, Alert} from 'react-native';
import * as Font from 'expo-font';
import { withNavigation } from 'react-navigation';


class QuitFromDD extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }
  async componentDidMount (){
    await Font.loadAsync({
      'apercu-med': require('../../assets/fonts/apercu_medium.ttf'),
    });

    this.setState({ fontsLoaded: true });
  }
  
  showAlert(){
     this.props.navigation.setParams({hour: 0, min: 0});
      var textmess= "Hey! On a disconnect rn. Will get back to you ASAP:)";
      var emailmess ="Hello--\nI'm on a disconnect at the moment, so I can't respond to your email right now. I'll get back to your as soon as I can.\nBest, Claire. ";
      var callmess = "Call me back in an hour. I'm on a disconnect."
	Alert.alert(
	  'Are you sure you want to quit your disconnect?',
	  null,
	  [
	    {text: 'Yes, take me to my digest', onPress: () => this.props.navigation.navigate("WelcomeBackScreen")},
	    {
	      text: 'No, stay disconnected',
	      onPress: () => console.log('Cancel Pressed'),
	      style: 'cancel',
	    },
	    {text: 'Yes, take me back home', onPress: () => this.props.navigation.navigate("PreDisconnectScreen", {hour: 0, min: 0, tb: false, cb: false, eb: false, 'text-response': textmess, 'email-response': emailmess,'call-response': callmess,  })},
	  ],

	  {cancelable: false},
	);

   }

  render() {
  	if (this.state.fontsLoaded){
	  	return(
		    <TouchableOpacity onPress={()=> {this.showAlert()}}>
			    <View style = {styles.quitbutton}>
			      <Text style = {styles.quitfont}>Quit</Text>
			    </View>
		  	</TouchableOpacity>
		)
	  }
	  else{
	  	return(
	  		<Text>loading</Text>
	  		)
	  }
  }
}

export default withNavigation(QuitFromDD);

const styles = StyleSheet.create({
  quitbutton:{
    backgroundColor: '#007AFF',
    borderRadius: 25,
    height: 35,
    width: 74,
    marginLeft: 30,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',

  },

  quitfont:{
    fontFamily: 'apercu-med',
    fontSize: 15,
    color: 'white',
  }, 
});
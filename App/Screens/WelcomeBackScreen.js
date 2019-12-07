import React, {Component} from 'react';
import { ScrollView, SafeAreaView, Header, StyleSheet, Text, View, TouchableOpacity , Button, TextInput, Keyboard, Switch} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {QuitFromDigest} from '../Components';


export default class WelcomeBackScreen extends React.Component{

  
  static navigationOptions = {
      headerLeft: () => <QuitFromDigest/>,
      headerRight: null

  };

	constructor(props) {
		super(props);
		this.state = {
		  texts:true,
		  emails: true,
		  calls: true,
		  favorites:false,
		};
	}

	toggleTexts = () => {
		if (this.state.texts){
			this.setState({texts:false});
		}
		else{
			this.setState({texts:true});
		}
	}

	toggleEmails = () => {
		if (this.state.emails){
			this.setState({emails:false});
		}
		else{
			this.setState({emails:true});
		}
	}

	toggleCalls = () => {
		if (this.state.calls){
			this.setState({calls:false});
		}
		else{
			this.setState({calls:true});
		}
	}

	toggleAll = () => {
		this.setState({favorites:false});
	}

	toggleFavorites = () => {
		this.setState({favorites:true});
	}


	render(){
		return(
           <ScrollView style = {{backgroundColor: '#FCFBF7'}}>
         	<SafeAreaView style={styles.container}>
            	<View style = {{height: 70}}/>
				<Text style = {styles.welcomefont}>Welcome Back, Claire!</Text>
            	<View style = {{height: 130}}/>

				<View style = {styles.question}>
					<Text style = {styles.optionsfont}>What do you want to{"\n"}catch up on?</Text>
             	
					<View style = {styles.buttonrow}>
						<TouchableOpacity onPress={this.toggleTexts}>
							<View style={[(this.state.texts) ? styles.buttonon : styles.buttonoff]}>
								<Text style={[(this.state.texts) ? styles.buttonfonton : styles.buttonfontoff]}>texts</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.toggleEmails}>
							<View style={[(this.state.emails) ? styles.buttonon : styles.buttonoff]}>
								<Text style={[(this.state.emails) ? styles.buttonfonton : styles.buttonfontoff]}>emails</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.toggleCalls}>
							<View style={[(this.state.calls) ? styles.buttonon : styles.buttonoff]}>
								<Text style={[(this.state.calls) ? styles.buttonfonton : styles.buttonfontoff]}>calls</Text>
							</View>
						</TouchableOpacity>					
					</View>
				</View>
            	
            	<View style = {{height: 40}}/>

				<View style = {styles.question}>

					<Text style = {styles.optionsfont}>and from who?</Text>

					<View style = {styles.buttonrow}>
						<TouchableOpacity onPress={this.toggleAll}>
							<View style={[(this.state.favorites) ? styles.buttonoff2 : styles.buttonon2]}>
								<Text style={[(this.state.favorites) ? styles.buttonfontoff2 : styles.buttonfonton2]}>all</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.toggleFavorites}>
							<View style={[(this.state.favorites) ? styles.buttonon2 : styles.buttonoff2]}>
								<Text style={[(this.state.favorites) ? styles.buttonfonton2 : styles.buttonfontoff2]}>favorites</Text>
							</View>
						</TouchableOpacity>


					</View>
				</View>

            	<View style = {{height: 60}}/>

				<View style = {styles.viewdigest}>

					<TouchableOpacity onPress={()=> {this.props.navigation.navigate('DigestScreen', {texts: this.state.texts, emails: this.state.emails, calls: this.state.calls, favorites: this.state.favorites })}}>
						<Text style = {styles.digestfont}>View digest</Text>
						<View style = {{ justifyContent: 'center', alignItems: 'center'}}>
		              		<Icon name="ios-arrow-down" color="#6B6A67" size = {40}  ></Icon>
		              	</View>
					</TouchableOpacity>	
				</View>	

         	</SafeAreaView>
        </ScrollView>

		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FCFBF7',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginHorizontal: 40
  },

  buttonrow:{
  	height: 40,
  	flexDirection: 'row',
  	justifyContent: 'flex-start',
  	alignItems: 'center',
  	marginTop: 20,

  },

  buttonon:{
    backgroundColor: '#F3C03E',
    borderRadius: 35,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  buttonoff:{
    backgroundColor: 'transparent',
    borderRadius: 35,
    borderColor: '#F3C03E',
    borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },


  buttonon2:{
 	backgroundColor: '#F3A03E',
 	borderRadius: 35,
    paddingHorizontal: 10,
    paddingVertical: 5,
 	justifyContent: 'center',
 	alignItems: 'center',
    marginHorizontal: 5,
  },

  buttonoff2:{
 	backgroundColor: 'transparent',
 	borderRadius: 35,
 	borderColor: '#F3A03E',
 	borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
 	justifyContent: 'center',
 	alignItems: 'center',
    marginHorizontal: 5,
  },


  hiddenbutton:{
 	backgroundColor: 'transparent',
 	borderRadius: 30,
 	borderColor: 'transparent',
 	borderWidth: 2,
 	width: 90,
 	height: 50,
 	justifyContent: 'center',
 	alignItems: 'center',
 	marginVertical: 20,
  },

   welcomefont:{
    fontSize: 45,
    fontFamily: 'apercu-reg',
    color: 'black',
  },

   optionsfont:{
    fontSize: 24,
    fontFamily: 'apercu-reg',
    color: '#6B6A67',
  },

  buttonfonton:{
    fontSize: 18,
    fontFamily: 'apercu-med',
    color: 'white',
  },

  buttonfontoff:{
    fontSize: 18,
    fontFamily: 'apercu-med',
    color: '#F3C03E',
  },

  buttonfonton2:{
    fontSize: 20,
    fontFamily: 'apercu-med',
    color: 'white',
  },

  buttonfontoff2:{
    fontSize: 18,
    fontFamily: 'apercu-med',
    color: '#F3A03E',
  },

  hiddenbuttonfont:{
    fontSize: 18,
    fontFamily: 'apercu-med',
    color: 'transparent',
  },

  question:{
  	flexDirection:'column',
  	justifyContent: 'flex-start',
  	alignItems: 'stretch',
  },

  digestfont:{
	fontSize: 15,
	fontFamily: 'apercu-reg',
	color: '#6B6A67', 	
	alignContent: 'center',
	alignSelf: 'center',
  },

  viewdigest:{
  	justifyContent: 'center',
  	alignItems: 'center',
  	flexDirection: 'column'
  },

 });
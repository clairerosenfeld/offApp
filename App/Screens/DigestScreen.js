import React, {Component} from 'react';
import {Image, FlatList, ScrollView,  Header, StyleSheet, Text, View, TouchableOpacity , Button, TextInput, Keyboard, Switch, SafeAreaView} from 'react-native';
import {QuitFromDigest} from '../Components';
import Communications from 'react-native-communications';

const DATA = [
	{
		id: 1,
		time: '9:41am',
		title: 'You disconnected!',
		image: null,
		favorite: 'yes',
		action: null,
		text: 'no',
		email: 'no',
		call: 'no',
		givenh: 60,
	},

	{
		id: 3,
		time: '10:02am',
		title: 'Nate reached out to you',
		image: require('../../assets/text-philz.png'),
		action: () => Communications.text('1234567890', ''),
		favorite: 'no',
		text: 'yes',
		email: 'no',
		call: 'no',
		givenh: 60,

	},	

	{
		id: 2,
		time: '10:19am',
		title: 'Hugo reached out to you',
		image: require('../../assets/text-nice.png'),
		action: () => Communications.text('2234567890', ''),
		favorite: 'no',
		text: 'yes',
		email: 'no',
		call: 'no',
		givenh: 120,
	},

	{
		id: 9,
		time: '10:30am',
		title: 'Julea sent your CS 147 team an email',
		image: require('../../assets/email-grades.png'),
		action: () => Communications.email(['julea@stanford.edu'], null, null, 'Re: CS 147 Midterm Grades', null),
		favorite: 'no',
		text: 'no',
		email: 'yes',
		call: 'no',
		givenh: 60,

	},

	{
		id: 4,
		time: '10:43am',
		title: 'Dylan reached out to you',
		image: require('../../assets/text-see.png'),
		action: () => Communications.text('9703768030', null),
		favorite: 'yes',
		text: 'yes',
		email: 'no ',
		call: 'no',
		givenh: 60,
	},

	{
		id: 5,
		time: '10:33am',
		title: 'Jacob called you twice',
		image: require('../../assets/call-twice.png'),
		action: () => Communications.phonecall('3108724153', true),
		favorite: 'yes',
		text: 'no',
		email: 'no ',
		call: 'yes',
		givenh: 120,
	},

	{
		id: 8,
		time: '10:35am',
		title: 'Shreya left you a voicemail',
		image: require('../../assets/call-voicemail.png'),
		action: () => Communications.phonecall('9087234372', true),
		favorite: 'yes',
		text: 'no',
		email: 'no ',
		call: 'yes',
		givenh: 60,
	},
	{
		id: 6,
		time: '10:41am',
		title: 'You received an important email',
		image: require('../../assets/email-internship.png'),
		action: () => Communications.email(['summer@intern.ship'], null, null, 'Re: Re: Summer Internship?', null),
		favorite: 'no',
		text: 'no',
		email: 'yes ',
		call: 'no',
		givenh: 60,
	},

	{
		id: 10,
		time: '10:43am',
		title: 'Drake reached out to you',
		image: require('../../assets/text-dinner.png'),
		action: () => Communications.text('3334567890', null),
		favorite: 'no',
		text: 'yes',
		email: 'no ',
		call: 'no',
		givenh: 180,
	},



	{
		id: 7,
		time: 'now',
		title: 'You\'re all caught up!',
		image: null,
		favorite: 'yes',
		action: null,
		text: 'no',
		email: 'no',
		call: 'no',
		givenh: 60,
	},
];

function Item({time, title, image, action, id, givenh}){

	return(
		<View style = {{flexDirection:'column'}}>
			<View  style = {styles.notcontainer}>
				<View  style = {styles.verticalcontainer}>
					<Text style = {styles.timefont}>{time}</Text>					
				</View>
				<View  style = {styles.verticalcontainer}>
					<Text style = {styles.summaryfont}>{title}</Text>


	          	{image!=null &&
					<TouchableOpacity onPress={action}>
							<Image style = {{width: 180, height: givenh, resizeMode: 'contain'}} source={image} />
					</TouchableOpacity>
				}

				</View>
			</View>

			{ id==7 &&
			<View style = {{height: 60, backgroundColor: '#FCFBF7', flex: 1}} />
			}
		</View>
		)
}


export default class DigestScreen extends React.Component{
  
  static navigationOptions = {
      headerLeft: () => <QuitFromDigest/>,
      headerRight: null,
      headerTitle: null,
	}

	constructor(props) {
		super(props);
		this.state = {
			texts: props.navigation.getParam('texts', true),
			emails: props.navigation.getParam('emails', true),
			calls: props.navigation.getParam('calls', true),
			favorites:props.navigation.getParam('favorites', true),
			data: DATA,
			filteredData: DATA,

		};
	}
  	componentDidMount (){
		this.filterNotifications(this.state.texts, this.state.emails,  this.state.calls, this.state.favorites);

  	}
	toggleTexts = () => {
		if (this.state.texts){
			this.setState({texts:false});
			this.filterNotifications(false, this.state.emails,  this.state.calls, this.state.favorites);
	}
		else{
			this.setState({texts:true});
			this.filterNotifications(true, this.state.emails,  this.state.calls, this.state.favorites);

		}
	}

	toggleEmails = () => {
		if (this.state.emails){
			this.setState({emails:false});
			this.filterNotifications(this.state.texts,  false, this.state.calls, this.state.favorites);

		}
		else{
			this.setState({emails:true});
			this.filterNotifications(this.state.texts,  true, this.state.calls, this.state.favorites);

		}
	}

	toggleCalls = () => {
		if (this.state.calls){
			this.setState({calls:false});
			this.filterNotifications(this.state.texts, this.state.emails, false, this.state.favorites);

		}
		else{
			this.setState({calls:true});
			this.filterNotifications(this.state.texts, this.state.emails, true, this.state.favorites);
		}
	}

	toggleAll = () => {
		this.setState({favorites:false});
		this.filterNotifications(this.state.texts, this.state.emails, this.state.calls, false);
	}

	toggleFavorites = () => {
		this.setState({favorites:true});
		this.filterNotifications(this.state.texts, this.state.emails, this.state.calls, true);
/*		let filteredData = DATA.filter(function (item) {
		    return item.favorite.includes('yes');
		  });
		this.setState({filteredData: filteredData});*/
	}

	filterNotifications = (t, e, c, f) => {
		var filteredData = DATA;
		if (f==true){
			filteredData = filteredData.filter(function (item) {
			    return item.favorite.includes('yes');
			  });			
		}
		if (!t){
			filteredData = filteredData.filter(function (item) {
			    return item.text.includes('no');
			 });				
		}
		if (!e){
			filteredData = filteredData.filter(function (item) {
			    return item.email.includes('no');
			 });				
		}

		if (!c){
			filteredData = filteredData.filter(function (item) {
			    return item.call.includes('no');
			 });				
		}

		this.setState({filteredData: filteredData});

	}
  
	render(){
		return(
			<View style = {{backgroundColor: '#FCFBF7', flex: 1}}>
				<View style = {styles.optionrow}>
					<ScrollView horizontal ={true} showsHorizontalScrollIndicator= {false} style = {{marginVertical: 10}}>

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
					</ScrollView>

				</View>

				<SafeAreaView style = {{backgroundColor: '#FCFBF7'}}>
						<FlatList
					        data={this.state.filteredData}
					        renderItem={({ item }) => (
					          <Item
					            id={item.id}
					            title={item.title}
					            image={item.image}
					            time={item.time}
					            action = {item.action}
					            givenh = {item.givenh}

					          />
					        )}
			        		keyExtractor={item => item.id}
			     		 />

				</SafeAreaView>

			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFBF7',
    flexDirection: 'column',
    padding: '10%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'center',

  },

  notcontainer:{
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	alignItems: 'flex-start',
  	borderLeftColor: 'orange',
  	borderLeftWidth: 1,
  	width: '80%',
  	marginBottom: 60,
  	marginLeft: '10%', 
  	marginRight: '10%', 

  },

  verticalcontainer:{
  	flexDirection: 'column',
  	justifyContent: 'space-around',
  	alignItems: 'stretch',
  	borderLeftColor: 'orange',
  	marginLeft: 20,
  },

  notimage:{
  	backgroundColor: '#F8F6F1',
  	height: 60,
  	width: 180,
  	borderRadius: 20,
  	shadowColor: '#979797',
  	shadowRadius: .5,
  	shadowOpacity: 1,
  	shadowOffset: {
  		width: 1,
  		height: 1
  	},
  	marginVertical: 5
  },

  button:{
 	backgroundColor: 'orange',
 	borderRadius: 20,
 	width: 75,
 	height: 30,
 	justifyContent: 'center',
 	alignItems: 'center',
  },

   timefont:{
    fontSize: 20,
    fontFamily: 'apercu-med',
    color: 'orange',
  },

  summaryfont:{
    fontSize: 20,
    fontFamily: 'apercu-reg',
    color: 'black',
  	width: 180,
  },

  optionrow:{
  	flexDirection: 'row',
  	justifyContent: 'space-between',
    backgroundColor: '#FCFBF7',
    margin: 30,
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
    paddingVertical: 4,
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





 });
import React, {Component} from 'react';
import { Alert, StyleSheet, Dimensions, Text, View, TouchableOpacity , TouchableWithoutFeedback, TextInput, Keyboard, ScrollView, SafeAreaView} from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SwipeCards, CustomHeader} from '../Components';
import * as Font from 'expo-font';
import {createAppContainer, NavigationEvents, withNavigation} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import { connect } from 'react-redux';
import store from '../store/index.js'

class PreDisconnectScreen extends React.Component{

  static navigationOptions = {
    headerBackTitle: 'Quit',  
    shadowColor: 'transparent',  
    headerLeft: () => null,

  };
  constructor(props) {
    super(props);
    this.state = {
      hourVal:props.navigation.getParam('hour', 0),
      minVal: props.navigation.getParam('min', 0),
      endTime: moment(new Date()).format("h:mm a"),
      assetsLoaded: false,
      emojis: [],
      descriptions: [],
      startTime: new moment(),
      textresponse: '',
   

    };
  }

  async componentDidMount (){
    await Font.loadAsync({
      'apercu-mono': require('../../assets/fonts/apercu_mono.ttf'),
      'apercu-bold': require('../../assets/fonts/apercu_bold.ttf'),
      'apercu-reg': require('../../assets/fonts/apercu_regular.ttf'),
      'apercu-med': require('../../assets/fonts/apercu_medium.ttf'),

    });

    this.setState({ assetsLoaded: true });
    this.setState({ hourVal: 0});
    this.setState({ minVal: 0});
    this.setState({ emojis: []});
    this.setState({ descriptions: []});

    setInterval( () => {
      this.setState({endTime : moment(new Date()).add(this.state.hourVal, 'hours').add(this.state.minVal, 'minutes').format("h:mm a") })
      this.setState({startTime: new moment()})
    },20);

      var textmess= "Hey! On a disconnect rn. Will get back to you ASAP:)";
      var emailmess ="Hello--\nI'm on a disconnect at the moment, so I can't respond to your email right now. I'll get back to your as soon as I can.\nBest, Claire. ";
      var callmess = "Call me back in an hour. I'm on a disconnect."
      this.props.navigation.setParams({hour: 0, min: 0, tb: false, cb: false, eb: false, 'text-response': textmess, 'email-response': emailmess,'call-response': callmess,  });


  }
  

  IncrementTime = () => {
    var newMins = this.state.minVal+15;
    var newHours = this.state.hourVal;
    if (newMins>=60){
      newHours += parseInt(newMins/60);
      newMins -= 60;
    }
    this.setState({hourVal:newHours})
    this.setState({minVal:newMins})
    var time = {newMins, newHours}
    this.props.updateTime(time)


  }

  DecrementTime = () => {
    var newTime = 60*this.state.hourVal + this.state.minVal-15;
    var newMins = this.state.minVal
    var newHours = this.state.hourVal

    if (newTime<0){
      newMins = 0;
    }
    else if (newTime<60){
      newMins = newTime;
      newHours = 0;
    }
    else{
      newMins = newTime%60;
      if (this.state.minVal<15){      
       newHours -= 1;
      }
    }
    this.setState({hourVal:newHours})
    this.setState({minVal:newMins})

    var time = {newMins, newHours}
    this.props.updateTime(time)
  }

  updateHour(hour){
    var newHours = 0;
    var newMins = this.state.minVal;

    if (hour==''){
      newHours = 0;
    }
    else if (!isNaN(hour)){
      newHours = parseInt(hour);
    }
    this.setState({hourVal: newHours});
    var time = {newMins, newHours}
    this.props.updateTime(time)

  }

  updateMin(min){
    var newMins = 0;
    var newHours = this.state.hourVal;
    if (min==''){
      newMins = 0;
    }
    else if (!isNaN(min)){
      if (parseInt(min)<60){
        newMins = parseInt(min);
      }
      else{
        newMins = parseInt(min)%60;
        newHours += parseInt(min/60);
      }
    }
    this.setState({hourVal: newHours});
    this.setState({minVal: newMins});
    var time = {newMins, newHours}
    this.props.updateTime(time)
  }

  clickDisconnect = ()=> {
    var minutes = this.state.minVal;
    var hours = this.state.hourVal;

    var t = this.props.navigation.getParam('text-response', null);
    var e = this.props.navigation.getParam('email-response', null);
    var c = this.props.navigation.getParam('call-response', null);
    var tb = this.props.navigation.getParam('tb', null);
    var eb = this.props.navigation.getParam('eb', null);
    var cb = this.props.navigation.getParam('cb', null);

    console.log('clickDisconnect', t, e, c)
    console.log('toggles', tb, eb, cb)

    if (hours==0 && minutes< 5){
      Alert.alert('You must disconnect for at least 5 minutes')
    }
    else{

      this.props.navigation.navigate('DuringDisconnectScreen', {hour: this.state.hourVal, min: this.state.minVal, startTime: this.state.startTime, 'text-response': t, 'call-response': c, 'email-response': e, 'tb': tb, 'cb': cb, 'eb': eb })
    }
  }

  reload = (payload) =>{
      this.setState({hourVal: 0});
      this.setState({minVal: 0})

  }

  render(){
    if (this.state.assetsLoaded){
      
      return (
          <ScrollView style = {{backgroundColor: '#FCFBF7'}}>
              <NavigationEvents
                onWillFocus={payload => this.reload(payload)}
              />
            <SafeAreaView style={styles.container}>

            <View style = {{height: 20}}/>
              <View style = {styles.chunk}>
                <View style={styles.leftcontainer}>
                  <Text style = {styles.titlefont}>Duration</Text>   
                  <Text style = {styles.subtitlefont}>How long do you want to disconnect?    </Text>

                </View>


                <View style = {styles.settime}>
                  <TouchableOpacity onPress={this.DecrementTime} >
                    <Icon name="minus" color="#454545" size = {27}  ></Icon>
                  </TouchableOpacity>
                  <View style = {styles.timebox}>       
                    <View style = {styles.timepair}>
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <TextInput
                          keyboardType = 'number-pad'
                          returnKeyType='done'
                          value={this.state.hourVal.toString()}
                          onChangeText={(hourInput) => this.updateHour(hourInput)}
                          style = {styles.timeval}
                          onSubmitEditing={Keyboard.dismiss}
                          onEndEditing={Keyboard.dismiss}
                          returnKeyType='done'

                        />
                      </TouchableWithoutFeedback>

                      <Text style = {styles.timeunit}>  hr </Text> 
                    </View>
                    <View style = {styles.timepair}>
                      <TextInput
                        keyboardType = 'number-pad'
                        returnKeyType='done'
                        value={this.state.minVal.toString()}
                        onChangeText={(minInput) => this.updateMin(minInput)}
                        style = {styles.timeval}
                        maxLength = {2}
                        onSubmitEditing={Keyboard.dismiss}
                      />
                      <Text style = {styles.timeunit}>  min </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={this.IncrementTime} >
                    <Icon name="plus" color="#454545" size = {27}  ></Icon>
                  </TouchableOpacity>
                </View>
                <View style = {styles.centercontainer}>
                  <Text style = {styles.subtitlefont}>
                    Ending at {this.state.endTime}
                  </Text>
                </View>
              </View>

              <View style = {{height: 40}}/>

              <View style = {styles.chunk}>
                <View style={styles.leftcontainer}>
                  <Text style = {styles.titlefont}>Activities</Text>
                  <Text style = {styles.subtitlefont}>
                    Find things to do before you disconnect      
                  </Text> 
                </View>

                <View style={styles.centercontainer}>

                  <SwipeCards />
                </View>
              </View>
              

              <View style={{flex: .2}}/>


              <View style={styles.chunk}>
                <View style={styles.centercontainer}>
                  <GradientButton
                    style={styles.disconnectbutton}
                    text="Disconnect 👋"
                    textStyle={styles.disconnectfont}
                    gradientBegin="#5DACFF"
                    gradientEnd="#007AFF"
                    gradientDirection="diagonal"
                    height={58}
                    width={200}
                    radius={29}
                    impact
                    impactStyle='Light'
                    onPressAction={this.clickDisconnect}
                  />

                </View> 
              </View> 
          </SafeAreaView>
      </ScrollView>
        );
      }

      else{
        return(
          <Text style = {{}}> loading</Text>
        );
      }
  }
}

function mapStateToProps(state){
  let emojis = []
  let descriptions = []
  for (var i = 0; i < state.activities.length; i++){
    emojis[i] = state.activities[i].emoji
    descriptions[i] = state.activities[i].name
  }
  return {
    emojis: emojis,
    descriptions: descriptions,
    minVal: state.time.min,
    hourVal: state.time.hour
  }
}

function mapDispatchToProps(dispatch){
  return({
        updateTime: (time) => {dispatch({type: 'UPDATE_TIME', time})}
  })
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(PreDisconnectScreen))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FCFBF7',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  scrollview:{
    flex: 1,
  },

  header:{
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '15%'
  },

  leftcontainer:{
    alignItems: 'stretch',
    flexDirection: 'column',
    textAlign: 'left',
    width: '100%',
  },

  centercontainer:{
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
   // marginVertical: 10,
  },

  chunk:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    flexDirection: 'column',   
    width: 280,
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

  settime:{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  timebox:{
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',     
    backgroundColor: '#FFD824',
    padding: 30,
    borderRadius: 50,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 210,
    height: 105,

  },

  timeval:{
    color: 'white',
    fontWeight: '900',
    fontSize: 40,
    textAlignVertical: 'bottom', 

  },
  
  timeunit:{
    color: 'white',
    fontWeight: '900',
    fontSize: 20,


  },

  timepair:{
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'center',


  },

  disconnect:{
    flex: .5,
    alignItems: 'center',
    justifyContent:'center',

  },

  disconnectbutton:{
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    shadowOffset: {width: 3,  height: 5},
    shadowColor: 'grey',
    shadowOpacity: 1.0,

  },

  disconnectfont:{
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
    padding:5,
    fontFamily: 'apercu-med',
    alignSelf: 'center',
  },

  activities: {
    flex: 3,
    alignContent: 'space-between',
    paddingTop: '10%',
  },

  titlefont:{
    fontSize: 29,
    fontFamily: 'apercu-med',
    alignSelf: 'flex-start',
    textAlign: 'left',
  },

  subtitlefont:{
    fontSize: 14,
    color: 'grey',
    fontFamily: 'apercu-reg',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },

  swipefont:{
    fontSize: 8,
    color: 'black',
    fontFamily: 'apercu-reg',
    textAlign: 'center'
  },

  swipetextcontainer:{
    width: 40,
    height: 40,
  //  backgroundColor: '#FFF5C7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignContent: 'center',
    marginHorizontal: 10

  },

  bar:{
    flex: .6,
  }
});

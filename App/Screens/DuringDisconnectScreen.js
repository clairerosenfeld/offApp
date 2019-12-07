import React, {Component} from 'react';
import { Image, StatusBar, Alert, Header, StyleSheet, Text, View, TouchableOpacity , Button, TextInput, Keyboard, Switch} from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SwipeCards, BottomPanel, CustomHeader, Logo, WhiteSettings, QuitFromDD} from '../Components';
import * as Font from 'expo-font';
import {createAppContainer, withNavigation} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import RBSheet from "react-native-raw-bottom-sheet";
import { connect } from 'react-redux';
import store from '../store/index.js'

class DuringDisconnectScreen extends React.Component{
  
  static navigationOptions = {
      headerStyle: {
        backgroundColor: '#141414',
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        marginTop: 10,

      },
      headerRight: () => <WhiteSettings/>,
      headerTitle: ()=>
        <View style = {styles.logocontainer}>
          <Image 
              style = {{width: 73, height: 47}}
              source = {require('../../assets/grey-logo.png')}
            />
        </View>,
      headerLeft: () => <QuitFromDD/>,

  };

  constructor(props) {
    super(props);
    this.state = {
      hourVal: props.navigation.getParam('hour', 0),
      minVal: props.navigation.getParam('min', 0),
      endTime: moment(new Date()).add(props.navigation.getParam('hour', 0), 'hours').add(props.navigation.getParam('min', 0), 'minutes').format("h:mm a"),
      startTime: props.navigation.getParam('startTime', new moment()),
      currentTime: moment(new Date()),
      disconnected: true,
      emojis:[],
      descriptions:[],
      interval: 60000,
    };
  }

  async componentDidMount (){
    this.parseEmojis((store.getState().activities));
    this.resetHome();

    await Font.loadAsync({
      'apercu-mono': require('../../assets/fonts/apercu_mono.ttf'),
      'apercu-bold': require('../../assets/fonts/apercu_bold.ttf'),
      'apercu-reg': require('../../assets/fonts/apercu_regular.ttf'),
      'apercu-med': require('../../assets/fonts/apercu_medium.ttf'),

    });
    this.setState({ assetsLoaded: true });

    setInterval( () => {
      this.setState({endTime : moment(new Date()).add(this.state.hourVal, 'hours').add(this.state.minVal, 'minutes').format("h:mm a") })
      this.setState({currentTime: moment(new Date()) })
    },20);

    setInterval( () => {
      this.minusMinute()
    },this.state.interval);

    setInterval( () => {
      this.checkIfTimedOut()
    },100);

  }

  checkIfTimedOut = () => {
    if (this.state.disconnected && this.state.minVal== 0 && this.state.hourVal == 0){

      Alert.alert(
        'Congratulations! Your disconnect is finished.',
        null,
        [
          {text: 'Take me to my digest', onPress: () => this.props.navigation.navigate("WelcomeBackScreen")
          },
          {
            text: 'Extend disconnect',
            onPress: () => this.IncrementTime,
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      this.setState({disconnected: false});
    }

  }

  resetHome = () => {
    var newMins = 0;
    var newHours = 0;

    var time = {newMins, newHours}
    this.props.updateTime(time)


  }

  minusMinute = () =>{
      this.checkIfTimedOut()

      var newTime = 60*this.state.hourVal + this.state.minVal-1;
       
      var newMins = newTime%60;
      var newHours = (newTime - newMins)/60

      if (newMins<0){
        newMins = 0;
      }

      this.setState({hourVal:newHours})
      this.setState({minVal:newMins})

      this.checkIfTimedOut()

  }


  IncrementTime = () => {
    this.setState({disconnected: true});

    var newMins = this.state.minVal+15;
    var newHours = this.state.hourVal;
    if (newMins>=60){
      newHours += parseInt(newMins/60);
      newMins -= 60;
    }
    this.setState({hourVal:newHours})
    this.setState({minVal:newMins})   
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
  }

  updateHour(hour){
    this.setState({disconnected: true});    
    var newHours = 0;
    if (hour==''){
      newHours = 0;
    }
    else if (!isNaN(hour)){
      newHours = parseInt(hour);
    }
    this.setState({hourVal: newHours});
  }

  updateMin(min){
    this.setState({disconnected: true});    
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
  }

  parseEmojis = (givenObjects)=> {
    var emojis = this.state.emojis;
    var descriptions = this.state.descriptions;

    for (var i = 0; i< givenObjects.length; i++){
      var cur = givenObjects[i];
      var name = cur.name;
      var emoji = cur.emoji;
      if (!emojis.includes(emoji)){
        emojis += emoji;
        descriptions+=name;
      }

    }
    this.setState({emojis: emojis})
    this.setState({descriptions: descriptions})

    //return (JSON.stringify(store.getState().activities))
  }
  




  renderTimer = () => (
    <View style={styles.duration}>
      <Text style = {styles.titlefont}>
        We'll see you back in      
      </Text>  
      <View style = {styles.settime}>
        <TouchableOpacity onPress={this.DecrementTime} >
          <Icon name="minus" color="white" size = {30}  ></Icon>
        </TouchableOpacity>
        <View style = {styles.timebox}>       
          <View style = {styles.timepair}>
            <TextInput
              keyboardType = 'number-pad'
              returnKeyType='done'
              value={this.state.hourVal.toString()}
              onChangeText={(hourInput) => this.updateHour(hourInput)}
              style = {styles.timeval}
              onSubmitEditing={Keyboard.dismiss}
            />
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
          <Icon name="plus" color="white" size = {30}  ></Icon>
        </TouchableOpacity>
      </View>

      <View style = {{alignItems:'center'}}>
        <Text style = {styles.subtitlefont}>
          Ending at {this.state.endTime}
        </Text>
      </View>
  </View>
  )




  render(){
      return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content"  />

          {this.renderTimer()}

          {this.state.emojis.length > 0 &&
            <View style = {styles.button}>
              <Text style = {styles.titlefont}>Your activities:</Text>
              <Text style = {styles.emojifont}>{this.state.emojis}</Text>        
            </View>          
          }

      </View>
    );
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
  }

}

const mapDispatchToProps = dispatch =>{
  return({
        updateTime: (time) => {dispatch({type: 'UPDATE_TIME', time})}
  })
}


export default withNavigation(connect( mapStateToProps, mapDispatchToProps)(DuringDisconnectScreen))


const ActivitiesPullUp = () => <Text style = {styles.subtitlefont}>Your Activties, Explore More </Text>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '10%',
    alignItems: 'center',
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

  button: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  quitbutton:{
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 74,
    height: 35,
    justifyContent: 'center',   
    alignItems: 'center'
  },

  seeyoubackat:{
    flex: 1,
    alignContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center', 
  },

  settime:{
    flexDirection: 'row',
    alignItems: 'center',

    //width: '75%'
  },

  hourmin:{
    flexDirection: 'row',
    paddingHorizontal: 10,

  },

  disconnect:{
    flex: 2,
    alignItems: 'center',
    justifyContent:'center',
    
  },

  disconnectbutton:{
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    shadowOffset: {width: 3,  height: 5},
    shadowColor: '#696969',
    shadowOpacity: 1.0,

  },

  disconnectfont:{
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    padding:20,
    fontFamily: 'apercu-med'
  },

  activities: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'black',

  },

  titlefont:{
    fontSize: 18,
    fontFamily: 'apercu-med',
    color: 'white',
    justifyContent: 'center',
  },

  emojifont:{
    fontSize: 40,
    fontFamily: 'apercu-med',
    color: 'white',
    justifyContent: 'center',
    letterSpacing: 10,
    width: '100%',
    textAlign: 'center',
  },

  duration:{
    flex: 1,
    flexDirection:'column',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: '10%',
    paddingHorizontal: '10%',
    justifyContent: 'center',

  },
  timebox:{
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',     
    backgroundColor: '#505050',
    padding: 30,
    borderRadius: 50,
    margin: 20,
    width: 220,

  },
  settime:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitlefont:{
    fontSize: 15,
    color: 'white',
    fontFamily: 'apercu-reg'

  },
timeval:{
    color: 'white',
    fontWeight: '900',
    fontSize: 40,
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
  bar:{
    flexDirection: 'column',
    justifyContent: 'flex-start', 
  },

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

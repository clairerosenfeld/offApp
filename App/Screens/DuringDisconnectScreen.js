import React, {Component} from 'react';
import { Header, StyleSheet, Text, View, TouchableOpacity , Button, TextInput, Keyboard, Switch} from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SwipeCards, BottomPanel, CustomHeader, Logo, WhiteSettings} from '../Components';
import * as Font from 'expo-font';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import RBSheet from "react-native-raw-bottom-sheet";

export default class DuringDisconnectScreen extends React.Component{
  
  static navigationOptions = {
      headerStyle: {
        backgroundColor: '#141414',
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        shadowOpacity: 0,
      },
      headerRight: () => <WhiteSettings/>,

  };


  async componentDidMount (){
    await Font.loadAsync({
      'apercu-mono': require('../../assets/fonts/apercu_mono.ttf'),
      'apercu-bold': require('../../assets/fonts/apercu_bold.ttf'),
      'apercu-reg': require('../../assets/fonts/apercu_regular.ttf'),
      'apercu-med': require('../../assets/fonts/apercu_medium.ttf'),

    });

    this.setState({ assetsLoaded: true });

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
    this.updateEndTime(newMins,newHours)
   
  }

  DecrementTime = () => {
    var newTime = 60*this.state.hourVal + this.state.minVal-15;
    var newMins = this.state.minVals
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
    this.updateEndTime(newMins,newHours)   
  }

  updateHour(hour){
    var newHours = 0;
    if (hour==''){
      newHours = 0;
    }
    else if (!isNaN(hour)){
      newHours = parseInt(hour);
    }
    this.setState({hourVal: newHours});
    this.updateEndTime(this.state.minVal,newHours);
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
    this.updateEndTime(newMins,this.state.hourVal);

  }

  updateEndTime(mins,hours){
    var current = new Date();
    current.setMinutes(current.getMinutes()+mins);
    current.setHours(current.getHours()+hours);
    this.setState({endTime: current.toLocaleTimeString()});
  }

  renderTimer = () => (
    <View style={styles.duration}>
      <Text style = {styles.titlefont}>
        We'll see you back in      
      </Text>  
      <View style = {styles.settime}>
        <TouchableOpacity onPress={this.DecrementTime} >
          <Icon name="minus" color="#313131" size = {30}  ></Icon>
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
          <Icon name="plus" color="#313131" size = {30}  ></Icon>
        </TouchableOpacity>
      </View>

      <View style = {{alignItems:'center'}}>
        <Text style = {styles.subtitlefont}>
          Ending at {this.state.endTime}
        </Text>
      </View>
  </View>
  )

  constructor(props) {
    super(props);
    this.state = {
      hourVal: props.navigation.getParam('hour', 0),
      minVal: props.navigation.getParam('min', 0),
      endTime: new Date().toLocaleTimeString(),
    };
  }


  render(){
      return (
        <View style={styles.container}>

          {this.renderTimer()}

          <TouchableOpacity  onPress={() => {this.RBSheet.open();}}>
            <View style = {styles.button}>
              <Text style = {styles.titlefont}>Your activities </Text>
            </View>
          </TouchableOpacity>

          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={150}
            duration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center"
              }
            }}
          >
            <YourOwnComponent />
          </RBSheet>
      </View>
    );
  }
}

const YourOwnComponent = () => <Text style = {styles.subtitlefont}>Your selected activties:</Text>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '10%',
    alignItems: 'center',
  },

  logocontainer:{
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'center',
  },

  logo:{
    alignSelf: 'center',
    color: 'white',
    fontSize: 100,
    fontWeight: '900',
    fontFamily: 'apercu-bold'
  },

  logooval:{
    backgroundColor: '#FFCA41',
    borderRadius: 100,
    width: 202,
    height: 131,
    justifyContent: 'center',
  },

  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
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
    shadowColor: 'grey',
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
    fontSize: 30,
    fontFamily: 'apercu-med',
    color: 'white',
    justifyContent: 'center',
  },
  duration:{
    flex: 1.5,
    flexDirection:'column',
    alignContent: 'space-around',
    paddingTop: '10%',
    paddingHorizontal: '10%',
    justifyContent: 'center',

  },
  timebox:{
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',     
    backgroundColor: '#313131',
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
    color: 'grey',
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
  }
});

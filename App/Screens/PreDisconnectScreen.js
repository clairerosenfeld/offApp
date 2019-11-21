import React, {Component} from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity , TouchableWithoutFeedback, TextInput, Keyboard, ScrollView, SafeAreaView} from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SwipeCards, CustomHeader} from '../Components';
import * as Font from 'expo-font';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default class PreDisconnectScreen extends React.Component{
  static navigationOptions = {
    headerBackTitle: 'Quit',  
    shadowColor: 'transparent',  
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
  

  constructor(props) {
    super(props);
    this.state = {
      hourVal:0,
      minVal: 0,
      endTime: new Date().toLocaleTimeString(),
      assetsLoaded: false,
    };
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


  render(){
    if (this.state.assetsLoaded){
      
      return (
          <SafeAreaView style={styles.container}>
              <View style={styles.duration}>
                <Text style = {styles.titlefont}>
                  Duration      
                </Text>   
                <Text style = {styles.subtitlefont}>
                  How long do you want to disconnect?      
                </Text>


                <View style = {styles.settime}>
                  <TouchableOpacity onPress={this.DecrementTime} >
                    <Icon name="minus" color="#2D1D05" size = {30}  ></Icon>
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
                    <Icon name="plus" color="#2D1D05" size = {30}  ></Icon>
                  </TouchableOpacity>
                </View>
                <View style = {{alignItems:'center'}}>
                  <Text style = {styles.subtitlefont}>
                    Ending at {this.state.endTime}
                  </Text>
                </View>

              </View>

              <View style = {styles.bar} />

              <View style={styles.activities}>
                <Text style = {styles.titlefont}>
                  Activities      
                </Text>
                <Text style = {styles.subtitlefont}>
                  Find things to do before you disconnect      
                </Text> 
                <SwipeCards />
              </View>


              <View style={styles.disconnect}>
                <GradientButton
                  style={styles.disconnectbutton}
                  text="Disconnect 👋"
                  textStyle={styles.disconnectfont}
                  gradientBegin="#5DACFF"
                  gradientEnd="#007AFF"
                  gradientDirection="diagonal"
                  height={60}
                  width={200}
                  radius={30}
                  impact
                  impactStyle='Light'
                  onPressAction={() => this.props.navigation.navigate('DuringDisconnectScreen', {hour: this.state.hourVal, min: this.state.minVal})}
//pass variables through disconnect screen
                />

              </View> 
              <View style = {styles.bar} />
          </SafeAreaView>
        );
      }

      else{
        return(
          <Text style = {{}}> loading</Text>
        );
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FCFBF7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
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

  duration:{
    flex: 1,
    alignContent: 'space-between',
    paddingTop: '10%',
    paddingHorizontal: '10%',

  },

  settime:{
    flexDirection: 'row',
    alignItems: 'center'
  },

  timebox:{
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',     
    backgroundColor: '#FFD824',
    padding: 30,
    borderRadius: 50,
    margin: 20,
    width: 220,



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
    fontSize: 25,
    fontWeight: '500',
    padding:5,
    fontFamily: 'apercu-med',
    alignSelf: 'center',
  },

  activities: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: '10%',

  },

  titlefont:{
    fontSize: 30,
    fontFamily: 'apercu-med'
  },

  subtitlefont:{
    fontSize: 15,
    color: 'grey',
    fontFamily: 'apercu-reg'

  },

  bar:{
    flex: .2,
    flexDirection: 'column',
    justifyContent: 'flex-start', 
  }
});

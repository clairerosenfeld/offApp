import React, { Component } from 'react';

import { StyleSheet, View, Text, Platform } from 'react-native';
import {createAppContainer, withNavigation} from 'react-navigation';
import * as Font from 'expo-font';
import AppIntroSlider from 'react-native-app-intro-slider';

export default class App extends Component {
  static navigationOptions = {
    header:null,

  };
  constructor(props) {
    super(props);
    this.state = {

      show_App: false,
      assetsLoaded:false

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


  }


  onDone = () => {
      this.props.navigation.navigate('PreDisconnectScreen');

  };

  onSkip = () => {
      this.props.navigation.navigate('PreDisconnectScreen');
  };
  render() {
    if (this.state.assetsLoaded){
      if (this.state.show_App) {
        return (
          <View style={styles.mainapp}>

            <Text style={{ textAlign: 'center', fontSize: 20, color: '#fff' }}>

              This is your main App .

            </Text>

          </View>
        );
      } else {
        return (
          <AppIntroSlider
            slides={slides}
            onDone={this.onDone}
            showSkipButton={true}
            onSkip={this.onSkip}
          />
        );
      }
    }
    else{
      return(
        <Text> </Text>
        )
    }
  }
}
const styles = StyleSheet.create({

  mainapp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'apercu-bold',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginHorizontal: 30,
    textShadowColor: '#B6B6B6',
    textShadowOffset: {width: .5, height: 1},
    textShadowRadius: 3,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'apercu-med',

  },
  image: {
    width: '100%',
    resizeMode: 'contain',

  }
});

const slides = [
  {
    key: 's1',
    title: null,
    text: null,
    image: require('../../assets/walk1.png'),

    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#FFCF45',
  },
  {
    key: 's2',
    title: null,
    text: null,
    image: require('../../assets/walk2.png'),

    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#FEC636',
  },
  {
    key: 's3',
    title: null,
    text: null,
    image: require('../../assets/walk3.png'),

    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#2D2D2D',
  },
  {
    key: 's4',
    title: null,
    text: null,
    image: require('../../assets/walk4.png'),

    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#FEC636',
  }
];
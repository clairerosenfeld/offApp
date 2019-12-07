import { createStackNavigator } from 'react-navigation-stack';
import {CustomHeader,Logo, SettingsButton, WhiteSettings, QuitFromDD} from '../Components';
import React, {Component} from 'react';

import * as screens from '../Screens';

const StackNav = createStackNavigator({
    PreDisconnectScreen: { screen: screens.PreDisconnectScreen },
    DuringDisconnectScreen: {screen: screens.DuringDisconnectScreen},
    WelcomeBackScreen: {screen: screens.WelcomeBackScreen},
    DigestScreen: {screen: screens.DigestScreen},
    IntroSliders: {screen: screens.IntroSliders},


  }, {
  	initialRouteName: 'IntroSliders',
    headerBackTitleVisible: 'false',
    mode: 'modal',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 400
    }}),
  	defaultNavigationOptions:{
      headerStyle: {
        marginTop: 10,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        shadowOpacity: 'transparent',
        backgroundColor: '#FCFBF7',
        elevation:0,
      },
      headerTitle: ()=> <Logo/>,
      headerRight: () => <SettingsButton/>,
      headerRightContainerStyle: {paddingRight: 20},
  	},
	}
);



export default StackNav;




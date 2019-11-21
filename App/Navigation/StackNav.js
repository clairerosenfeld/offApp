import { createStackNavigator } from 'react-navigation-stack';
import {CustomHeader,Logo, SettingsButton, WhiteSettings} from '../Components';
import React, {Component} from 'react';

import * as screens from '../Screens';

const StackNav = createStackNavigator({
    PreDisconnectScreen: { screen: screens.PreDisconnectScreen },
    DuringDisconnectScreen: {screen: screens.DuringDisconnectScreen}
  }, {
  	initialRouteName: 'PreDisconnectScreen',
    headerBackTitleVisible: 'false',
  	defaultNavigationOptions:{
      headerStyle: {
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

/*const MyHeader = (navigation) => {
return {
    header: props => <Header {...props} />,
    headerStyle: { backgroundColor: '#fff' },
    headerTintColor: '#000',
};
}*/

export default StackNav;




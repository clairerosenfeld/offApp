import React from 'react';
import { createAppContainer } from 'react-navigation';
import { StackNav } from './App/Navigation';
import store from './App/store/index.js'
import {Provider} from 'react-redux'

const AppContainer = createAppContainer(StackNav);


export default function App() {
  return (
  	<Provider store = {store}>
	    <AppContainer />
	</Provider>
  );
}

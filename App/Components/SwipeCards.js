'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{this.props.name}</Text>
        <Text style={styles.emoji}>{this.props.emoji}</Text>

      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
          <Text style = {styles.noMoreCardsFont}>Try a different category</Text>
          <Text style = {styles.noMoreCardsFont}>or</Text>
          <Text style = {styles.noMoreCardsFont}>click disconnect!</Text>
      </View>
    )
  }
}

const cards = [
  {name: 'Meditate', emoji: '🧘'},
  {name: 'Relax with a bath', emoji: '🛀'},
  {name: 'Write a letter', emoji: '✉️'},
  {name: 'Take a nature walk', emoji: '🏞️'},
  {name: 'Find 10 different types of animals', emoji: '🐿️'},
  {name: 'Clean the house', emoji: '🧹'},
 
]

/*const cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]*/

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false
    }
  }

  handleYup (card) {
    console.log("yup")
  }

  handleNope (card) {
    console.log("nope")
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

    }

  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={false}
        showNope={false}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor:'#FFD826',
    flexDirection: 'column',
    elevation: 1,
    width: 200,
    height: 120,
  },
  thumbnail: {
    width: 250,
    height: 200,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white',
    fontWeight: '700',
  },
  emoji:{
    fontSize: 60,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noMoreCardsFont:{
    color: '#B6B6B6',
  }

})
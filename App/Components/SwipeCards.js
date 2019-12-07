'use strict';

import React from 'react';
import {ScrollView, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import {connect} from 'react-redux'
import {addActivity} from '../actions/index.js'
import {NavigationEvents} from 'react-navigation';

class Card extends React.Component {

  render() {
    return (
      <View>
        <View style={styles.card}>
          <Text style={styles.text}>{this.props.name}</Text>
          <Text style={styles.emoji}>{this.props.emoji}</Text>
        </View>
      </View>

    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount (){
    
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
          <Text style = {styles.noMoreCardsFont}>Try categories that look interesting to you{"\n"}or{"\n"}click disconnect!</Text>
      </View>
    )
  }
}

const cards = [
  {name: 'Meditate', emoji: '🧘'},
  {name: 'Relax with a bath', emoji: '🛀'},
  {name: 'Write a letter', emoji: '✉️'},
  {name: 'Take a walk', emoji: '🏞️'},
  {name: 'Find 10 animals', emoji: '🐿️'},
  {name: 'Clean the house', emoji: '🧹'},

]


const active = new Set([
  {name: 'Take a walk', emoji: '🏞️'},
  {name: 'Find 10 animals', emoji: '🐿️'},
  {name: 'Go on a bike ride', emoji: '🚴‍'},
  {name: 'Play a board game', emoji: '🎲'},
  {name: 'Play a card game', emoji: '🃏'},
  {name: 'Go on a run', emoji: '🏃‍♀️'},
  {name: 'Dance', emoji: '🕺'},
  {name: 'Do a workout', emoji: '💪'},
  {name: 'Do yoga', emoji: '🤸‍♀️'},

])

const mindful = new Set([
  {name: 'Meditate', emoji: '🧘'},
  {name: 'Relax with a bath', emoji: '🛀'},
  {name: 'Journal', emoji: '📝'},
  {name: 'Draw a picture', emoji: '👩‍🎨'},
  {name: 'Write a poem', emoji: '✍️'},
  {name: 'Stretch', emoji: '🙆‍♀️'},
  {name: 'Knit', emoji: '🧶'},
  {name: 'Do yoga', emoji: '🤸‍♀️'},
  {name: 'Start a puzzle', emoji: '🧩'},


])

const productive = new Set([
  {name: 'Clean the house', emoji: '🧹'},
  {name: 'Write a letter', emoji: '✉️'},
  {name: 'Read a book', emoji: '📖'},
  {name: 'Wash the dishes', emoji: '🧼'},
  {name: 'Take out the trash', emoji: '🗑️'},
  {name: 'Do laundry', emoji: '🧺'},
  {name: 'Clean the bathroom', emoji: '🧽'},
  {name: 'Make your bed', emoji: '🛏️'},
  {name: 'Pick up mail', emoji: '📬'},
  {name: 'Read the newspaper', emoji: '🗞'},

])




class SwipeActivities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false,
      numChosen: 0,
      active: true,
      mindful: true,
      productive: true,

    }
  }

  state = {
    a_emojis: [],
    redux_list: [],
  }

  handleYup (card) {
    if (this.state.numChosen==0){
      var new_emojis = [card.emoji]
    }
    else if (!this.state.a_emojis.includes(card.emoji)){
      var new_emojis = this.state.a_emojis + card.emoji
    }
    else{
      var new_emojis = this.state.a_emojis

    }
    this.setState({a_emojis: new_emojis})
    this.setState({numChosen: this.state.numChosen+1})

    console.log("Swiped right on " + card.name)

    this.props.addActivity(card)

  }

  handleNope (card) {
    console.log("nope")
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
  //    console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

    }

  }


  resetCards = (a, m, p) =>{
    var newDeck = new Array();
    if (a){
      newDeck = newDeck.concat(Array.from(active))
     // this.setState({cards: Array.from(outside)})
    }
    if (m){
      newDeck = newDeck.concat(Array.from(mindful))
     // this.setState({cards: Array.from(inside)})
    }
    if (p){
      newDeck = newDeck.concat(Array.from(productive))
     // this.setState({cards: Array.from(active)})
    }   
    newDeck = this.shuffleAndRemoveDups(newDeck)
    this.setState({cards: newDeck})
  }

  shuffleAndRemoveDups = (array) => {
    var newArray = new Array();
    var names = new Array();
    for (var i = 0; i< array.length; i ++){
      var element  = array[i]
      if (names.includes(element.name) == false){
        newArray.push(element);
        names.push(element.name)
      }
    }
    for(var i = (newArray.length -1); i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = newArray[i]
      newArray[i] = newArray[j]
      newArray[j] = temp
    }
    return newArray;
  }

  toggleActive = () => {
    var bool = true;
    if (this.state.active){
      bool=false;
    }
    this.setState({active:bool});
    this.resetCards(bool, this.state.mindful, this.state.productive);

  }

  toggleMindful = () => {
    var bool = true;
    if (this.state.mindful){
      bool=false;
    }
    this.setState({mindful:bool});
    this.resetCards(this.state.active, bool, this.state.productive);

  }

  toggleProductive = () => {
    var bool = true;
    if (this.state.productive){
      bool=false;
    }
    this.setState({productive:bool});
    this.resetCards(this.state.active, this.state.mindful,bool);

  }

  reload = (payload) =>{
    console.log('reloading swipe cards', payload);
      this.setState({a_emojis: []});
     this.setState({productive:true});
     this.setState({active:true});
     this.setState({mindful:true});
     

  }

  renderCard = (cardData) =>{
    return(
      <Card {...cardData} />
      )
  }


  render() {
    return (
      <View style = {styles.container}>
        <NavigationEvents
                onWillFocus={payload => this.reload(payload)}
              />
        <View style = {styles.optionrow}>
          <TouchableOpacity onPress={this.toggleActive}>
            <View style={[(this.state.active) ? styles.buttonon : styles.buttonoff]}>
              <Text style={[(this.state.active) ? styles.buttonfonton : styles.buttonfontoff]}>active</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleMindful}>
            <View style={[(this.state.mindful) ? styles.buttonon : styles.buttonoff]}>
              <Text style={[(this.state.mindful) ? styles.buttonfonton : styles.buttonfontoff]}>mindful</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleProductive}>
            <View style={[(this.state.productive) ? styles.buttonon : styles.buttonoff]}>
              <Text style={[(this.state.productive) ? styles.buttonfonton : styles.buttonfontoff]}>productive</Text>
            </View>
          </TouchableOpacity> 
        </View>

        <SwipeCards
          cards={this.state.cards}
          loop={true}

       //   renderCard={(cardData) => <Card {...cardData} />}
          renderCard={this.renderCard}
          renderNoMoreCards={() => <NoMoreCards />}
          showYup={false}
          showNope={false}

          handleYup={this.handleYup.bind(this)}
          handleNope={this.handleNope}
          cardRemoved={this.cardRemoved.bind(this)}
        />

        {this.state.a_emojis==null &&
          <Text style = {styles.chosenEmojis}>  </Text>
        }

        {this.state.a_emojis!=null &&
          <View style = {{height: 58, width: 280, alignItems: 'center'}}>
            <ScrollView horizontal ={true} showsHorizontalScrollIndicator= {true} style = {{alignItems: 'center'}}>
              <Text style = {styles.chosenEmojis}>{this.state.a_emojis}</Text>
            </ScrollView>
          </View>
        }

    </View>
    )
  }
}

const mapStatetoProps = state  => {
  return {
    state
  }
};


const mapDispatchToProps = dispatch =>{
  return({
        addActivity: (card) => {dispatch({type: 'ADD_ACTIVITY', card})}
  })
}

export default connect(mapStatetoProps, mapDispatchToProps)(SwipeActivities)

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 282,
  },

  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor:'#FFD826',
    flexDirection: 'column',
    width: 280,
    height: 165,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  thumbnail: {
    width: 250,
    height: 200,
  },
  text: {
    fontSize: 27,
    padding: 10,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '700',
    textShadowColor: '#B6B6B6',
    textShadowOffset: {width: .5, height: 1},
    textShadowRadius: 3,

  },
  emoji:{
    fontSize: 50,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 180,   
  },

  noMoreCardsFont:{
    color: '#B6B6B6',
    textAlign: 'center'
  },

  chosenEmojis:{
    fontSize: 28,
    alignSelf: 'center',
    alignItems: 'flex-start',
    marginVertical: 10,
  },

  optionrow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginTop: 10,

  },

    buttonfonton:{
    fontSize: 17,
    fontFamily: 'apercu-med',
    color: 'white',
  },

  buttonfontoff:{
    fontSize: 17,
    fontFamily: 'apercu-med',
    color: '#F3C03E',
  },


  buttonon:{
    backgroundColor: '#F3C03E',
    borderRadius: 35,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
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
    marginHorizontal: 2,
  },

})
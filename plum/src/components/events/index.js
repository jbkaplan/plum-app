import React, { Component } from 'react';
import { Text, View, StatusBar, StyleSheet, ScrollView, Navigator, TouchableHighlight } from 'react-native';

var Button = require('../common/button');
var EventItem = require('../common/eventItem');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      navigator: this.props.navigator,
      events: [
        {event: 'Roadtrip', group: 'Roomates'}, 
        {event: 'Cubs Game', group: 'Cubs Infield'}, 
        {event: 'Rent Payment', group: 'Roomates'}, 
        {event: 'Rent Payment', group: 'Roomates'}, 
        {event: 'Rent Payment', group: 'Roomates'}, 
        {event: 'Dinners', group: 'Friends'}
      ],
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user groups
  },
  componentDidMount: function(){
  },
  render: function() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
        <View style={[styles.name]}>
          <Text style={styles.welcomeTitle}>Welcome Back, {this.props.userName}!</Text>
          <Text style={styles.title}>Your Events</Text>
        </View>
        <View style={styles.eventList}>
          <ScrollView style={styles.scroller}>
              {this.showEvents()}
          </ScrollView>
        </View>
        <View style={styles.newEventButton}>
          <Button text={'New Event'} onPress={this.handleNewEvent} />  
        </View>
      </View>
    )
  },
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  },
  getEvents: function() {
    // fetch('http://localhost:3000/users/3/groups', {
    //   method: 'GET'
    // })
    // .then((response) => response.json())
    // .then((responseData) => 
    //   console.log(responseData.data[0].relationships)    )
    // .done();
    // CookieManager.get('http://localhost:3000/users/3/groups', (err, res) => {
    //   console.log('Got cookies for url', res);
    //   // Outputs 'user_session=abcdefg; path=/;'
    // });
    // CookieManager.getAll((err, res) => {
    //   console.log('cookies!');
    //   console.log(err);
    //   console.log(res);
    // });
  },
  showEvents: function(){
    var navigator = this.props.navigator
    return this.state.events.map(function(event, index) {
        return (
          <EventItem event={event} navigator={navigator} />
        );
    });
  },
  handleNewEvent: function() {
    // Goto New Group Screen => pass current user variable
   this.props.navigator.push({name: 'newEvent'});
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#6AAAA0',
    borderWidth: 2,
    height: 50,
    width: 50,
    borderRadius: 50,
    borderColor: '#619089',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton:{ 
    fontSize: 24,
    color: 'white'
  },
  title: {
    fontSize: 32,
    fontFamily: 'Avenir-Heavy',
    color: 'white',
    textAlign: 'center',
  },  
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'Avenir-Book',
    color: 'white',
    textAlign: 'center',
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 30
  },
  eventList: {
    flex: 3
  },
  newEventButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 70
  }
});







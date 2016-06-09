'use strict';
import React, { Component } from 'react';
import { Text, View, StatusBar, StyleSheet, ScrollView, Navigator, TouchableHighlight } from 'react-native';

var Button = require('../common/button');
var EventItem = require('../common/eventItem');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: this.props.userId,
      navigator: this.props.navigator,
      events: [],
    };
  },
  componentWillMount: function(){
  },
  componentDidMount: function(){
    this.getEvents()
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
    this.setState({
      events: []
    })
    var id = this.props.userId
    fetch(`http://localhost:3000/users/${id}/events`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseData) => 
      this.setState({
        events: this.state.events.concat(responseData.data),
      }),
    )
    .done();
  },
  showEvents: function(){
    var navigator = this.props.navigator
    var user = this.props.userId
    var userName=this.props.userName
      return this.state.events.map(function(event, index) {
          return (
            <EventItem event={event} user={user} userName={userName} navigator={navigator} />
          );
      });
  },
  handleNewEvent: function() {
    // Goto New Group Screen => pass current user variable
   this.props.navigator.push({
      name: 'newEvent',
      passProps: {
        user: this.props.userId,
        refreshEvents: this.getEvents
      }
    });
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
    marginTop: 44
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







import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, Navigator, StyleSheet, TouchableHighlight } from 'react-native';

var EventItem = require('../common/eventItem');
var Button = require('../common/button');

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
    // Rails API call to get current user
  },
  componentDidMount: function(){
  },
  render: function() {
    return (
      <View style={styles.container}>       
        <View style={[styles.name]}>
          <Text style={styles.title}>{this.props.userName}'s Events</Text>
        </View>
        <View style={styles.eventList}>
          <ScrollView style={styles.scroller}>
              {this.showEvents()}
          </ScrollView>
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
  showEvents: function(){
    var navigator = this.props.navigator
    return this.state.events.map(function(event, index) {
        return (
          <EventItem event={event} navigator={navigator} />
        );
    });
  },
  getEvents: function() {
    // Get invoices from API CALL
  },
  onPressNewButton: function() {
    this.props.navigator.push({name: 'eventShow'});
  },  
});

var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
  },
  name: {    
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  },
  eventList: {
    width: width,
    flex: 7,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'center',
    flexDirection: 'row',
    alignSelf: 'center'
  }
});






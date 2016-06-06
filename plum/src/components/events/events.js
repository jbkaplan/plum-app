import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';

var events = [
  {name: "trip", total: "$500"},
  {name: "trip1", total: "$500"},
  {name: "trip2", total: "$500"},
  {name: "trip3", total: "$500"},
  {name: "trip4", total: "$500"}
]

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },
  componentDidMount: function(){
    // Rails API call to get current user groups
  },
  usersEvents: function(events) {
    return events.map(function(event, i){
      return
    });
  },
  render: function() {

    // if (!this.state.user) {
    //   return <View style={styles.container}>
    //       <Text>Events Page...</Text>
    //     </View>
    // }

    // var username = this.state.user.get('username');

    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Text style={styles.navLinks}>UserName</Text>
          <TouchableHighlight
          underlayColor='#6AAAA0'
          onPress={this.onNewEventPress}>
            <Text style={styles.navLinks}>New Event</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.eventContainer}>
          <View>
            <Text style={styles.eventList}>This will be a list of event components</Text>
          </View>
        </View>
        <View style={styles.bottomNav}>
          <TouchableHighlight
          style={styles.footerButton}
          underlayColor='#6AAAA0'
          onPress={this.onEventsButtonPress}>
            <Text style={styles.bottomNavLinks}>Events</Text>
          </TouchableHighlight>
          <TouchableHighlight
          style={styles.footerButton}
          underlayColor='#6AAAA0'
          onPress={this.onGroupInfoPress}>
            <Text style={styles.bottomNavLinks}>Group Info</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  },
  onEventsButtonPress: function() {
  },
  onGroupInfoPress: function() {
  },
  onNewEventPress: function() {
    this.props.navigator.push({name: 'eventShow'})
  }
});
var width = Dimensions.get('window').width - 80; //full width

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    margin: 20,
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navLinks: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
  },  
  bottomNavLinks: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
  },
  eventContainer: {
    marginTop: 20,
    flex: 18,
  },
  footerButton: {
    marginBottom: 100,
    justifyContent: 'center',
  },
  eventList: {
    fontSize: 16,
    fontFamily: 'AvenirNext-Medium',
    color: 'white',
  },
  bottomNav: {
    backgroundColor: '#6AAAA0',
    width: width + 80,
    paddingTop: 35,
    marginLeft: -20,
    paddingLeft: 35,
    marginRight: -20,
    paddingRight: 35,
    marginBottom: 28,
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})

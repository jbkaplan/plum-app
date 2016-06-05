import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

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
      <View style={[styles.container, this.border('red')]}>

        <View style={[styles.nav, this.border('blue')]}>

          <Text style={styles.navLinks}>UserName</Text>
          <TouchableHighlight
          underlayColor='#6AAAA0'
          onPress={this.onNewEventPress}>
            <Text style={styles.navLinks}>New Event</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.eventContainer, this.border('green')]}>
          <View>
            <Text>This will be a list of event components</Text>
          </View>
        </View>

        <View style={[styles.nav, this.border('blue')]}>
          <TouchableHighlight
          style={styles.footerButton}
          underlayColor='#6AAAA0'
          onPress={this.onEventsButtonPress}>
            <Text style={styles.navLinks}>Events</Text>
          </TouchableHighlight>

          <TouchableHighlight
          style={styles.footerButton}
          underlayColor='#6AAAA0'
          onPress={this.onGroupInfoPress}>
            <Text style={styles.navLinks}>Group Info</Text>
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
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navLinks: {
    fontSize: 24
  },
  eventContainer: {
    flex: 18
  },
  footerButton: {
    justifyContent: 'center'
  }
})

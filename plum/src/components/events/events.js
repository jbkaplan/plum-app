import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';

var NewEvents = [
  {name: "trip", total: "$500"},
  {name: "trip1", total: "$500"},
  {name: "trip2", total: "$500"},
  {name: "trip3", total: "$500"},
  {name: "trip4", total: "$500"}
]

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      events: [
        {name: "trip", groupName: "a"},
        {name: "trip1", groupName: "b"},
        {name: "trip2", groupName: "c"},
        {name: "trip3", groupName: "d"},
        {name: "trip4", groupName: "e"}
      ]
    };
  },
  componentDidMount: function(){
    // Rails API call to get current user groups
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

        <View style={[styles.nav, styles.header, this.border('blue')]}>

          <Text style={styles.navLinks}>UserName</Text>

          <TouchableHighlight
          underlayColor='#6AAAA0'
          onPress={this.onNewEventPress}>
            <Text style={styles.navLinks}>New Event</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.eventContainer, this.border('green')]}>
          <ScrollView>
            {this.usersEvents()}
            </ScrollView>
        </View>

        <View style={[styles.nav, styles.footer, this.border('blue')]}>
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
  },
  onEventItemPress: function() {
    this.props.navigator.push({name: 'eventShow'})
  },
  usersEvents: function() {
    return this.state.events.map(function(event, i){
      return (
        <TouchableHighlight
        key={i}
        style={styles.footerButton}
        underlayColor='#6AAAA0'
        onPress={this.onEventItemPress}>
        <View style={[this.border('blue')]}>
          <View style={styles.tripAttributes}>
            <Text>Event: </Text><Text>{event.name}</Text>
          </View>
          <View style={styles.tripAttributes}>
            <Text>Group: </Text><Text>{event.groupName}</Text>
          </View>
        </View>
        </TouchableHighlight>
      );
    }.bind(this));
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  header: {
    backgroundColor: '#6AAAA0'
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navLinks: {
    width: 176,
    fontSize: 24
  },
  eventContainer: {
    flex: 18
  },
  footer: {
    backgroundColor: '#6AAAA0'
  },
  footerButton: {
    justifyContent: 'center'
  },
  tripAttributes: {
    flexDirection: 'row'
  }
})

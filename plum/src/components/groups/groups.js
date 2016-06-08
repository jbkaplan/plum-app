'use strict';
import React, { Component } from 'react';
import { Text, View, StatusBar, StyleSheet, ScrollView, Navigator, TouchableHighlight } from 'react-native';

var Button = require('../common/button');
var GroupItem = require('../common/groupItem');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: this.props.userId,
      navigator: this.props.navigator,
      groups: []
    };
  },
  componentWillMount: function(){
    this.getGroups();
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
          <Text style={styles.title}>Your Groups</Text>
        </View>
        <View style={styles.groupList}>
          <ScrollView style={styles.scroller}>
            {this.showGroups()}
          </ScrollView>
        </View>
        <View style={styles.newGroupButton}>
          <Button text={'New Group'} onPress={this.handleNewGroup} />
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
  getGroups: function() {
    var id = this.state.user
    fetch(`http://localhost:3000/users/${id}/groups`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseData) =>
      this.setState({
        groups: this.state.groups.concat(responseData.data),
      }),
    )
    .done();
  },
  showGroups: function(){
    var navigator = this.props.navigator
    var user = this.props.userId
    return this.state.groups.map(function(group, index) {
        return (
          <GroupItem group={group} user={user} navigator={navigator} />
        );
    });
  },
  handleNewGroup: function() {
    // Goto New Group Screen => pass current user variable
   this.props.navigator.push({name: 'newGroup'});
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
  groupList: {
    flex: 3
  },
  newGroupButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 70
  }
});

import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user groups
  },
  render: function() {
    // if (!this.state.user) {
    //   return <View style={styles.container}>
    //       <Text>Groups Page...</Text>
    //     </View>
    // }

    // var username = this.state.user.get('username');

    return (
      <View style={styles.container}>
        <View style={[styles.name]}>
          <Text style={styles.title}>Welcome Back, !</Text>
          <Text style={styles.title}>Your Groups</Text>
        </View>
          {/* Insert new groups here*/}
        <View style={[styles.container]}>
          <TouchableHighlight 
            underlayColor='#6AAAA0'
            style={styles.button}
            onPress={this.handleNewGroup}
            >
            <Text style={styles.addButton}>+</Text>
          </TouchableHighlight>
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  }
});







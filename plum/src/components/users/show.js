import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user
  },
  render: function() {    
    return (
      <View style={[styles.container]}>       
        <View style={[styles.name]}>
          <Text style={styles.title}>User's Profile</Text>
        </View>
        <View style={[styles.container]}>
          <Text style={styles.label}>Email:</Text>
        </View>
        <View style={[styles.container]}>
          <Text style={styles.label}>Phone:</Text>
        </View>
        <View style={[styles.container]}>
          <Text style={styles.label}>PayPal Info: $</Text>
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
  onExpensePress: function() {

  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5
  },
  title: {
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'AvenirNext-Medium',
  }
});





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
          <Text style={styles.title}>Expense</Text>
        </View>
        <View style={[styles.container]}>
          <Text>Description:</Text>
        </View>
        <View style={[styles.container]}>
          <Text>Location:</Text>
        </View>
        <View style={[styles.container]}>
          <Text>Photo:</Text>
        </View>
        <View style={[styles.container]}>
          <Text>Amount: $</Text>
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
  expenses: {
    flex: 2
  },
  expenseItemButton: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6AAAA0'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  }
});





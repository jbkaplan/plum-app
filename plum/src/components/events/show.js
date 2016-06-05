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
        <View style={[styles.container]}>
          <Text style={styles.title}>Event Name</Text>
        </View>
        <View style={[styles.expenses]}>
          <Text>Expenses:</Text>
          <View style={[styles.expenseItems]}>
            <TouchableHighlight
              underlayColor='#6AAAA0'
              onPress={this.onExpensePress}
              style={[styles.expenseItemButton]}
              >
              <Text>Item 1</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.expenses]}>
          <Text>Your Expenses:</Text>
          <View style={[styles.expenseItems]}>
            <TouchableHighlight
              underlayColor='#6AAAA0'
              onPress={this.onExpensePress}
              style={[styles.expenseItemButton]}
              >
              <Text>Item 1</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.container]}>
          <Text>Your Balance = $</Text>
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
    fontSize: 24,
  }


});





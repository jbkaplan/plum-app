import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';

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
          <Text style={styles.title}>Event Name</Text>
        </View>
        <View style={[styles.expenses]}>
          <Text style={styles.label}>Expenses:</Text>
          <View style={[styles.expenseItems]}>
            <TouchableHighlight
              underlayColor='#6AAAA0'
              onPress={this.onExpensePress}
              style={[styles.expenseItemButton]}
              >
              <Text style={styles.buttonText}>Item 1</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.expenses]}>
          <Text style={styles.label}>Your Expenses:</Text>
          <View style={[styles.expenseItems]}>
            <TouchableHighlight
              underlayColor='#6AAAA0'
              onPress={this.onExpensePress}
              style={[styles.expenseItemButton]}
              >
              <Text style={styles.buttonText}>Item 1</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.container]}>
          <Text style={styles.label}>Your Balance = $</Text>
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

var width = Dimensions.get('window').width - 40;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
    marginBottom: 8,
  },
  expenses: {
    flex: 2
  },
  expenseItemButton: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6AAAA0'
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
    fontWeight: 'bold',
  },  
  label: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  },
  buttonText: {
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 18,
  }
});





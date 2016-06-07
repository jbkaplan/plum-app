import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ScrollView, Dimensions } from 'react-native';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      navigator: this.props.navigator,
      expenses: [        
        {event: 'Roadtrip', group: 'Roomates'}, 
        {event: 'Cubs Game', group: 'Cubs Infield'}, ]
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user
  },
  render: function() {    
    return (
      <View style={[styles.container]}>       
        <View style={[styles.name]}>
          <Text style={styles.title}>{this.props.event}</Text>
          <Text style={styles.groupTitle}>Group: {this.props.group}</Text>
        </View>
        <View style={[styles.expenses]}>
          <Text style={styles.label}>Expenses:</Text>
          <View style={[styles.expenseItems]}>
            <ScrollView style={styles.scroller}>
              {this.showExpenses()}
            </ScrollView>
          </View>
        </View>
        <View style={[styles.container]}>
          <Text style={styles.label}>Your Tentative Balance = $</Text>
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
  showExpenses: function(){
    var navigator = this.props.navigator
    return this.state.expenses.map(function(expense, index) {
        return (
          <ExpenseItem expense={event} navigator={navigator} />
        );
    });
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
  groupTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontFamily: 'Avenir-Book',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
  }, 
  label: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Avenir-Book',
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
  }
});





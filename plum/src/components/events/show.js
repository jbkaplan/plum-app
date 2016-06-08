import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import NavigationBar from 'react-native-navbar';

var ExpenseItem = require('../common/expenseItem');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      navigator: this.props.navigator,
      expenses: [        
        {description: 'Gas', location: 'Chicago', price: 44}, 
        {description: 'Cubs Game', location: 'Chicago', price: 80},
        {description: 'Dinner', location: 'Des Moines', price: 12},
        {description: 'Hotel', location: 'Omaha', price: 140},
      ]
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user
  },
  render: function() {
    const rightButtonConfig = {
      title: 'Next',
      handler: () => alert('hello!'),
    };
    
    const leftButtonConfig = {
      title: 'Back',
      tintColor: 'rgba(255,255,255,.9)',
      handler: () => this.props.navigator.pop(),
    };

    const titleConfig = {
        title: 'Create Group',
      };      
    return (
      <View style={[styles.container]}> 
        <View style={styles.navContainer}>
          <View style={styles.navBar}>
            <StatusBar
              barStyle="default"
              style="default"
             />
            <NavigationBar
              tintColor='rgba(255,255,255,.1)'
              leftButton={leftButtonConfig} />
          </View>  
        </View>    
        <View style={[styles.name]}>
          <Text style={styles.title}>{this.props.event}</Text>
          <Text style={styles.groupTitle}>Group: {this.props.group}</Text>
        </View>
        <View style={[styles.expenses]}>
          <Text style={styles.expenseLabel}>Expenses:</Text>
          <View style={[styles.expenseItems]}>
            <ScrollView style={styles.scroller}>
              {this.showExpenses()}
            </ScrollView>
          </View>
        </View>
        <View style={[styles.balanceContainer]}>
          <Text style={styles.label}>Your Tentative Balance = ${this.props.balance}</Text>
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
    var event = this.props.event
    return this.state.expenses.map(function(expense, index) {
        return (
          <ExpenseItem expense={expense} event={event} navigator={navigator} />
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
    margin: 20
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
  expenseLabel: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    marginBottom: 30,
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
  },
  navBar: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    margin: -20,
  },
  expenseItems: {
    margin: -20,
  },
  scroller: {
    height: 300,
  },
  balanceContainer: {
    flex: 1,
    marginTop: 200
  }
});





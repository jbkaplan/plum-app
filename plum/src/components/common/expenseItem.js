import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Navigator, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconTwo from 'react-native-vector-icons/EvilIcons';

var ExpenseItem = React.createClass({
  render: function() {
    console.log(this.props.expense);
    return (
        <View style={[styles.eventItem]}>
          <View>

          </View>
          <TouchableHighlight
              underlayColor='rgba(255,255,255,0)'
              style={styles.arrowButton}
              onPress={this.onPress}
              >
            <View style={styles.arrowView}>
              <Icon name="chevron-right" size={40} color="white" />
            </View>
          </TouchableHighlight>
        </View>
    );
  },
  showExpenses: function() {
    return this.props.expenses.map(function(expense, index){
      return (
        <View>
          <Text style={styles.eventName}>{expense[0].description}</Text>
          <Text style={styles.eventGroupName}>{expense[0].location}</Text>
        </View>
      )
    })
  },
  onPress: function(){
    this.props.navigator.push({
      name: 'expenseShow',
      passProps: {
          event: this.props.event,
          group: this.props.group,
          expenseDescription: this.props.expense.description,
          expenseLocation: this.props.expense.location,
          expenseAmount: this.props.expense.price
        }
      })
  }
});

var width = Dimensions.get('window').width; //full width

var styles = StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    marginBottom: 10,
    width: width,
    padding: 15,
    borderLeftColor: '#6AAAA0',
    borderLeftWidth: 5,
    backgroundColor: 'rgba(255,255,255,.1)'
  },
  eventGroupName: {
    fontFamily: 'Avenir-book',
    fontSize: 16,
    color: 'white'
  },
  eventName: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 24,
    color: 'white'
  },
  arrowButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -20,
    top: 4,
    width: 125,
    height: 85,
  },
  buttonText: {
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
  },
  payWithPayPal: {
    position: 'relative',
    top: 7,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    textAlign: 'center',
    fontSize: 18
  },
  invoicePrice: {
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    fontSize: 24,
  },
  arrowView: {
    flexDirection: 'row'
  }
});

module.exports = ExpenseItem;


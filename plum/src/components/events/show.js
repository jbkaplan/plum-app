import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Moment from 'moment';

var ExpenseItem = require('../common/expenseItem');
var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      navigator: this.props.navigator,
      expenses: [],
      event: this.props.event,
      group: this.props.group,
      eventBalance: this.props.eventBalance
    };
  },
  componentDidMount: function(){
    // Rails API call to get current user
    this.getExpenses();
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

    const title = this.props.event

    const titleConfig = {
        title: title,
        tintColor: 'rgba(255,255,255,.9)',
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
              title={titleConfig}
              leftButton={leftButtonConfig} />
          </View>  
        </View>    
        <View style={[styles.name]}>
          <Text style={styles.title}>{this.props.event}</Text>
          <Text style={styles.groupTitle}>Group: {this.props.group}</Text>
          <Text style={styles.dateTitle}>{Moment(this.props.startDate).format('LL')} - {Moment(this.props.endDate).format('LL')}</Text>
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
          <Text style={styles.priceLabel}>Your Tentative Balance = ${this.state.eventBalance}</Text>
        </View>
        <View style={styles.expenseButton}>
          <Button text={'Add Expense'} onPress={this.handleAddExpense} />  
        </View>
      </View>
    )
  },
  getExpenses: function() {
    this.setState({
      expenses: []
    })
    var id = this.props.eventId
    fetch(`http://plumpayments.herokuapp.com/events/${id}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseData) => {    
        this.setState({
          expenses: this.state.expenses.concat(responseData.data.relationships.expenses.data),
        });
        var name = this.props.userName;
        responseData.data.relationships.members.data.map(function(member, index){
          var nameEqualTo = member[2]['full-name'];
          var theBalance = member[3].tentativebalance;
          if (nameEqualTo === name) {
              this.setState({
                eventBalance: theBalance,
              })
            }
        }.bind(this))
      })
    .done();
  },
  showExpenses: function(){
      var navigator = this.props.navigator
      var event = this.props.event
      var group = this.props.group
    return this.state.expenses.map(function(expense, index) {
      return (
        <ExpenseItem expense={expense} group={group} event={event} navigator={navigator} />
      );
    });
  },
  handleAddExpense: function() {
    this.props.navigator.push({
      name: 'newExpense',
      passProps: {
        refreshEvents: this.getExpenses,
        user: this.props.user,
        eventId: this.props.eventId,
        event: this.props.event,
        group: this.props.group,
      }
    });
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
  dateTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontFamily: 'Avenir-Book',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
  }, 
  priceLabel: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Avenir-heavy',
  }, 
  expenseLabel: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    marginBottom: 10,
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5,
    marginTop: 20,
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
    marginLeft: -20,
    marginRight: -20,
    flex: 5,
  },
  balanceContainer: {
    marginTop: 30,
    marginBottom: 10
  },
  expenseButton: {
    marginBottom: 50,
    alignSelf: 'center'
  }
});





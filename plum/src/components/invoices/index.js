import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, Navigator, StyleSheet, TouchableHighlight } from 'react-native';

var invoices = [{event: 'Roadtrip', group: 'Roomates'}, {event: 'Cubs Game', group: 'Cubs Infield'}, {event: 'Rent Payment', group: 'Roomates'}, {event: 'Dinners', group: 'Friends'}]
var InvoiceItem = require('../common/invoiceItem');
var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      navigator: this.props.navigator,
      invoices: [
        // {event: 'Roadtrip', group: 'Roomates', price: 55}, 
        // {event: 'Cubs Game', group: 'Cubs Infield', price: 55}, 
        // {event: 'Rent Payment', group: 'Roomates', price: 55}, 
        // {event: 'Rent Payment', group: 'Roomates', price: 55}, 
        // {event: 'Rent Payment', group: 'Roomates', price: 55}, 
        // {event: 'Dinners', group: 'Friends', price: 55}
      ],
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user
  },
  componentDidMount: function(){
    this.getUserInvoices()
  },
  render: function() {
    return (
      <View style={styles.container}>       
        <View style={[styles.name]}>
          <Text style={styles.title}>{this.props.userName}'s Invoices</Text>
        </View>
        <View style={styles.eventList}>
          <ScrollView style={styles.scroller}>
              {this.showInvoices()}
          </ScrollView>
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
  showInvoices: function(){
    var navigator = this.props.navigator
    return this.state.invoices.map(function(invoice, index) {
        return (
          <InvoiceItem invoice={invoice} navigator={navigator} />
        );
    });
  },
  getUserInvoices: function() {
    // Get invoices from API CALL
    var id = this.props.userId
    fetch(`http://localhost:3000/users/${id}/bills`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseData) => 
      this.setState({
        invoices: this.state.invoices.concat(responseData.data),
      }),
    )
    .done();
  },
  onPressNewButton: function() {
    this.props.navigator.push({name: 'invoiceShow'});
  },  
});

var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy',
  },
  name: {    
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  },
  eventList: {
    width: width,
    flex: 7,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'center',
    flexDirection: 'row',
    alignSelf: 'center'
  }
});






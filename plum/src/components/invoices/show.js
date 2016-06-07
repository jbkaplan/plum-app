import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';

var invoices = [{event: 'Roadtrip', group: 'Roomates'}, {event: 'Cubs Game', group: 'Cubs Infield'}, {event: 'Rent Payment', group: 'Roomates'}, {event: 'Dinners', group: 'Friends'}]
var InvoiceItem = require('../common/invoiceItem');
var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      invoices: [
        {event: 'Roadtrip', group: 'Roomates', price: 55}, 
        {event: 'Cubs Game', group: 'Cubs Infield', price: 55}, 
        {event: 'Rent Payment', group: 'Roomates', price: 55}, 
        {event: 'Rent Payment', group: 'Roomates', price: 55}, 
        {event: 'Rent Payment', group: 'Roomates', price: 55}, 
        {event: 'Dinners', group: 'Friends', price: 55}
      ],
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user
  },
  render: function() {    
    return (
      <View style={styles.container}>       
        <View style={[styles.name]}>
          <Text style={styles.title}>Invoices</Text>
        </View>
        <View style={styles.eventList}>
          <ScrollView style={styles.scroller}>
              {this.showInvoices()}
          </ScrollView>
        </View>
        <View style={styles.empty}>
          <Text></Text>
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
    return this.state.invoices.map(function(invoice, index) {
        return (
          <InvoiceItem invoice={invoice} />
        );
    });
  },
  getInvoices: function() {
    // Get invoices from API CALL
  },
  _onPressButton: function() {
    console.log('pressed')
    
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






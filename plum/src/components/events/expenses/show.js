import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, MapView, TouchableHighlight } from 'react-native';
import NavigationBar from 'react-native-navbar';

var InvoiceItem = require('../../common/invoiceItem');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      pin: {
        latitude: 0,
        longitude: 0
      },
      region: {
        latitude: 0,
        longitude: 0
      },
    };
  },
  componentWillMount: function() { 
      this.getExpenseCoordinates()
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
        <View style={styles.navBar}>
          <StatusBar
            barStyle="default"
            style="default"
           />
          <NavigationBar
            tintColor='rgba(255,255,255,.1)'
            leftButton={leftButtonConfig} />
        </View>     
        <View style={[styles.name]}>
          <Text style={styles.title}>{this.props.event}</Text>
        </View>
        <View style={[styles.expenseContainer]}>
          <Text style={styles.label}>Description: {this.props.expenseDescription}</Text>
        </View>
        <View style={[styles.expenseContainer]}>
          <Text style={styles.label}>Location: {this.props.expenseLocation}</Text>
        <MapView 
          annotations={[this.state.pin]}
          style={styles.map}>
        </MapView>
        </View>
        <View style={[styles.balanceContainer]}>
          <Text style={styles.priceLabel}>Amount: ${this.props.expenseAmount}</Text>
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
  getExpenseCoordinates: function() {
    var rootUrl = 'https://maps.googleapis.com/maps/api/geocode/json?&address='
    var url = `${rootUrl}${this.props.expenseLocation}`    
    return fetch(url)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        return {
          latitude: json.results[0].geometry.location.lat,
          longitude: json.results[0].geometry.location.lng
        } 
      })
      .then((data) => {
        this.setState({
          pin: data
        })
      })
  },
});

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
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6AAAA0'
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Avenir-Book',
    marginBottom: 10,
  },
  navBar: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    margin: -20,
  },
  expenseContainer: {
    flex: 1
  },
  priceLabel: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Avenir-heavy',
  }, 
  balanceContainer: {
    flex: 1
  },
  map: {
    flex: 3,
    marginBottom: 10
  },
});







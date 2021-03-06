import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, StatusBar, MapView, TouchableHighlight } from 'react-native';
import NavigationBar from 'react-native-navbar';
var _ = require('lodash');

var InvoiceItem = require('../../common/invoiceItem');
var Button = require('../../common/button');

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
    console.log(this.props.expense)
    console.log('this')
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
        <View style={styles.name}>
          <Text style={styles.title}>{this.props.event}</Text>
        </View>
        <View style={styles.expenseContainer}>
          <Text style={styles.label}>Description: {_.capitalize(this.props.expenseDescription)}</Text>
          <Text style={styles.label}>Location: {this.props.expenseLocation}</Text>
        </View>
        <View style={styles.mapContainer}>
          <MapView 
            annotations={[this.state.pin]}
            style={styles.map}>
          </MapView>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.priceLabel}>Amount: ${this.props.expenseAmount}</Text>
        </View>
        <View style={styles.buttonStyle}>
          <Button text={'Back to event'} onPress={this.onButtonPress} />
        </View>
      </View>
    )
  },
  onButtonPress: function() {
    this.props.navigator.pop()
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

var width = Dimensions.get('window').width;

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
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    padding: 5
  },
  label: {
    fontSize: 18,
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
    flex: 2,
    width: width
  },
  balanceContainer: {
    marginTop: 7
  },
  priceLabel: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Avenir-heavy',
  }, 
  mapContainer: {
    flex: 5
  },
  map: {
    flex: 7,
    marginLeft: -20,
    marginBottom: 10,
    width: width,
  },
  buttonStyle: {
    alignSelf: 'center',
    marginBottom: 50
  }
});







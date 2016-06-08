import React, { Component } from 'react';
import { Text, View, Dimensions, StatusBar, Linking, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import NavigationBar from 'react-native-navbar';

var InvoiceItem = require('../common/invoiceItem');
var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    console.log(this.props.price)
    return {
      user: null,
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user
  },
  componentDidMount: function(){
    console.log(this.props.payPalUrl)
  },
  render: function() { 
    var eventName = this.props.event;

    const rightButtonConfig = {
      title: 'Next',
      handler: () => alert('hello!'),
    };
    
    const leftButtonConfig = {
      title: 'Back',
      tintColor: 'rgba(255,255,255,.9)',
      handler: () => this.props.navigator.pop(),
    };

    const title = this.props.event + ' Invoice'

    const titleConfig = {
        title: title,
        tintColor: 'rgba(255,255,255,.9)',
      };

    const textIcon = <Text><Icon style={styles.icon} name="paypal" size={15} color="white" /> Pay with PayPal</Text>
    console.log("HERE")
    console.log(this.props.payPalUrl)
    return (
      <View style={styles.container}>
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
        <View style={styles.logoText}>
          <Text style={styles.logo}>plum</Text>
        </View>
        <View style={[styles.nameContainer]}>
          <Text style={styles.invoiceTitle}>Invoice: {eventName}</Text>
          <Text style={styles.title}>Group: {this.props.group}</Text>
        </View>
        <View style={[styles.priceContainer]}>
          <Text style={styles.priceTitle}>${this.props.price}</Text>
        </View>
        <View style={styles.button}>
          <Button text={textIcon} onPress={this._onPressButton} />
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
  getInvoices: function() {
    // Get invoices from API CALL
  },
  _onPressButton: function() {
    var url = 'https://www.sandbox.paypal.com/us/cgi_bin/webscr?cmd=_pay-inv&id=INV2-MTJR-D2UY-QTGZ-XZE5'
    Linking.openURL(url)
  },
});

var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontFamily: 'Avenir-Book',
  },
  invoiceTitle: {
    textAlign: 'center',
    fontSize: 32,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
  },
  nameContainer: {    
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5,
    marginTop: 20
  },
  priceContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 2
  },
  button: {
    width: width,
    flex: 7,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'center',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  navBar: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    margin: -20,
  },
  priceTitle: {
    textAlign: 'center',
    fontSize: 50,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
  },
  logo: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'Lobster 1.3',
    color: 'white',
    fontSize: 90,
    padding: 15,
  },
  logoText: {
    marginTop: 50,
    
    flex: 2,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
});






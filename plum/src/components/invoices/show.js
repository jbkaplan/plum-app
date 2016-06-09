import React, { Component } from 'react';
import { Text, View, Dimensions, StatusBar, Linking, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import NavigationBar from 'react-native-navbar';

var InvoiceItem = require('../common/invoiceItem');
var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      price: this.props.price
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user
  },
  componentDidMount: function(){
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
    var price = this.props.price

    String(price).charAt(0)

    const textIcon = <Text><Icon style={styles.icon} name="paypal" size={15} color="white" /> Pay with PayPal</Text>
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
          {this.showPayPalButton()}          
      </View>
    )
  },
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  },
  showPayPalButton: function(){
    var price = this.props.price
    const textIcon = <Text><Icon style={styles.icon} name="paypal" size={15} color="white" /> Pay with PayPal</Text>
    if (String(price).charAt(0) === '-' ) {
      return (
        <View style={styles.buttonArea}>
          <View style={[styles.priceContainer]}>
            <Text style={styles.priceTitleLoss}>${this.props.price}</Text>
          </View>
          <View style={styles.button}>
            <Button text={textIcon} onPress={this._onPressButton} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.profitButtonArea}>
          <View style={[styles.priceContainer]}>
            <Text style={styles.title}>Incoming Funds:</Text>
            <Text style={styles.priceTitleProfit}>${this.props.price}</Text>
          </View>
        </View>
      );
    }
  },
  getInvoices: function() {
    // Get invoices from API CALL
  },
  _onPressButton: function() {
    var url = this.props.payPalUrl
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
    lineHeight: 34,
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
    flex: 1
  },
  button: {
    width: width,
    flex: 7,
    marginBottom: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  priceTitleLoss: {
    textAlign: 'center',
    fontSize: 50,
    color: '#E3DABB',
    fontFamily: 'Avenir-Heavy',
  },
  priceTitleProfit: {
    textAlign: 'center',
    fontSize: 50,
    color: '#6AAAA0',
    fontFamily: 'Avenir-Heavy',
  },
  logo: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'Lobster 1.3',
    color: 'white',
    fontSize: 120,
    padding: 15,
  },
  logoText: {
    marginTop: 65,
    flex: 2,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  buttonArea: {
    flex: 3
  },
  profitButtonArea: {
    flex: 3,
    marginBottom: 50
  }
});






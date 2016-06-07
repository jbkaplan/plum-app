import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconTwo from 'react-native-vector-icons/EvilIcons';

module.exports = React.createClass({
  render: function() {
    return (
        <View style={[styles.invoiceItem]}>
          <View>
            <Text style={styles.invoiceGroupName}>{this.props.invoice.group}</Text>
            <Text style={styles.invoiceEventName}>{this.props.invoice.event}</Text>
          </View>
          <TouchableHighlight
              underlayColor='rgba(255,255,255,0)'
              style={styles.payPalButton}
              onPress={this._onPressPayPalButton}
              >
            <View style={styles.payButton}>
              <IconTwo name="chevron-right" size={50} color="white" />
            </View>
          </TouchableHighlight>
        </View>
    );
  },
  _onPressPayPalButton: function() {
    // Call to PayPal goes here
    console.log('PayPal API Call')
  }
});

var width = Dimensions.get('window').width; //full width

var styles = StyleSheet.create({
  invoiceItem: {
    flexDirection: 'row',
    marginBottom: 10,
    width: width,
    padding: 15,
    borderLeftColor: '#6AAAA0',
    borderLeftWidth: 5,
    backgroundColor: 'rgba(255,255,255,.1)'
  },
  invoiceGroupName: {
    fontFamily: 'Avenir-book',
    fontSize: 16,
    color: 'white'
  },
  invoiceEventName: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 24,
    color: 'white'
  },
  payPalButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
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
  payButton: {
    flexDirection: 'row'
  }
});








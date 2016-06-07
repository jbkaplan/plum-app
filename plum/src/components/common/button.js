import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, Dimensions } from 'react-native';

module.exports = React.createClass({
  render: function() {
    return (
      <TouchableHighlight 
        style={styles.button}
        underlayColor='#619089'
        onPress={this.props.onPress}
        >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
});

var width = Dimensions.get('window').width - 60; //full width

var styles = StyleSheet.create({
  button: {
    backgroundColor: '#6AAAA0',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 55,
    padding: 3,
    marginTop: 10
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
  }
});
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

var width = Dimensions.get('window').width - 80; //full width

var styles = StyleSheet.create({
  button: {
    backgroundColor: '#6AAAA0',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 44,
    padding: 5,
    marginTop: 10
  },
  buttonText: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 8,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    color: 'white',
    fontSize: 14
  }
});
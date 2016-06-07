import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: this.props.user
    };
  },
  componentDidMount: function(){
    // Rails API call to get current user
  },
  render: function() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.name]}>
          <Text style={styles.title}>{this.props.userName}</Text>
        </View>
        <View style={[styles.container]}>
          <Text style={styles.label}>Email: {this.props.userEmail}</Text>
        </View>
        <View style={[styles.container]}>
          <Text style={styles.label}>Phone: {this.props.userPhone}</Text>
        </View>
        <View style={[styles.container]}>
          <Text style={styles.label}>PayPal Info: $</Text>
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
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5
  },
  title: {
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    fontSize: 32,
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
  }
});

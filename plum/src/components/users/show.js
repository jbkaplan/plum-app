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
        <View style={[styles.supportContainer]}>
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.profileInfo}>{this.props.userEmail}</Text>
        </View>
        <View style={[styles.supportContainer]}>
          <Text style={styles.label}>Phone: </Text>
          <Text style={styles.profileInfo}>{this.props.userPhone}</Text>
        </View>
        <View style={[styles.supportContainer]}>
          <Text style={styles.label}>PayPal Info: </Text>
          <Text style={styles.profileInfo}></Text>
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
    textAlign: 'center',
    lineHeight: 65,
    fontSize: 60,
  },
  name: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5,
    // marginTop: 35
  },
  label: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Avenir-Heavy',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  profileInfo: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Avenir-Book',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  supportContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10
  }
});

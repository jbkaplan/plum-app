import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user groups
  },
  render: function() {

    // if (!this.state.user) {
    //   return <View style={styles.container}>
    //       <Text>Events Page...</Text>
    //     </View>
    // }

    // var username = this.state.user.get('username');

    return (
      <View style={styles.container}>
        <Text>Hello, !</Text>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
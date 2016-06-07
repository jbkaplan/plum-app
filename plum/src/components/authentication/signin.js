'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var Button = require('../common/button');
var FloatingLabel = require('react-native-floating-labels');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      pressStatus: false
    };
  },
  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  },
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.logoText}>
          <Text style={styles.logo}>plum</Text>
        </View>
        <Text style={styles.title}>Sign in</Text>
        <View style={styles.row}>
          <Icon style={styles.icon} name="envelope" size={17} color="#619089" />
          <FloatingLabel
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}
            style={styles.floatingFormInput}
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
            >Email</FloatingLabel>
        </View>
        <View style={styles.row}>
          <Icon style={styles.icon} name="lock" size={22} color="#619089" />
          <FloatingLabel
            password={true}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}
            style={styles.floatingFormInput}
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
            >Password</FloatingLabel>
        </View>
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <View style={styles.buttons}>
          <Button text={'Sign In'} onPress={this.onSignIn} />
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'#6AAAA0'}
            style={ this.state.pressStatus ? styles.needAccountButtonPress : styles.needAccountButton }
            onHideUnderlay={this._onHideUnderlay}
            onShowUnderlay={this._onShowUnderlay}
            onPress={this.onSignupPress}
            >
            <Text style={this.state.pressStatus ? styles.needAccountPress : styles.needAccount}>I need an account...</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },
  myFocusFunction: function(){
  },
  onBlurFunction: function(){
  },
  onSignupPress: function(){
    this.props.navigator.push({name: 'signup'});
  },
  onSignIn: function() {
    // Rails api call to check user/password
    // if successfull > Log In
    // this.props.navigator.immediatelyResetRouteStack([{name: 'userProfile'}]);
    fetch("http://localhost:3000/login", {method: "POST",
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({email: "tom@t.com", password: "tom"})
    })
    .then((response) => response.json())
    .then((responseText) => {
      // this.props.navigator({user: responseText.data.attributes});
      this.props.navigator.push({name: 'userProfile', user: {responseText.data.attributes}})
    })
  }
});

var width = Dimensions.get('window').width - 80;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'AvenirNext-Medium'
  },
  needAccount: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 8,
    flexDirection: 'row',
    color: '#6AAAA0',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 14
  },
  needAccountPress: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 8,
    flexDirection: 'row',
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 14
  },
  needAccountButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 44,
    padding: 5,
    marginTop: 8
  },
  needAccountButtonPress: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 44,
    padding: 5,
    marginTop: 8
  },
  floatingInput: {
    padding: 5,
    height: 40,
    borderWidth: 0,
    width: width,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'AvenirNext-Medium'
  },
  floatingLabelInput: {
    color: 'white',
    fontFamily: 'AvenirNext-Medium'
  },
  floatingFormInput: {
    fontFamily: 'AvenirNext-Medium',
    borderBottomWidth: 1.5,
    borderColor: '#619089',
  },
  lockIcon: {
    flex: 1,
    width: 40,
    height: 40
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: 'white',
    marginTop: 17,
    marginRight: 5,
    marginLeft: -20
  },
  logo: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'Lobster 1.3',
    color: 'white',
    fontSize: 90,
  },
  logoText: {
    width: width,
    marginBottom: 135
  }
});

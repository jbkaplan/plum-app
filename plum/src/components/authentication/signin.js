'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, Navigator, TouchableOpacity, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

var Button = require('../common/button');
var FloatingLabel = require('react-native-floating-labels');
var MainNavigation = require('./../../mainNavigation');

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
        <View style={[styles.formInput]}>
          <View style={styles.emailRow}>
            <Icon style={styles.icon} name="envelope" size={23} color="#619089" />
            <FloatingLabel 
              labelStyle={styles.floatingLabelInput}
              inputStyle={styles.floatingInput}              
              style={styles.floatingFormInput}
              value={this.state.email}
              onChangeText={(text) => this.setState({email: text})}
              >Email</FloatingLabel>
          </View>
          <View style={styles.row}>
            <Icon style={styles.icon} name="lock" size={25} color="#619089" />
            <FloatingLabel 
              password={true}
              labelStyle={styles.floatingLabelInput}
              inputStyle={styles.floatingInput}              
              style={styles.floatingFormInput}
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
              >Password</FloatingLabel>
          </View>
        </View>
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <View style={styles.buttons}>
          <Button text={'Sign In'} onPress={this.onSignInPress} />
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
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  },
  myFocusFunction: function(){

  },
  onBlurFunction: function(){

  },
  onSignupPress: function(){
    this.props.navigator.push({name: 'signup'});
  },
  onSignInPress: function() {
    // Rails api call to check user/password
    // if successfull > Log In
    this.props.navigator.immediatelyResetRouteStack([{name: 'mainNavigation'}]);
    // return <MainNavigation email={this.props.email} />
  }
});

var width = Dimensions.get('window').width - 60;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Avenir-Book'
  },
  needAccount: {
    alignSelf: 'stretch',
    textAlign: 'center',
    flexDirection: 'row',
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16
  },
  needAccountPress: {
    alignSelf: 'stretch',
    textAlign: 'center',
    flexDirection: 'row',
    color: '#6AAAA0',
    fontFamily: 'Avenir-Book',
    fontSize: 16
  },
  needAccountButton: {
    borderColor: '#6AAAA0',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 55,
    padding: 3,
    marginTop: 8
  },

  needAccountButtonPress: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 55,
    padding: 3,
    marginTop: 8
  },
  floatingInput: {
    padding: 5,
    height: 40,
    borderWidth: 0,
    width: width,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Avenir-Book' 
  },
  floatingLabelInput: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 18
  },
  floatingFormInput: {
    fontFamily: 'Avenir-Book',
    borderBottomWidth: 1.5, 
    borderColor: 'rgba(255,255,255,.1)',       
  },
  lockIcon: {
    flex: 1,
    width: 40,
    height: 40
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
    paddingLeft: 20,
  },
  icon: {
    color: 'rgba(255,255,255,.5)',
    marginTop: 19,
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
    padding: 15
  },
  logoText: {
    flex: 2,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25
  },
  formInput: {
    marginBottom: 100,
    marginHorizontal: 50,
  },
  buttons: {
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 35
  }
});









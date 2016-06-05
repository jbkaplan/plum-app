import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View, Dimensions } from 'react-native';

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
        <Text style={styles.title}>Sign in</Text>
        <FloatingLabel 
          labelStyle={styles.floatingLabelInput}
          inputStyle={styles.floatingInput}              
          style={styles.floatingFormInput}
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})}
          >Email</FloatingLabel>
        <FloatingLabel 
          password={true}
          labelStyle={styles.floatingLabelInput}
          inputStyle={styles.floatingInput}              
          style={styles.floatingFormInput}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          >Password</FloatingLabel>
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <View style={styles.buttons}>
          <Button text={'Sign In'} onPress={this.onPress} />
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'#619089'}
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
  onPress: function() {
    // Rails api call to check user/password
    this.props.navigator.immediatelyResetRouteStack([{name: 'events'}]);
  }
});

var width = Dimensions.get('window').width - 80;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    color: '#6AAAA0',
    fontWeight: '500'
  },
  needAccount: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 8,
    flexDirection: 'row',
    color: '#6AAAA0',
    fontSize: 14
  },
  needAccountPress: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 8,
    flexDirection: 'row',
    color: 'white',
    fontSize: 14
  },
  needAccountButton: {
    backgroundColor: 'white',
    borderColor: '#6AAAA0',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 44,
    padding: 5,
    marginTop: 8
  },
  needAccountButtonPress: {
    backgroundColor: 'white',
    borderColor: '#619089',
    borderWidth: 2,
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
    color: '#619089', 
  },
  floatingLabelInput: {
    color: '#619089',
  },
  floatingFormInput: {
    borderBottomWidth: 1.5, 
    borderColor: '#619089',       
  },
});









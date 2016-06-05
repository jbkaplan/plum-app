import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, Dimensions, View } from 'react-native';

var Button = require('../common/button');
var FloatingLabel = require('react-native-floating-labels');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
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
        <View style={styles.title}>
          <Text style={styles.headerText}>Sign up</Text>
        </View>
        <View style={styles.items}>
          <FloatingLabel 
            value={this.state.firstName}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            onChangeText={(text) => this.setState({firstName: text})}
            >First Name</FloatingLabel>
          <FloatingLabel 
            value={this.state.lastName}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            onChangeText={(text) => this.setState({lastName: text})}
            >Last Name</FloatingLabel>
        </View>
        <View style={styles.items}>
          <FloatingLabel 
            value={this.state.email}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            onChangeText={(text) => this.setState({email: text})}
            >Email</FloatingLabel>
          <FloatingLabel 
            value={this.state.phone}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            onChangeText={(text) => this.setState({phone: text})}
            >Phone</FloatingLabel>
        </View>
        <View style={styles.items}>
          <FloatingLabel 
            password={true}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            onChangeText={(text) => this.setState({password: text})}
            >Password</FloatingLabel>
          <Text style={styles.label}>{this.state.errorMessage}</Text>
          <Button text={'Signup'} onPress={this.onSignupPress} />  
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'#619089'}
            style={ this.state.pressStatus ? styles.haveAccountButtonPress : styles.haveAccountButton }
            onHideUnderlay={this._onHideUnderlay}
            onShowUnderlay={this._onShowUnderlay}
            onPress={this.onSigninPress}
            >
            <Text style={this.state.pressStatus ? styles.haveAccountPress : styles.haveAccount}>I have an account...</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  },
  onSignupPress: function() {
    // call to Rails API to add user to database
    this.props.navigator.immediatelyResetRouteStack([{name: 'groups'}]);
  },
  onSigninPress: function() {
    this.props.navigator.pop();
  }
});

var width = Dimensions.get('window').width - 80;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  label: {
    fontSize: 16
  },
  input: {
    fontSize: 14,
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  title: {
    margin: 10,
    alignItems: 'stretch'
  },
  items: {
    margin: 10,
    alignItems: 'stretch'
  },
  haveAccount: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 8,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    color: '#6AAAA0',
    fontSize: 14
  },
  haveAccountButton: {
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
  haveAccountButtonPress: {
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
  haveAccountPress: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 8,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    color: 'white',
    fontSize: 14
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
  headerText: {
    fontSize: 24,
    color: '#6AAAA0',
    fontWeight: '500'
  },
});










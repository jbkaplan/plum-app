import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, Image, TouchableHighlight, Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

var IconTwo = require('react-native-vector-icons/Entypo');
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
      <Image style={styles.backgroundImage} source={require('./../../img/background.jpg')}>
        <View style={styles.container}>
          <View style={[styles.logoText]}>
            <Text style={styles.logo}>plum</Text>
          </View>
          <View style={styles.inputs}>
            <View style={styles.items}>
              <View style={styles.row}>
                <Icon style={styles.icon} name="user" size={23} color="#619089" />
                <FloatingLabel 
                  value={this.state.firstName}
                  labelStyle={styles.floatingLabelInput}
                  inputStyle={styles.floatingInput}              
                  style={styles.floatingFormInput}
                  onChangeText={(text) => this.setState({firstName: text})}
                  >First Name</FloatingLabel>
              </View>
              <View style={styles.row}>
                <Icon style={styles.icon} name="user" size={23} color="#619089" />
                <FloatingLabel 
                  value={this.state.lastName}
                  labelStyle={styles.floatingLabelInput}
                  inputStyle={styles.floatingInput}              
                  style={styles.floatingFormInput}
                  onChangeText={(text) => this.setState({lastName: text})}
                  >Last Name</FloatingLabel>
              </View>
            </View>
            <View style={styles.items}>
              <View style={styles.row}>
                <Icon style={styles.icon} name="envelope" size={23} color="#619089" />
                <FloatingLabel 
                  value={this.state.email}
                  labelStyle={styles.floatingLabelInput}
                  inputStyle={styles.floatingInput}              
                  style={styles.floatingFormInput}
                  onChangeText={(text) => this.setState({email: text})}
                  >Email</FloatingLabel>
              </View>
              <View style={styles.row}>
                <IconTwo style={styles.iconTwo} name="phone" size={19} color="#619089" />
                <View style={styles.phoneLabel}>
                  <FloatingLabel 
                    value={this.state.phone}
                    labelStyle={styles.floatingPhoneLabelInput}
                    inputStyle={styles.floatingPhoneInput}              
                    style={styles.floatingPhoneFormInput}
                    onChangeText={(text) => this.setState({phone: text})}
                    >Phone</FloatingLabel>
                </View>
              </View>
            </View>
            <View style={styles.items}>
              <View style={styles.row}>
                <Icon style={styles.icon} name="lock" size={23} color="#619089" />
                <FloatingLabel 
                  password={true}
                  labelStyle={styles.floatingLabelInput}
                  inputStyle={styles.floatingInput}              
                  style={styles.floatingFormInput}
                  onChangeText={(text) => this.setState({password: text})}
                  >Password</FloatingLabel>
              </View>
            </View>
            <Text style={styles.label}>{this.state.errorMessage}</Text>
            </View>
            <View style={[styles.button]}>
              <Button text={'Signup'} onPress={this.onSignupPress} />  
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={'#6AAAA0'}
                style={ this.state.pressStatus ? styles.haveAccountButtonPress : styles.haveAccountButton }
                onHideUnderlay={this._onHideUnderlay}
                onShowUnderlay={this._onShowUnderlay}
                onPress={this.onSigninPress}
                >
                <Text style={this.state.pressStatus ? styles.haveAccountPress : styles.haveAccount}>I have an account...</Text>
              </TouchableHighlight>
            </View>
        </View>
      </Image>
    )
  },
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  },
  onSignupPress: function() {
    // call to Rails API to add user to database
    this.props.navigator.immediatelyResetRouteStack([{name: 'mainNavigation'}]);
  },
  onSigninPress: function() {
    this.props.navigator.pop();
  }
});

var width = Dimensions.get('window').width - 60;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  label: {
    fontSize: 16
  },
  input: {
    fontFamily: 'Avenir-Book',
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
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'stretch'
  },
  items: {
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'stretch'
  },
  haveAccount: {
    alignSelf: 'stretch',
    textAlign: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16
  },
  haveAccountButton: {
    borderColor: '#6AAAA0',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 55,
    padding: 3,
    marginTop: 8
  },
  haveAccountButtonPress: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 55,
    padding: 3,
    marginTop: 8
  },
  haveAccountPress: {
    alignSelf: 'stretch',
    textAlign: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
    color: '#6AAAA0',
    fontFamily: 'Avenir-Book',
    fontSize: 16
  },
  floatingInput: {
    padding: 5,
    height: 40,
    borderWidth: 0,
    width: width,
    fontFamily: 'Avenir-Book',
    alignSelf: 'center',
    color: 'white', 
  },
  floatingLabelInput: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 18
  },
  floatingFormInput: {
    borderBottomWidth: 1.5, 
    borderColor: 'rgba(255,255,255,.1)',       
  },
  floatingPhoneInput: {
    padding: 5,
    height: 40,
    borderWidth: 0,
    width: width,
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    alignSelf: 'center',
    color: 'white', 
  },
  floatingPhoneLabelInput: {
    color: 'white',
    paddingLeft: 8,
    fontFamily: 'Avenir-Book',
  },
  floatingPhoneFormInput: {
    borderBottomWidth: 1.5, 
    borderColor: 'rgba(255,255,255,.1)',       
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Avenir-Book'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
    height: null,
    width: null,
    backgroundColor: 'rgba(0, 0, 0, 0)'
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
    color: 'rgba(255,255,255,.5)',
    marginTop: 19,
    marginRight: 5,
    marginLeft: -20
  },
  logoText: {
    width: width,
    marginTop: 28,
    paddingTop: 25,
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
  iconTwo: {
    color: 'rgba(255,255,255,.5)',
    marginTop: 20,
    marginRight: 5,
    marginLeft: -20
  },
  button: {
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 63
  },
  inputs: {
    marginBottom: 20
  },
  phoneLabel: {
    marginLeft: 5
  }
});










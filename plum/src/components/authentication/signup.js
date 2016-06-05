import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      errorMessage: ''
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>You can sign up here</Text>
        </View>
        <View style={styles.items}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput value={this.state.firstName}
            onChangeText={(text) => this.setState({firstName: text})}
            style={styles.input}
            />
          <Text style={styles.label}>Last Name:</Text>
          <TextInput value={this.state.lastName}
            onChangeText={(text) => this.setState({lastName: text})}
            style={styles.input}
            />
        </View>
        <View style={styles.items}>
          <Text style={styles.label}>Email:</Text>
          <TextInput value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
            style={styles.input}
            />
          <Text style={styles.label}>Phone:</Text>
          <TextInput value={this.state.phone}
            onChangeText={(text) => this.setState({phone: text})}
            style={styles.input}
            />
        </View>
        <View style={styles.items}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
            style={styles.input}
            />
          <Text style={styles.label}>{this.state.errorMessage}</Text>
          <Button text={'Signup'} onPress={this.onSignupPress} />  
          <Button text={'I have an account...'} onPress={this.onSigninPress} />
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
});










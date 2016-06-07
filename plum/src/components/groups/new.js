'use strict';

import React, { Component } from 'react';
import { AlertIOS, Text, Dimensions, TextInput, View, StyleSheet, TouchableHighlight } from 'react-native';

var AutoComplete = require('react-native-autocomplete');
var GroupMembers = [{name: 'Tom'}, {name: 'Jon'}, {name: 'Lisa'}, {name: 'Brad'}];
var Button = require('../common/button');

const API = ''; // Rails API

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      groupMembers: [],
      groupName: '',
      errorMessage: '',
      query: '',
      personName: '',
      newGroupArray: [],
      personName: ''
    };
  },
  componentWillMount: function(){
    // Call to Rails API to have current user
  },
  onTyping: function (text) {
    var members = GroupMembers.filter(function (member) {
        return member.name.toLowerCase().startsWith(text.toLowerCase())
    }).map(function (member) {
        return member.name;
    });
    this.setState({
        personName: members
    });
  },
  render: function() {
    return (
      <View style={[styles.container]}>
        <Text style={[styles.header]}>Create a Group</Text>
        <View>
          <Text style={styles.label}>Group Name:</Text>
            <View style={styles.flowRight}>
                <TextInput style={styles.groupNameInput}
                  value={this.state.query}
                  onChangeText={(text) => this.setState({query: text})}/>
                <TouchableHighlight
                  underlayColor='#6AAAA0'
                  onPress={this.handleGroupNameChange}
                  style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableHighlight>
            </View>
        </View>
        <View style={styles.inputs}>
          <Text style={styles.label}>Members:</Text>
            <View style={styles.flowRight}>
            <TextInput style={styles.groupNameInput}
              value={this.state.personName}
              onChangeText={(text) => this.setState({personName: text})}
              />
            <TouchableHighlight
              underlayColor='#6AAAA0'
              onPress={this.handlePersonNameChange}
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.groupNameContainer}>
          <Text style={styles.groupNameTitle}>{this.state.groupName}</Text>
          {this.displayGroupMembers()}
        </View>

        <TouchableHighlight
          style={styles.createGroupButton}
          underlayColor='#6AAAA0'
          onPress={this.onNewGroupPress}>
          <Text style={styles.buttonText}>Create Group</Text>
        </TouchableHighlight>
      </View>
    )
  },
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  },
  handlePersonNameChange: function() {
    console.log(this.state.personName)
    this.setState({
      newGroupArray: this.state.newGroupArray.concat([this.state.personName]),
      personName: ''
    });
    console.log(this.state.newGroupArray)
  },
  onNewGroupPress: function() {
    // Call to Rails API to create new group - POST AJAX
    // console.log(this.state.newGroupArray);

    fetch("http://plumpayments.herokuapp.com/users", {
      method: "POST",
      headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({first_name: "dfg", last_name: "L", email: "e@mfffgdfgail.com", password:"secret"})
    })
    // .then((response) => {
    //   console.log('*********', response.json());
    // })
    // .then((responseData) => {
    //   console.log('$$$$$$$$$$$', JSON.stringify(responseData.body));
    //   AlertIOS.alert(
    //       "POST Response",
    //       "Response Body -> " + JSON.stringify(responseData.body)
    //   )
    //   console.log(JSON.stringify(responseData.body));
    // })
    .done();
  },
  handleGroupNameChange: function() {
    this.setState({
      groupName: this.state.query,
      query: ''
    });
  },
  displayGroupMembers: function(){
    return this.state.newGroupArray.map(function(member, index) {
      return (
        <Text style={styles.groupMembers} key={index}>
          Member #{index + 1}: {member}
        </Text>
      )
    });
  },
});

var width = Dimensions.get('window').width - 80;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  createGroupButton: {
    backgroundColor: '#6AAAA0',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 44,
    padding: 3,
    marginBottom: 50
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
    fontFamily: 'AvenirNext-Medium',
    fontSize: 18,
  },
  autocomplete: {
    width: 200,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: 'lightblue',
    borderWidth: 1,
    margin: 5,
    padding: 4
  },
  inputs: {
  },
  addNameButton: {
    height: 50,
    width: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6AAAA0'
  },
  header: {
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
    fontWeight: 'bold',
    paddingTop: 30,
    fontSize: 32,
  },
  groupNameInput: {
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
    padding: 4,
    borderColor: 'white',
    height: 44,
    width: 200,
    margin: 5,
    borderWidth: 1,
  },
  button: {
    height: 44,
    width: 44,
    flexDirection: 'row',
    backgroundColor: '#6AAAA0',
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 4,
    margin: 5
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupNameContainer: {
    flex: 1
  },
  groupNameTitle: {
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 24,
    fontWeight: 'bold'
  },
  groupMembers: {
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
  },
  label: {
    marginTop: 10,
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 18,

  }
});

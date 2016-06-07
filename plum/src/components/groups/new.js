'use strict';

import React, { Component } from 'react';
import { AlertIOS, Text, Dimensions, TextInput, ScrollView, StatusBar, View, StyleSheet, TouchableHighlight } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/EvilIcons';

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
    const rightButtonConfig = {
      title: 'Next',
      handler: () => alert('hello!'),
    };

    const myIcon = (<Icon name="chevron-left" size={50} color="white" />)

    const leftButtonConfig = {
      title: 'Back',
      tintColor: 'rgba(255,255,255,.9)',
      handler: () => this.props.navigator.pop(),
    };
    const titleConfig = {
        title: 'Create Group',
      };

    return (
      <View style={[styles.container]}>
        <View style={styles.navBar}>
          <StatusBar
            barStyle="default"
            style="default"
           />
          <NavigationBar
            tintColor='rgba(255,255,255,.1)'

            leftButton={leftButtonConfig} />
        </View>
        <Text style={[styles.header]}>{this.props.userName} Create a Group</Text>
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
                  <Text style={styles.plusText}>+</Text>
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
              <Text style={styles.plusText}>+</Text>
            </TouchableHighlight>
          </View>
        </View>
        <ScrollView>
          <View style={styles.groupNameContainer}>
            <Text style={styles.groupNameTitle}>{this.state.groupName}</Text>
            {this.displayGroupMembers()}
          </View>
        </ScrollView>

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
    this.setState({
      newGroupArray: this.state.newGroupArray.concat([this.state.personName]),
      personName: ''
    });
  },
  onNewGroupPress: function() {
    // Call to Rails API to create new group - POST AJAX
    fetch('http://localhost:3000/groups/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.groupName,
        members: this.state.newGroupArray,
      })
    }).then((response) => response.text()).then((responseText) => {
    console.log(responseText); });
    this.setState({
      newGroupArray: [],
      groupName: ''
    });
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
    height: 55,
    padding: 3,
    marginTop: 15,
    marginBottom: 50
  },
  buttonText: {
    alignSelf: 'stretch',
    textAlign: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
  },
  plusText: {
    alignSelf: 'stretch',
    textAlign: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    marginTop: 8,
    justifyContent: 'flex-end',
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
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
    fontFamily: 'Avenir-Heavy',
    paddingTop: 30,
    fontSize: 32,
  },
  groupNameInput: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    padding: 4,
    borderColor: 'rgba(255,255,255,.1)',
    height: 44,
    width: 275,
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
    alignSelf: 'stretch'
  },
  groupNameContainer: {
    flex: 1
  },
  groupNameTitle: {
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    fontSize: 24,
  },
  groupMembers: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
  },
  label: {
    marginLeft: 7,
    marginTop: 10,
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
  },
  navBar: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    margin: -20,
  }
});

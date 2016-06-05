'use strict';

import React, { Component } from 'react';
import { AlertIOS, Text, TextInput, View, StyleSheet, TouchableHighlight } from 'react-native';

var AutoComplete = require('react-native-autocomplete');
var GroupMembers = [{name: 'Tom'}, {name: 'Jon'}, {name: 'Lisa'}, {name: 'Brad'}];

const API = ''; // Rails API


module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      groupMembers: [],
      groupName: '',
      errorMessage: '',
      query: ''
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
          groupMembers:  members
      });
  },
  render: function() {
    return (
      <View style={[styles.container, this.border('red')]}>

        <Text style={[styles.header , this.border('blue')]}>Create a Group</Text>

        <View style={this.border('blue')}>
          <Text style={styles.label}>Group Name:</Text>
          <TextInput style={styles.groupNameInput} />

          <TouchableHighlight
          underlayColor='#6AAAA0'
          onPress={this.onNewGroupNamePress}
          style={styles.addNameButton}>
            <Text>+</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.inputs, this.border('blue')]}>
          <Text>Members:</Text>
          <AutoComplete
              onTyping={this.onTyping}
              suggestions={this.state.groupMembers}
              style={styles.autocomplete}
              placeholder='Name or Email'
              autoCorrect={false}
              clearButtonMode='always'
              returnKeyType='go'
              textAlign='center'
              clearTextOnFocus={true}
              maximumNumberOfAutoCompleteRows={10}
              applyBoldEffectToAutoCompleteSuggestions={true}
              reverseAutoCompleteSuggestionsBoldEffect={true}
              showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
              autoCompleteTableViewHidden={false}
              autoCompleteTableBorderColor='lightblue'
              autoCompleteTableBackgroundColor='white'
              autoCompleteTableBorderWidth={1}
              autoCompleteRowHeight={35}
              autoCompleteFontSize={15}
              autoCompleteRegularFontName='Helvetica Neue'
              autoCompleteBoldFontName='Helvetica Bold'
              autoCompleteTableCellTextColor={'black'}
          />

          <TouchableHighlight
            underlayColor='#6AAAA0'
            style={styles.addNameButton}>
            <Text>+</Text>
          </TouchableHighlight>
        </View>

        <View style={this.border('green')}>
          <Text>
            This is where we will show the added users
          </Text>
        </View>

        <TouchableHighlight
          underlayColor='#6AAAA0'
          onPress={this.onNewGroupPress}>

          <Text style={[styles.createGroupButton, this.border('blue')]}>Create Group</Text>
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
  onNewGroupPress: function() {
    // Call to Rails API to create new group - POST AJAX
  },
  onNewGroupNamePress: function() {

  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  createGroupButton:{
    fontSize: 24,
    color: 'white',
    backgroundColor: '#6AAAA0',
    borderRadius: 8,
    alignItems: 'stretch',
    textAlign: 'center'
  },
  autocomplete: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: 'lightblue',
    borderWidth: 1
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
    paddingTop: 20,
  },
  groupNameInput: {
    padding: 4,
    height: 40,
    width: 200,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5
  }
});

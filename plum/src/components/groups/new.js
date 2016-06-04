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
      <View style={styles.container}>
        <Text>New Group:</Text>

        <View style={styles.inputs}>
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
            onPress={this.onNewGroupPress}
            style={styles.addNameButton}
            >
            <Text>+</Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight 
          underlayColor='#6AAAA0'
          onPress={this.onNewGroupPress}
          >
          <Text style={styles.createGroupButton}>Create Group</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#6AAAA0',
    borderWidth: 2,
    height: 50,
    width: 50,
    borderRadius: 50,
    borderColor: '#619089',
    justifyContent: 'center',
    alignItems: 'center'
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
    flex: 1,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: 'lightblue',
    borderWidth: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 50,
  },
  inputs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  addNameButton: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6AAAA0'
  }
});





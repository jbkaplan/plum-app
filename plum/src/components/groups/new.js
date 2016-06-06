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
        groupMembers:  members
    });
  },
  render: function() {
    return (
      <View style={[styles.container, this.border('red')]}>

        <Text style={[styles.header , this.border('blue')]}>Create a Group</Text>

        <View style={this.border('blue')}>
          <Text style={styles.label}>Group Name:</Text>
          <View style={[styles.flowRight, this.border('red')]}>
            <TextInput style={styles.groupNameInput}
            onChangeText={(text) => this.setState({groupName: text})}/>

            <TouchableHighlight
            underlayColor='#6AAAA0'
            onPress={this.onNewGroupNamePress}
            style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={[styles.inputs, this.border('blue')]}>
          <Text>Members:</Text>
            <View style={[styles.flowRight, this.border('red')]}>
            <AutoComplete
                value={this.state.personName}
                handlePersonNameChange={this.handlePersonNameChange}
                onTyping={this.onTyping}
                suggestions={this.state.groupMembers}
                style={styles.autocomplete}
                placeholder='Name or Email'
                autoCorrect={false}
                clearButtonMode='always'
                returnKeyType='go'
                textAlign='center'
                clearTextOnFocus={false}
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
              onPress={this.onMemberAdd}
              underlayColor='#6AAAA0'
              style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={[styles.groupNameContainer, this.border('green')]}>
          {this.displayGroupMembers()}
        </View>

        <TouchableHighlight
          style={[styles.createGroupButton, this.border('blue')]}
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
  handlePersonNameChange: function(e) {
    this.setState({personName: e.target.value});
  },
  onNewGroupPress: function() {
    // Call to Rails API to create new group - POST AJAX
  },
  onNewGroupNamePress: function() {
    return (
        <Text>
          {this.state.groupName}
        </Text>
    )
  },
  onMemberAdd: function() {
    var member = {name: "hello"};

    this.setState({
      groupMembers: this.state.newGroupArray.concat([{name: "hello"}])
    });
  },
  displayGroupMembers: function() {
    return this.state.newGroupArray.map(function(member, i){
      <View>
        <Text>
          {this.state.groupName}
        </Text>
      </View>
    )
  },
  onPersonAdd: function() {
    var member = this.state.personName;
    console.log(member)
    this.setState({
      members: this.state.groupMembers.concat([member])
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  createGroupButton:{
    backgroundColor: '#6AAAA0',
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 10,
    height: 44
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
    paddingTop: 20,
  },
  groupNameInput: {
    padding: 4,
    height: 44,
    width: 200,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    width: 44,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
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
  }
});

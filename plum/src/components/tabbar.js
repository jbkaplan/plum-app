import React, { Component } from 'react';
import { StyleSheet, Text, TabBarIOS, View, Dimensions } from 'react-native';

var Signin = require('./authentication/signin');
var Signup = require('./authentication/signup');
var Groups = require('./groups/groups');
var NewGroup = require('./groups/new');
var NewGroupTwo = require('./groups/new2');
var Events = require('./events/events');
var EventShow = require('./events/show');
var ExpenseShow = require('./events/expenses/show');
var NewExpense = require('./events/expenses/new');
var NewEvent = require('./events/new');
var UserProfile = require('./users/show');
var TabBar = require('./tabbar');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'groups',
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
      <TabBarIOS>
        <TabBarIOS.Item
          title="Groups"
          selected={this.state.selectedTab == 'Groups'}
          onPress={this.onTabSelect.bind(this, 'Groups')}>
          <Groups 
            navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Events"
          selected={this.state.selectedTab == 'Events'}
          onPress={this.onTabSelect.bind(this, 'Events')}>
          <Events 
            navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Profile"
          selected={this.state.selectedTab == 'Profile'}
          onPress={this.onTabSelect.bind(this, 'Profile')}>
          <UserProfile 
            navigator={this.props.navigator}  />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
  }
});

var width = Dimensions.get('window').width - 80;

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});









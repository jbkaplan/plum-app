import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  TabBarIOS,
  TouchableHighlight,
  Image,
  View
} from 'react-native';

var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Groups = require('./components/groups/groups');
var NewGroup = require('./components/groups/new');
var NewGroupTwo = require('./components/groups/new2');
var Events = require('./components/events/events');
var EventShow = require('./components/events/show');
var ExpenseShow = require('./components/events/expenses/show');
var NewExpense = require('./components/events/expenses/new');
var NewEvent = require('./components/events/new');
var UserProfile = require('./components/users/show');
var TabBar = require('./components/tabbar');

ROUTES = {
  signin: Signin,
  signup: Signup,
  events: Events,
  eventShow: EventShow,
  userProfile: UserProfile,
  tabBar: TabBar,
  // accountInfo: AccountInfo,
  // expenses: Expenses,
  expenseShow: ExpenseShow,
  groups: Groups,
  // invoices: Invoices,
  // splash: Splash,
  newGroup: NewGroup,
  newGroupTwo: NewGroupTwo,
  newEvent: NewEvent,
  newExpense: NewExpense,
};

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'Groups',
      user: ''
    };
  },
  componentWillMount: function() {
    // RAILS API CALL
  },
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    // return <Component route={route} navigator={navigator} user={this.state.user}/>;
    return <Component navigator={navigator} {...route.passProps}/>;
  },

  render: function() {
    return (
      <Image style={styles.backgroundImage} source={require('./img/background.jpg')}>
        <TabBarIOS style={styles.container}>
          <TabBarIOS.Item
            title="Groups"
            selected={this.state.selectedTab == 'Groups'}
            onPress={() => this.setState({ selectedTab: 'Groups' })}>
            <Navigator
              style={styles.container}
              initialRoute={{name: 'signin'}}
              renderScene={this.renderScene}
              configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; } }
              />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Events"
            selected={this.state.selectedTab == 'Events'}
            onPress={() => this.setState({ selectedTab: 'Events' })}>
            <Navigator
              style={styles.container}
              initialRoute={{name: 'events'}}
              renderScene={this.renderScene}
              configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; } }
              />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Profile"
            selected={this.state.selectedTab == 'Profile'}
            onPress={() => this.setState({ selectedTab: 'Profile' })}>
            <Navigator
              style={styles.container}
              initialRoute={{name: 'userProfile', index: 0}}
              renderScene={this.renderScene}
              configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; } }
              />
          </TabBarIOS.Item>
        </TabBarIOS>
      </Image>
    );
  },
  onProfilePress: function() {
    this.props.navigator.immediatelyResetRouteStack([{name: 'userProfile'}]);
  },
  onEventsPress: function() {
    this.props.navigator.immediatelyResetRouteStack([{name: 'events'}]);
  },
  onGroupsPress: function() {
    this.props.navigator.immediatelyResetRouteStack([{name: 'groups'}]);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
    height: null,
    width: null,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
});

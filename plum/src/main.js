import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  TabBarIOS,
  TouchableHighlight,
  Image,
  StatusBar,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Foundation';

var CookieManager = require('react-native-cookies');

var IconTwo = require('react-native-vector-icons/EvilIcons');
var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Groups = require('./components/groups/groups');
var GroupView = require('./components/groups/groupView');
var NewGroup = require('./components/groups/new');
var Events = require('./components/events/events');
var EventShow = require('./components/events/show');
var Invoices = require('./components/invoices/show');
var ExpenseShow = require('./components/events/expenses/show');
var NewExpense = require('./components/events/expenses/new');
var NewEvent = require('./components/events/new');
var UserProfile = require('./components/users/show');
var MainNavigation = require('./mainNavigation');

ROUTES = {
  signin: Signin,
  signup: Signup,
  events: Events,
  eventShow: EventShow,
  userProfile: UserProfile,
  // accountInfo: AccountInfo,
  // expenses: Expenses,
  expenseShow: ExpenseShow,
  groups: Groups,
  groupView: GroupView,
  invoices: Invoices,
  // splash: Splash,
  newGroup: NewGroup,
  newEvent: NewEvent,
  newExpense: NewExpense,
  mainNavigation: MainNavigation,
};

// set a cookie (IOS ONLY)
CookieManager.set({
  name: 'userCookie',
  value: '1',
  domain: 'some domain',
  origin: 'some origin',
  path: '/',
  version: '1',
  expiration: '2015-05-30T12:30:00.00-05:00'
}, (err, res) => {
  console.log('cookie set!');
  console.log(err);
  console.log(res);
});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'Groups',
      user: null,
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
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
        <Navigator
          style={styles.container}
          ref='profile'
          initialRoute={{name: 'signin'}}
          renderScene={this.renderScene}
          configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; } }
          />
      </Image>
    );
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
  },
});

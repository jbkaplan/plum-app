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

var IconTwo = require('react-native-vector-icons/EvilIcons');
var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Groups = require('./components/groups/groups');
var GroupShow = require('./components/groups/show');
var GroupView = require('./components/groups/groupView');
var NewGroup = require('./components/groups/new');
var Events = require('./components/events/index');
var EventShow = require('./components/events/show');
var Invoices = require('./components/invoices/index');
var InvoiceShow = require('./components/invoices/show');
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
  groupShow: GroupShow,
  groupView: GroupView,
  invoices: Invoices,
  invoiceShow: InvoiceShow,
  // splash: Splash,
  newGroup: NewGroup,
  newEvent: NewEvent,
  newExpense: NewExpense,
  mainNavigation: MainNavigation,
};

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
    return <Component navigator={navigator} {...route.passProps} />;
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

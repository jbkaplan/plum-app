import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Groups = require('./components/groups/groups');
var NewGroup = require('./components/groups/new');
var Events = require('./components/events/events');
var EventShow = require('./components/events/show');

ROUTES = {
  signin: Signin,
  signup: Signup,
  events: Events,
  eventShow: EventShow,
  // profile: Profile,
  // accountInfo: AccountInfo,
  // expenses: Expenses,
  groups: Groups,
  // invoices: Invoices,
  // splash: Splash,
  newGroup: NewGroup,
  // newEvent: NewEvent,
  // newExpense: NewExpense,
};

module.exports = React.createClass({
  componentWillMount: function() {
    // RAILS API CALL
  },
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  },
  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signin'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; } }
        />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3DABB'
  }
});

// SceneConfigs Options:
// PushFromRight
// FloatFromRight
// FloatFromLeft
// FloatFromBottom
// FloatFromBottomAndroid
// FadeAndroid
// HorizontalSwipeJump
// HorizontalSwipeJumpFromRight
// VerticalUpSwipeJump
// VerticalDownSwipeJump

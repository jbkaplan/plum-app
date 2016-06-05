import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  TabBarIOS
} from 'react-native';

var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Groups = require('./components/groups/groups');
var NewGroup = require('./components/groups/new');
var Events = require('./components/events/events');
var EventShow = require('./components/events/show');
var ExpenseShow = require('./components/events/expenses/show');
var NewExpense = require('./components/events/expenses/new');
var UserProfile = require('./components/users/show');

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
  // invoices: Invoices,
  // splash: Splash,
  newGroup: NewGroup,
  // newEvent: NewEvent,
  newExpense: NewExpense,
};

module.exports = React.createClass({
  getInitialState: function() {
    return { selectedTab: 'Groups' };
  },
  componentWillMount: function() {
    // RAILS API CALL
  },
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    return <TabBarIOS>
            <TabBarIOS.Item
              title="Groups"
              selected={this.state.selectedTab == 'Groups'}
              onPress={() => this.setState({ selectedTab: 'Groups' })}>
              <Component route={'groups'} navigator={this.props.navigator} />
            </TabBarIOS.Item>
            <TabBarIOS.Item
              title="Events"
              selected={this.state.selectedTab == 'Events'}
              onPress={() => this.setState({ selectedTab: 'Events' })}>
              <Component 
                route={route} 
                navigator={this.props.navigator} 
                />;
            </TabBarIOS.Item>
          </TabBarIOS>
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
  },
  onEventPress: function() {
    // Rails api call to check user/password
    this.props.navigator.immediatelyResetRouteStack([{name: 'events'}]);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3DABB'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
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

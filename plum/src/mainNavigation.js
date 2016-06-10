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

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Foundation';

var IconTwo = require('react-native-vector-icons/EvilIcons');
var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Groups = require('./components/groups/groups');
var GroupView = require('./components/groups/groupView');
var GroupShow = require('./components/groups/show');
var NewGroup = require('./components/groups/new');
var Events = require('./components/events/index');
var EventShow = require('./components/events/show');
var ExpenseShow = require('./components/events/expenses/show');
var Invoices = require('./components/invoices/index');
var InvoiceShow = require('./components/invoices/show');
var NewExpense = require('./components/events/expenses/new');
var NewEvent = require('./components/events/new');
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
  groupShow: GroupShow,
  groupView: GroupView,
  invoices: Invoices,
  invoiceShow: InvoiceShow,
  // splash: Splash,
  newGroup: NewGroup,
  newEvent: NewEvent,
  newExpense: NewExpense,
};

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'Groups',
    };
  },
  componentWillMount: function() {
    // RAILS API CALL
  },
  renderScene: function(route, navigator) {
    // Access component for route name
    var Component = ROUTES[route.name];
    return <Component
      route={route}
      navigator={navigator}
      userId={this.props.user}
      userName={this.props.userName}
      userEmail={this.props.userEmail}
      userPhone={this.props.userPhone}
      {...route.passProps}/>;
  },

  render: function() {
    return (
      <Image style={styles.backgroundImage} source={require('./img/background.jpg')}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
        <TabBarIOS
          translucent={true}
          tintColor="#6AAAA0"
          unselectedTintColor='#905a90'
          style={styles.container}
          >
            <Icon.TabBarItemIOS
              title="Groups"
              iconName="torsos"
              selectedIconName="torsos"
              selected={this.state.selectedTab == 'Groups'}
              onPress={() => { if ( this.state.selectedTab !== 'Groups') {
                this.setState({selectedTab: 'Groups'});
              } else if (this.state.selectedTab === 'Groups') {
                this.refs.group.popToTop();
              }}}>
            <Navigator
              style={styles.container}
              ref='group'
              initialRoute={{name: 'groups'}}
              renderScene={this.renderScene}
              configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; } }
              />
            </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            title="Events"
            iconName="calendar"
            selectedIconName="calendar"
            selected={this.state.selectedTab == 'Events'}
            onPress={() => { if ( this.state.selectedTab !== 'Events') {
              this.setState({selectedTab: 'Events'});
            } else if (this.state.selectedTab === 'Events') {
              this.refs.event.popToTop();
            }}}>
            <Navigator
              style={styles.container}
              ref='event'
              initialRoute={{name: 'events'}}
              renderScene={this.renderScene}
              configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; } }
              />
          </Icon.TabBarItemIOS>
          <IconTwo.TabBarItemIOS
            title="Invoices"
            iconName="credit-card"
            selectedIconName="credit-card"
            selected={this.state.selectedTab == 'Invoices'}
            onPress={() => { if ( this.state.selectedTab !== 'Invoices') {
              this.setState({selectedTab: 'Invoices'});
            } else if (this.state.selectedTab === 'Invoices') {
              this.refs.invoice.popToTop();
            }}}>
            <Navigator
              style={styles.container}
              ref='invoice'
              initialRoute={{name: 'invoices'}}
              renderScene={this.renderScene}
              configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; } }
              />
          </IconTwo.TabBarItemIOS>
          <IconTwo.TabBarItemIOS
            title="Profile"
            iconName="user"
            selectedIconName="user"
            selected={this.state.selectedTab == 'Profile'}
            onPress={() => { if ( this.state.selectedTab !== 'Profile') {
              this.setState({selectedTab: 'Profile'});
            } else if (this.state.selectedTab === 'Profile') {
              this.refs.profile.popToTop();
            }}}>
            <Navigator
              style={styles.container}
              ref='profile'
              initialRoute={{name: 'userProfile'}}
              renderScene={this.renderScene}
              configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; } }
              />
          </IconTwo.TabBarItemIOS>
        </TabBarIOS>
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
  icon: {
    fontFamily: 'FontAwesome',

  }
});

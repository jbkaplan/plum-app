import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  TabBarIOS,
  TouchableHighlight,
  Image,
  View
} from 'react-native';

var Groups = require('./groups');
var NewGroup = require('./new');
var NewGroupTwo = require('./new2');

ROUTES = {
  groups: Groups,
  newGroup: NewGroup,
  newGroupTwo: NewGroupTwo,
};

module.exports = React.createClass({

  componentWillMount: function() {
    // RAILS API CALL
  },

  renderScene: function(route, navigator) {
    // Access component for route name
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  },

  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'groups'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; } }
        />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

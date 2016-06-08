import React, { Component } from 'react';
import { Text, View, Dimensions, StatusBar, Linking, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import NavigationBar from 'react-native-navbar';

var Button = require('../common/button');
var EventItem = require('../common/eventItem');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: this.props.user,
      navigator: this.props.navigator,
      groupEvents: []
    };
  },
  componentWillMount: function(){
    // Rails API call to get current user
    this.getGroupEvents();
  },
  render: function() { 
    var eventName = this.props.event;

    const rightButtonConfig = {
      title: 'Next',
      handler: () => alert('hello!'),
    };
    
    const leftButtonConfig = {
      title: 'Back',
      tintColor: 'rgba(255,255,255,.9)',
      handler: () => this.props.navigator.pop(),
    };

    const groupTitle = this.props.groupName;

    const titleConfig = {
        title: groupTitle,
        tintColor: 'rgba(255,255,255,.9)',
      };
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <StatusBar
            barStyle="default"
            style="default"
           />
          <NavigationBar
            tintColor='rgba(255,255,255,.1)'
            title={titleConfig}
            leftButton={leftButtonConfig} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.groupTitle}>Group: {this.props.groupName}</Text>
          <View style={styles.memberTitle}>
            <Text style={styles.title}>Members:</Text>
            <View style={styles.groupView}>{this.showGroupMembers()}</View>
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <Text style={styles.title}>Events:</Text>
          <View style={styles.scrollViewer}>
            <ScrollView>
              {this.showGroupEvents()}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  },
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  },
  showGroupMembers: function(){
    var groupMembers = this.props.groupMembers
    var fullName = 'full-name'
    return groupMembers.map(function(member, index) {
        return (
          <Text style={styles.groupMembers}>{Object.values(member[2])}</Text>
        );
    });
  },
  showGroupEvents: function () {
    var navigator = this.props.navigator
    var group = this.props.groupName
    var thisGroupsEvents = this.state.groupEvents
    return thisGroupsEvents.map(function(event, index) {
        return (
          <EventItem event={event} group={group} navigator={navigator} />
        );
    });
  },
  getGroupEvents: function() {
    var id = this.props.groupId
     fetch(`http://localhost:3000/groups/${id}/events`, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseData) =>
        this.setState({
          groupEvents: this.state.groupEvents.concat(responseData.data)
        })
      )
      .done();
  }
});

var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  title: {
    marginTop: 20,
    textAlign: 'left',
    fontSize: 24,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
  },
  groupTitle: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 32,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
  },
  nameContainer: {    
    flex: 1,
    padding: 5,
    marginTop: 20
  },  
  scrollContainer: {    
    flex: 2,
    padding: 5,
    marginTop: 20,
    marginBottom: 50
  },
  button: {
    width: width,
    flex: 7,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'center',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  navBar: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    margin: -20,
  },
  logo: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'Lobster 1.3',
    color: 'white',
    fontSize: 90,
    padding: 15,
  },
  logoText: {
    marginTop: 50,
    flex: 2,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  groupMembers: {
    fontFamily: 'Avenir-book',
    fontSize: 16,
    color: 'white',
  },
  groupView: {
    
  },
  scrollViewer: {
    flex: 3,
    width: width,
    marginLeft: -25
  },
  memberTitle: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',


  }
});






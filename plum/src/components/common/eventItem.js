import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Navigator, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconTwo from 'react-native-vector-icons/EvilIcons';

var EventItem = React.createClass({
  getInitialState: function(){
      // if (this.props.group) {
      return { 
        group: this.props.event.attributes.groupname,
        event: this.props.event.attributes.name,
        balance: 0,
        startDate: this.props.event.attributes['start-date'],
        endDate: this.props.event.attributes['end-date'],
      }
  },
  componentDidMount: function() {
    var name = this.props.userName
    this.props.event.relationships.members.data.map(function(member, index){
      var nameEqualTo = member[2]['full-name'];
      var theBalance = member[3].tentativebalance;
      if (nameEqualTo === name) {
          this.setState({
            balance: theBalance,
          })
        }
    }.bind(this))
  },
  render: function() {
    // userName = this.props.userName
    return (
        <View style={[styles.eventItem]}>
          <View>
            <Text style={styles.eventGroupName}>{this.state.group}</Text>
            <Text style={styles.eventName}>{this.state.event}</Text>
          </View>
          <TouchableHighlight
              underlayColor='rgba(255,255,255,0)'
              style={styles.arrowButton}
              onPress={this.onPress}
              >
            <View style={styles.arrowView}>
              <Icon name="chevron-right" size={40} color="white" />
            </View>
          </TouchableHighlight>
        </View>
    );
  },
  onPress: function(){
    this.props.navigator.push({
      name: 'eventShow',
      passProps: {
          user: this.props.user,
          eventId: this.props.event.id,
          eventBalance: this.state.balance,
          event: this.state.event,
          group: this.state.group,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
        }
      })
  }
});

var width = Dimensions.get('window').width; //full width

var styles = StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    marginBottom: 10,
    width: width,
    padding: 15,
    borderLeftColor: '#6AAAA0',
    borderLeftWidth: 5,
    backgroundColor: 'rgba(255,255,255,.1)'
  },
  eventGroupName: {
    fontFamily: 'Avenir-book',
    fontSize: 16,
    color: 'white'
  },
  eventName: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 24,
    color: 'white'
  },
  arrowButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -20,
    top: 4,
    width: 125,
    height: 85,
  },
  buttonText: {
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16,
  },
  payWithPayPal: {
    position: 'relative',
    top: 7,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    textAlign: 'center',
    fontSize: 18
  },
  invoicePrice: {
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    fontSize: 24,
  },
  arrowView: {
    flexDirection: 'row'
  }
});

module.exports = EventItem;


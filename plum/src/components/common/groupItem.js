import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

var GroupItem = React.createClass({
  render: function() {
    return (
        <View style={[styles.groupItem]}>
          <View>
            <Text style={styles.groupName}>{this.props.group.attributes.name}</Text>
            <View style={styles.members}>
              <Text style={styles.groupMembers}>Members: </Text>
              <Text style={styles.groupMembers}>{this.props.group.members}</Text>
              <TouchableHighlight
                underlayColor='rgba(255,255,255,0)'
                style={styles.arrowButton}
                onPress={this._onPressArrow}
                >
                <Text style={styles.arrow}><Icon name="chevron-right" size={40} color="white" /></Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
    );
  },

  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  },
  _onPressArrow: function() {
    // Call to PayPal goes here
    console.log('Go to group page')
  }
});

var width = Dimensions.get('window').width; //full width

var styles = StyleSheet.create({
  groupItem: {
    flexDirection: 'row',
    marginBottom: 10,
    width: width,
    padding: 15,
    borderLeftColor: '#6AAAA0',
    borderLeftWidth: 5,
    backgroundColor: 'rgba(255,255,255,.1)'
  },
  groupMembers: {
    fontFamily: 'Avenir-book',
    fontSize: 16,
    color: 'white'
  },
  groupName: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 24,
    color: 'white'
  },
  members: {
    width: width,
    flexDirection: 'row'
  },
  arrowButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    right: 35,
    top: -27,
  },
});

module.exports = GroupItem;

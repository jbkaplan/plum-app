import React, { Component, Prototypes } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableHighlight, 
  Dimensions, 
  View,
  DatePickerIOS,
  TouchableWithoutFeedback,
  TouchableOpacity,
  } from 'react-native';

var Button = require('../common/button');
var FloatingLabel = require('react-native-floating-labels');
var today = new Date();

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      startDate: today,
      endDate: today,
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  },
  getInitialState: function() {
    return {
      user: null,
      name: '',
      group: '',
      startDatePickerMode: 'hidden',
      endDatePickerMode: 'hidden',
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
      errorMessage: '',
    };
  },
  toggleStartDatePicker(){
    var mode = this.state.startDatePickerMode == 'hidden' ? 'visible' : 'hidden';
    this.setState( { startDatePickerMode: mode } );    
  },
  toggleEndDatePicker(){
    var mode = this.state.endDatePickerMode == 'hidden' ? 'visible' : 'hidden';
    this.setState( { endDatePickerMode: mode } );    
  },
  onStartDateChange: function(date) {
    this.setState({startDate: date});
  },
  onEndDateChange: function(date) {
    this.setState({endDate: date});
  },
  onTimezoneChange: function(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  },
  componentWillMount: function(){
    // Rails API call to get current user
  },
  render: function() {    
    var startDatePicker = (
      <View style={ styles.datePicker }>
        <TouchableOpacity onPress={ this.toggleStartDatePicker.bind(this) } style={{ padding: 5, alignItems: 'flex-end' }}>
          <Text>Done</Text>
        </TouchableOpacity>
        <DatePickerIOS
          date={this.state.startDate}
          mode="date"
          onDateChange={ this.onStartDateChange.bind(this) }
        />
      </View>
    );
    var endDatePicker = (
      <View style={ styles.datePicker }>
        <TouchableOpacity onPress={ this.toggleEndDatePicker.bind(this) } style={{ padding: 5, alignItems: 'flex-end' }}>
          <Text>Done</Text>
        </TouchableOpacity>
        <DatePickerIOS
          date={this.state.endDate}
          mode="date"
          onDateChange={ this.onEndDateChange.bind(this) }
        />
      </View>
    );
    return (
      <View style={[styles.container]}>     
        <View style={[styles.name]}>
          <Text style={styles.title}>New Event</Text>
        </View>
        <View style={[styles.item]}>
          <FloatingLabel 
            value={this.state.name}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingDescriptionInput}
            onChangeText={(text) => this.setState({name: text})}
            >Name</FloatingLabel>
          <FloatingLabel 
            value={this.state.group}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            onChangeText={(text) => this.setState({group: text})}
            >Group</FloatingLabel>
            <View style={styles.dateContainer}>
              <View style={{ marginTop: 10, marginBottom: -15 }}>
                <Text>Start Date</Text>
                <TouchableWithoutFeedback onPress={ this.toggleStartDatePicker.bind(this) }>
                  <View style={ styles.input }>
                    <Text>{ this.state.startDate.getMonth() + 1 }/{ this.state.startDate.getDate() }/{ this.state.startDate.getFullYear() }</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              { this.state.startDatePickerMode == 'visible' ? startDatePicker : <View/> }
            </View>
            <View style={styles.dateContainer}>
              <View style={{ marginTop: 10, marginBottom: -15 }}>
                <Text>End Date</Text>
                <TouchableWithoutFeedback onPress={ this.toggleEndDatePicker.bind(this) }>
                  <View style={ styles.input }>
                    <Text>{ this.state.endDate.getMonth() + 1 }/{ this.state.endDate.getDate() }/{ this.state.endDate.getFullYear() }</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              { this.state.endDatePickerMode == 'visible' ? endDatePicker : <View/> }
            </View>
            <TouchableHighlight
              underlayColor={'#619089'}
              style={ styles.addEventButton }
              onPress={this.onEventPress}
              >
              <Text style={styles.addEvent}>Add Event</Text>
            </TouchableHighlight>
        </View>
      </View>
    )
  },
  onEventPress: function() {
    // Rails api call to check user/password
    this.props.navigator.immediatelyResetRouteStack([{name: 'events'}]);
  },
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 4
    }
  },
});

var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5
  },
  items: {
    flex: 1,
  },
  floatingInput: {
    padding: 5,
    height: 40,
    borderWidth: 0,
    width: width - 30,
    alignSelf: 'center',
    color: 'black', 
  },
  floatingLabelInput: {
    color: 'black',
  },
  floatingFormInput: {
    borderBottomWidth: 1.5, 
    borderColor: '#619089',       
  },
  floatingDescriptionInput: {
    borderBottomWidth: 1.5, 
    borderColor: '#619089',       
  },
  addEventButton: {
    backgroundColor: '#6AAAA0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    padding: 5,
    marginTop: 10
  },
  addEvent: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 8,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    color: 'white',
    fontSize: 14
  },
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    height: 40, 
    padding: 5,
    justifyContent: 'center', 
    marginVertical: 10,
    borderColor: 'gray', 
    borderWidth: 1,
  },
  datePicker: {
    borderTopWidth: 1, 
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    left: 0,  
    height: 220, 
    borderColor: '#CCC', 
    backgroundColor: '#FFF',    
  },
  dateContainer: {
    padding: 5,
  }
});

var Heading = React.createClass({
  render: function() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
});

console.disableYellowBox = true






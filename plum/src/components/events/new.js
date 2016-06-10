import React, { Component, Prototypes } from 'react';
import { 
  StyleSheet, 
  AlertIOS,
  StatusBar,
  Text, 
  TextInput, 
  TouchableHighlight, 
  Dimensions, 
  View,
  DatePickerIOS,
  TouchableWithoutFeedback,
  TouchableOpacity,
  } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Entypo';

var Button = require('../common/button');
var FloatingLabel = require('react-native-floating-labels');
var today = new Date();
var alertMessage = 'Event Created'

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
      user: this.props.userId,
      name: '',
      group: '',
      newEvent: [],
      startDatePickerMode: 'hidden',
      endDatePickerMode: 'hidden',
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
      errorMessage: '',
    };
  },
  componentWillMount: function() {
    if (this.props.groupName) {
      this.setState({
        group: this.props.groupName
      })
    }
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

    const titleConfig = {
        title: 'New Event',
        tintColor: 'rgba(255,255,255,.9)',
      };

    var startDatePicker = (
      <View style={ styles.datePicker }>
        <TouchableOpacity onPress={ this.toggleStartDatePicker } style={{ padding: 5, alignItems: 'flex-end' }}>
          <Text>Done</Text>
        </TouchableOpacity>
        <DatePickerIOS
          date={this.state.startDate}
          mode="date"
          onDateChange={ this.onStartDateChange }
        />
      </View>
    );
    var endDatePicker = (
      <View style={ styles.datePicker }>
        <TouchableOpacity onPress={ this.toggleEndDatePicker } style={{ padding: 5, alignItems: 'flex-end' }}>
          <Text>Done</Text>
        </TouchableOpacity>
        <DatePickerIOS
          date={this.state.endDate}
          mode="date"
          onDateChange={ this.onEndDateChange }
        />
      </View>
    );
    return (
      <View style={[styles.container]}> 
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
                <Text style={styles.dateLabel}>Start Date</Text>
                <TouchableWithoutFeedback onPress={ this.toggleStartDatePicker }>
                  <View style={ styles.input }>
                    <Text style={styles.dateInput}>{ this.state.startDate.getMonth() + 1 }/{ this.state.startDate.getDate() }/{ this.state.startDate.getFullYear() }</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              { this.state.startDatePickerMode == 'visible' ? startDatePicker : <View/> }
            </View>
            <View style={styles.dateContainer}>
              <View style={{ marginTop: 10, marginBottom: -15 }}>
                <Text style={styles.dateLabel}>End Date</Text>
                <TouchableWithoutFeedback onPress={ this.toggleEndDatePicker }>
                  <View style={ styles.input }>
                    <Text style={styles.dateInput}>{ this.state.endDate.getMonth() + 1 }/{ this.state.endDate.getDate() }/{ this.state.endDate.getFullYear() }</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              { this.state.endDatePickerMode == 'visible' ? endDatePicker : <View/> }
            </View>
            <View style={styles.addEventButton}>
              <Button text={'Add Event'} onPress={this.onEventPress} />
            </View>
        </View>
      </View>
    )
  },
  onEventPress: function() {
    // Rails api call to check user/password
    this.setState({
      newEvent: this.state.newEvent.concat([{'name': this.state.name}]),
      group: '',
      name: '',
      startDate: new Date(),
      endDate: new Date(),
    });
    // AlertIOS.alert('Event:' + this.state.newEvent, alertMessage, [ {text: 'OK', onPress: () => console.log('OK Pressed!')},])
    var id = this.props.userId
    fetch(`http://plumpayments.herokuapp.com/users/${id}/events`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        group: this.state.group,
        start_date: this.state.startDate,
        end_date: this.state.endDate,
        user_id: this.props.userId
      })
    })
    .then((response) => response.json())
    .then((responseText) => {
      this.props.refreshEvents();
      this.props.navigator.pop()
    })
    .catch((error) => {
      console.log('here')
      this.setState({
        errorMessage: 'Not a valid event'
      })
    })
    // this.props.navigator.immediatelyResetRouteStack([{name: 'events'}]);
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
    padding: 15,
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Avenir-Heavy'
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
    paddingLeft: 20,
    height: 40,
    borderWidth: 0,
    width: width,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Avenir-Book' 
  },
  floatingLabelInput: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 18
  },
  floatingFormInput: {
    fontFamily: 'Avenir-Book',
    borderBottomWidth: 1.5, 
    borderColor: 'rgba(255,255,255,.1)',       
  },
  floatingDescriptionInput: {
    borderBottomWidth: 1.5, 
    borderColor: 'rgba(255,255,255,.1)',       
  },
  addEventButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 55
  },
  addEvent: {
    alignSelf: 'stretch',
    textAlign: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
    color: 'white',
    fontSize: 16
  },
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: 'white',
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
    backgroundColor: 'white',
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
    borderColor: 'white', 
    borderWidth: 1,
    color: 'white'
  },
  datePicker: {
    borderTopWidth: 1, 
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    left: 0,  
    height: 220, 
    borderColor: 'white', 
    backgroundColor: '#FFF',    
  },
  dateContainer: {
    padding: 5,
  },
  dateLabel: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
  },
  dateInput: {
    color: 'white',
    fontFamily: 'Avenir-Book',
  },
  navBar: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    width: width,
    margin: -15
  },
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






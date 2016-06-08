import React, { Component, Prototypes } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, Dimensions,  View, Platform, Image, TouchableOpacity, PixelRatio, NativeModules, StatusBar, requireNativeComponent, ScrollView } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/EvilIcons';

var Button = require('../../common/button');
var FloatingLabel = require('react-native-floating-labels');
var ImagePickerManager = require('NativeModules').ImagePickerManager;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      description: '',
      location: '',
      amount: '',
      errorMessage: '',
      pressStatus: false,
      photoSource: null,
    };
  },
  selectPhotoTapped() {
    const options = {
      title: 'Photo Picker',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      },
      allowsEditing: true
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        var source;
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }
        this.setState({
          photoSource: source
        });
      }
    });
  },
  componentWillMount: function(){
    // Rails API call to get current user
  },
  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  },
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  },
  render: function() {  
    const rightButtonConfig = {
      title: 'Next',
      handler: () => alert('hello!'),
    };

    const myIcon = (<Icon name="chevron-left" size={50} color="white" />)

    const leftButtonConfig = {
      title: 'Back',
      tintColor: 'rgba(255,255,255,.9)',
      handler: () => this.props.navigator.pop(),
    };
    const titleConfig = {
        title: 'Create Group',
      };  
    return (
      <View style={[styles.container]}> 
        <View style={styles.navBar}>
          <StatusBar
            barStyle="default"
            style="default"
           />
          <NavigationBar
            tintColor='rgba(255,255,255,.05)'
            leftButton={leftButtonConfig} />
        </View>   
        <View style={[styles.name]}>
          <Text style={styles.title}>New Expense</Text>
        </View>
        <View style={[styles.item]}>
          <FloatingLabel 
            value={this.state.description}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            onChangeText={(text) => this.setState({description: text})}
            >Description</FloatingLabel>
          <FloatingLabel 
            value={this.state.location}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            onChangeText={(text) => this.setState({location: text})}
            >Location</FloatingLabel>
          <FloatingLabel 
            value={this.state.amount}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            keyboardType={'numeric'}
            onChangeText={(text) => this.setState({amount: text})}
            >Amount</FloatingLabel>
            <TouchableHighlight
              underlayColor={'#619089'}
              style={ styles.addExpenseButton }
              onPress={this.onExpensePress}
              >
              <Text style={styles.addExpense}>Add Expense</Text>
            </TouchableHighlight>
        </View>
      </View>
    )
  },
  onExpensePress: function() {
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
    margin: 20,
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
    height: 40,
    borderWidth: 0,
    width: width - 30,
    alignSelf: 'center',
    color: 'white', 
  },
  floatingInput: {
    padding: 5,
    paddingLeft: 30,
    height: 40,
    borderWidth: 0,
    width: width,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'Avenir-Book' 
  },
  floatingLabelInput: {
    color: 'white',
    fontFamily: 'Avenir-Book'
  },
  floatingFormInput: {
    fontFamily: 'Avenir-Book',
    borderBottomWidth: 1.5, 
    borderColor: 'rgba(255, 255, 255, .1)',       
  },
  photoContainer: {
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -20,
  },
  photo: {
    width: width-100,
    height: 150
  },
  addExpenseButton: {
    backgroundColor: '#6AAAA0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    padding: 5,
    marginTop: 10,
    marginBottom: 44
  },
  addExpense: {
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
  navBar: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    margin: -20,
  }
});




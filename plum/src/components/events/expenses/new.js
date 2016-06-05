import React, { Component, Prototypes } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableHighlight, 
  Dimensions, 
  View,
  Platform,
  Image,
  TouchableOpacity,
  PixelRatio,
  NativeModules,
  requireNativeComponent,
  } from 'react-native';

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
    return (
      <View style={[styles.container]}>     
        <View style={[styles.name]}>
          <Text style={styles.title}>New Expense</Text>
        </View>
        <View style={styles.items}>
          <FloatingLabel 
            value={this.state.firstName}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingDescriptionInput}
            onChangeText={(text) => this.setState({firstName: text})}
            >Description</FloatingLabel>
          <FloatingLabel 
            value={this.state.location}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            onChangeText={(text) => this.setState({location: text})}
            >Location</FloatingLabel>
          <TouchableOpacity 
            value={this.state.photo}
            onPress={this.selectPhotoTapped}>
            <View style={[styles.photo, styles.photoContainer, {marginBottom: 20}]}>
            { this.state.photoSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.photo} source={this.state.photoSource} />
            }
            </View>
          </TouchableOpacity>
          <FloatingLabel 
            value={this.state.amount}
            labelStyle={styles.floatingLabelInput}
            inputStyle={styles.floatingInput}              
            style={styles.floatingFormInput}
            onChangeText={(text) => this.setState({amount: text})}
            >Amount</FloatingLabel>
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
  onExpensePress: function() {

  }
});

var width = Dimensions.get('window').width - 80;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5
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
    margin: 10,
    alignItems: 'stretch'
  },
  floatingInput: {
    padding: 5,
    height: 40,
    borderWidth: 0,
    width: width,
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
  photoContainer: {
    marginTop: 10,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -20,
  },
  photo: {
    width: 100,
    height: 100
  }
});





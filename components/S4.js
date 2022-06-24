import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';

class S4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        textTitle: '',
        textContent: '',
        keyTab: [],
        someCatTab: [],
        catTab: [],
        pickerValue: '',
      };
      //this.funGetCategory();
  }
  async saveItem(key, value){
    await SecureStore.setItemAsync(key, value);
  }
  
  async getItem(key){
    return await SecureStore.getItemAsync(key);
  }
  
  async deleteItem(key){
    await SecureStore.deleteItemAsync(key);
  }
  funGetCategory = async (newprops) => {
    let someCatTab = await this.getItem('allCat')
    someCatTab = JSON.parse(someCatTab)
    console.log('afdfadsfsd', someCatTab)
    let catTab = []
    for(let cat of someCatTab){
      category = await this.getItem(cat)
      category = JSON.parse(category)
      catTab.push(category)
    }
    this.setState({
      catTab: catTab, //tab with objects
      someCatTab: someCatTab, //tab with id
      textTitle: newprops.route.params.textTitle,
      textContent: newprops.route.params.textContent,
      pickerValue: newprops.route.params.category,
      idek: newprops.route.params.idek,
      randomColor: newprops.route.params.randomColor

    })
    console.log('catTab is a object tab',this.state.catTab)
    console.log('someCatTab is a tab with id',this.state.someCatTab) 
  }
  componentWillReceiveProps = async (newprops) => {
    this.funGetCategory(newprops)
  }
  funEditData = async () =>{
    const date = new Date()
    const note = {
      textTitle: this.state.textTitle,
      textContent: this.state.textContent,
      data: date.toLocaleDateString(),
      category: this.state.pickerValue,
      uniqid: this.state.idek,
      randomColor: this.state.randomColor
    }
    console.log('note',note)
    await this.saveItem(this.state.idek, JSON.stringify(note))
    this.props.navigation.jumpTo("notes")
  }

  render() {
    return (
      <View style={styles.viewww}>
        <View style={styles.center}>
          <TextInput
            style={styles.input}
            placeholder="Title..."
            value={this.state.textTitle}
            onChangeText={(textTitle) => this.setState({textTitle: textTitle})}
          />
        </View>
        <View style={styles.center}>
          <TextInput 
            style={styles.input}
            placeholder="Contents..."
            value={this.state.textContent}
            onChangeText={(textContent) => this.setState({textContent: textContent})}
          />
        </View>
        {/* <Text>{this.state.idek}</Text> */}
        <View style={styles.viewwPick}>
          <Picker            
            style={styles.picker}       
            selectedValue={this.state.pickerValue}
            onValueChange={(pickerValue) => this.setState({pickerValue: pickerValue})}
            >
            { this.state.someCatTab.map((value) => <Picker.Item key={ value } label={ value } value={ value } />) }

          </Picker>
        </View>
        <View style={styles.touchable}>
          <TouchableOpacity 
            onPress={
               this.funEditData
            }>
            <Text style={styles.touchableText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    viewwPick:{
      margin: 20
    },
    picker:{
      width: 350,
      alignSelf: 'center'
    },
    viewww:{
      flex: 1,
      backgroundColor: '#c6cbef'
    },
    input:{
      fontSize: 35,
    },
    center:{
      marginTop: 15,
      marginLeft: 60,
      marginRight: 60,
      borderBottomWidth: 1.5,
      borderBottomColor: '#1D82FA'
    },
    touchable:{
      marginTop: 10,
      alignSelf: 'center',    
    },
    touchableText:{
      fontSize: 32,
      color: 'gray'
    },
  })

export default S4;

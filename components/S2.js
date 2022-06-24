import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';

class S2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textTitle: '',
      textContent: '',
      keyTab: [],
      randomColor: ['#5F88E0', '#F8612A', 'teal'],
      someCatTab: [],
      catTab: [],
      pickerValue: '',
    };
    this.funGetCategory();
    this.props.navigation.addListener("focus", () => {this.funGetCategory()});
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
  setCategory = async () => {
    console.log('aaaq')
  }

  funGetCategory = async () => {
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
    })
    console.log('catTab is a object tab',this.state.catTab)
    console.log('someCatTab is a tab with id',this.state.someCatTab) 
  }

  funSaveSth = async () =>{
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    const date = new Date()
    let keyTab = await this.getItem('allKeys')
    keyTab = JSON.parse(keyTab)
    const note = {
      textTitle: this.state.textTitle,
      textContent: this.state.textContent,
      randomColor: this.state.randomColor[Math.floor(Math.random() * 3)],
      uniqid: uniqid,
      data: date.toLocaleDateString(),
      category: this.state.pickerValue,
    }
    if(!keyTab){
      keyTab = [uniqid]
    }else{
      keyTab.push(uniqid)
    }
    await this.saveItem(uniqid, JSON.stringify(note))
    await this.saveItem('allKeys', JSON.stringify(keyTab))
    console.log("uniqid",uniqid)
    console.log("JSON.stringify(note)",note)
    console.log("JSON.stringify(keyTab)",keyTab)
    this.props.navigation.jumpTo("notes");
    this.titleInput.clear()
    this.contentInput.clear()
  }

  render() {
    return (
      <View style={styles.viewww}>
        <View style={styles.center}>
          <TextInput
            style={styles.input}
            placeholder="Title..."
            ref={(arg)=>this.titleInput = arg}
            onChangeText={(textTitle) => this.setState({textTitle: textTitle})}
          />
        </View>
        <View style={styles.center}>
          <TextInput 
            style={styles.input}
            placeholder="Contents..."
            ref={(arg)=>this.contentInput = arg}
            onChangeText={(textContent) => this.setState({textContent: textContent})}
          />
        </View>
        <View style={styles.viewwPick}>
          <Picker            
            style={styles.picker}       
            selectedValue={this.state.pickerValue}
            onValueChange={(item) => this.setState({pickerValue: item})}
            >
            { this.state.someCatTab.map((value) => <Picker.Item key={ value } label={ value } value={ value } />) }

          </Picker>
        </View>
        <View style={styles.touchable}>
          <TouchableOpacity 
            onPress={
              this.funSaveSth
              
            }>
            <Text style={styles.touchableText}>ADD</Text>
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

export default S2;

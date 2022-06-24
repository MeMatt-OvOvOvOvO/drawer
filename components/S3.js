import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

class S3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textCategory: '',
      catTab: [],
    };
  }
  async saveItem(key, value){
    await SecureStore.setItemAsync(key, value);
  }
  
  async getItem(key){
    return await SecureStore.getItemAsync(key);
  }

  funSaveCat = async () => {
    let id = this.state.textCategory
    let catTab = await this.getItem('allCat')
    catTab = JSON.parse(catTab)
    const category = {
      textCategory: this.state.textCategory,
      id: id
    }
    if(!catTab){
      catTab = [id]
    }else{
      catTab.push(id)
    }
    await this.saveItem(id, JSON.stringify(category))
    await this.saveItem('allCat', JSON.stringify(catTab))
    console.log('id', id)
    console.log('S3', category)
    console.log('JSON.stringify(category)', category)
    console.log('JSON.stringify(catTab)', catTab)
    this.textCategory.clear()
    this.props.navigation.jumpTo("add note");
  }

  render() {
    return (
      <View style={styles.vieww1}>
        <View style={styles.center}>
          <TextInput 
            style={styles.input}
            placeholder="Category..."
            ref={(arg)=>this.textCategory = arg}
            onChangeText={(textCategory) => this.setState({textCategory: textCategory})}
          />
        </View>
        <View style={styles.touchable}>
          <TouchableOpacity onPress={
            this.funSaveCat 
          }>
            <Text style={styles.touchableText}>ADD CATEGORY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    input:{
      fontSize: 35,
    },
    vieww1:{
      flex: 1,
      backgroundColor: '#c6cbef',
    },
    center:{
      marginTop: 15,
      marginLeft: 60,
      marginRight: 60,
      borderBottomWidth: 1.5,
      borderBottomColor: '#1D82FA'
    },
    touchable:{
      marginTop: 30,
      alignSelf: 'center'
      
    },
    touchableText:{
      fontSize: 32,
      color: '#bdbebd'
    }
  })

export default S3;

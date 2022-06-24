import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

class S1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteTab: [],
      someKeyTab: [],
      inputText: '',
      filNotes: '',
      filtNotes: []
    };
    this.funGetData()
    this.props.navigation.addListener("focus", () => {this.funGetData()});
    this.filter()
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
  funGetData = async () =>{
    let someKeyTab = await this.getItem('allKeys')
    console.log(someKeyTab)
    someKeyTab = JSON.parse(someKeyTab)
    let noteTab = []
    for(let key of someKeyTab){
      note = await this.getItem(key)
      note = JSON.parse(note)
      noteTab.push(note)
    }
    this.setState({
      noteTab: noteTab,
      filtNotes: noteTab,
      someKeyTab: someKeyTab,
    })
    console.log('asdfas',noteTab)
  }
  deletePress = async (id) =>
    Alert.alert(
      "Delete it?",
      "You can't restore it!!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: async () => {
            let fil = this.state.someKeyTab.filter(key => key!=id)
            await this.saveItem('allKeys', JSON.stringify(fil))
            await this.deleteItem(id)
            this.funGetData()
          } 
        }
      ]
    );

    pressToEdit = async (id) => {
      console.log('pressed')
      //let getNoteData = async
      this.props.navigation.jumpTo("edit");
      
    }

    filter = async (text) => {
      const filtNotes = this.state.noteTab.filter((note)=>note.category.toLowerCase().includes(text.toLowerCase())||
      note.textContent.toLowerCase().includes(text.toLowerCase())||
      note.textTitle.toLowerCase().includes(text.toLowerCase()))
      this.setState({
        filtNotes
      })
      console.log(filtNotes)
    }


  render() {
    return (
      <View style={styles.view} drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <View style={styles.inputView}>
          <TextInput
          style={styles.input}
          defaultValue={this.props.inputText}
          placeholder='Szukaj notatki...'
          value={this.props.inputText}
          onChangeText={(text) => this.filter(text)}
          multiline={true} />
        </View>
        <View>
          <FlatList
            data={
              this.state.filtNotes
            }
            style={styles.flattt}
            keyExtractor={(item)=>item.uniqid}
            numColumns={2}
            renderItem={({ item }) => <View style={{...styles.shadow, shadowColor: item.randomColor}}>
              <TouchableOpacity onLongPress={()=>this.deletePress(item.uniqid)}

              onPress={()=> {this.props.navigation.jumpTo("edit", {textTitle: item.textTitle, textContent: item.textContent,
              idek: item.uniqid, category: item.category, randomColor: item.randomColor}, console.log(item.uniqid))}}




              style={{...styles.touchable, backgroundColor:item.randomColor}}>
              <View style={styles.catView}><Text style={{...styles.cat, color:item.randomColor}}>{item.category}</Text></View>
              <Text style={styles.data}>{item.data}</Text>
              <Text style={styles.title}>{item.textTitle}</Text>
              <Text style={styles.content}>{item.textContent}</Text>
              </TouchableOpacity></View>}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  shadow:{
    shadowOffset:{width:10, height:10},
    shadowOpacity: 0.9,
    shadowRadius: 10
  },
  inputView:{
    marginTop: 10,
    alignSelf: 'center'
  },
  input:{
    height: 35,
    width: 320,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    fontSize: 20
  },
  touchable:{
    height: 150,
    width: 150,
    alignItems: 'center',
    marginLeft: 25,
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  catView:{
    backgroundColor: 'black',
    height: 25,
    width: 65,
    marginTop: 4,
    marginLeft: -70,
    borderRadius: 10
  },
  view:{
    flex: 1,
    backgroundColor: '#c6cbef'
  },
  cat:{
    fontSize: 10,
    alignSelf: 'center',
    marginTop: 5.5
  },
  data:{
    marginTop: 4,
    marginRight: -65 
  },
  title:{
    marginTop: 8,
    fontSize: 22,
    width: '100%',
    marginLeft: 15,
    textAlign: 'left',
  },
  content:{
    width: '100%',
    marginLeft: 30,
    textAlign: 'left'
  },
})

export default S1;

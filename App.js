import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import S1 from './components/S1.js'
import S2 from './components/S2.js'
import S3 from './components/S3.js';
import S4 from './components/S4.js';
import imgDrawer from './components/drawer.png'
import imgPlus from './components/plus.png'
import imgInfo from './components/info.png'
import imgFirst from './components/first.png'
import imgKatPlus from './components/katPlus.png'
const Drawer = createDrawerNavigator()

export default function App() {
  function CustomDrawerContent(props) {
    const createTwoButtonAlert = () =>
    Alert.alert(
      "Info about App",
      "Version 2.0.0, MeMatt",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    return (
      <DrawerContentScrollView {...props}>
        <Image style={styles.center} source={imgFirst} />
        {/* <DrawerItemList {...props} /> */}
        <DrawerItem
          label="notes" options={{
            drawerActiveTintColor: 'teal'            
          }}
          icon={() => <Image source={imgDrawer } style={styles.img0} />}   
          onPress={() => props.navigation.navigate("notes")}     
        />
        <DrawerItem
          label="add note" options={{
            drawerActiveTintColor: 'teal'            
          }}
          icon={() => <Image source={imgPlus } style={styles.img1} />}   
          onPress={() => props.navigation.navigate("add note")}     
        />
        <DrawerItem
          label="add category" options={{
            drawerActiveTintColor: 'teal'            
          }}
          icon={() => <Image source={imgKatPlus } style={styles.img3} />}   
          onPress={() => props.navigation.navigate("add category")}     
        />
        <DrawerItem
                label="info"
                icon={() => <Image style={styles.infoImg} source={imgInfo} />}
                onPress={createTwoButtonAlert}
            />
        {/* <DrawerItem
          label="edit"
          icon={() => <Image />}
          onPress={() => props.navigation.navigate("edit")}
        /> */}
      </DrawerContentScrollView>
    );
  }
  
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 240,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
          
          <Drawer.Screen name="notes" component={S1} options={{
                drawerActiveTintColor: 'teal',
                drawerIcon: () => (
                  <Image source={imgDrawer } style={styles.img0} />
                )
                
            }}/>

          <Drawer.Screen name="add note" component={S2} options={{
                drawerActiveTintColor: 'teal',
                drawerIcon: () => (
                  <Image source={imgPlus } style={styles.img1} />
                )
                
            }}/>
          <Drawer.Screen name="add category" component={S3} options={{
                drawerActiveTintColor: 'teal',
                drawerIcon: () => (
                  <Image source={imgKatPlus } style={styles.img3} />
                )
                
            }}/>
          <Drawer.Screen name="edit" component={S4}/>
      </Drawer.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  color:{
    color: 'teal'
  },
  img0:{
    height: 40,
    width: 40
  },
  img1:{
    height: 35,
    width: 35,
    marginLeft: 1
  },
  img2:{
    height: 35,
    width: 35,
    marginLeft: 18,
    marginTop: 10
  },
  img3:{
    height: 36,
    width: 36,
    marginLeft: 0,
  },
  center:{
    alignSelf: 'center'
  },
  info:{
    color: 'gray',
    fontSize: 15
  },
  infoImg:{
    width: 35,
    height: 35,
  },
});

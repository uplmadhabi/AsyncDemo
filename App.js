

import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  

} from 'react-native';

import {AsyncStorage} from 'react-native';

var STORAGE_KEY = 'key_input' ;


const App = () => {

  const [input,setInput] = useState('');

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY,input )
      alert('successfully saved!!')
    } catch (e) {
      console.log("error:", e)
      alert('Unable to Save!!')
    }
  }

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
  
      if (value !== null) {
        setInput(value);
        alert(" Fetch data:"+value)
      }
    } catch (e) {
      alert('Failed to fetch the input ');
    }
  };

  useEffect(()=>{
    readData() 
  },[]
  )
  
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert(' successfully cleared!!');
    } catch (e) {
      alert('Failed!!');

    }
    const onChangeText = value => setInput(value);

const onSubmitEditing = () => {
  if (!input) return;

  saveData(input);
  setInput('');
};

  };

  return (
    <View style = {styles.container}>
      <View style= {styles.header}>
        <Text style ={styles.title}>AsyncStorage Demo</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.label}>INPUT</Text>
        <TextInput
          style={styles.inputField}
          value={input}
          placeholder="Enter"
          onChangeText={setInput}
        />
      <Text style={styles.text}>Input is {input}</Text>
        <Pressable onPress={saveData} style={styles.button}>

          <Text style={styles.buttonText}> Save</Text>
        </Pressable>
        <Pressable onPress={clearStorage} style={styles.button}>
          
          <Text style={styles.buttonText}>Clear Storage</Text>
        </Pressable>
    </View>
    </View>

    
    );
  };

 


const styles = StyleSheet.create({
  container:{
    flex:1
  },
 header:{
    width:'100%',
    paddingTop:40,
    paddingBottom:10,
    alignItems:'center'
 },
 title: {
  fontSize: 22,
  color: '#000000',
  fontWeight: 'bold',
},
panel: {
  paddingTop: 10,
  paddingHorizontal: 10,
},
label: {
  fontSize: 20,
},
text: {
  fontSize: 24,
  paddingTop: 10,
},
inputField: {
  backgroundColor: '#FFFFFF',
  height: 44,
  borderWidth: 1,
  borderColor: '#000000',
  width: '100%',
  padding: 10,
  marginTop: 12,
},
button: {
  margin: 10,
  padding: 10,
  backgroundColor: '#4682B4',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
},
buttonText: {
  fontSize: 18,
  color: '#000000',
},
});

export default App;

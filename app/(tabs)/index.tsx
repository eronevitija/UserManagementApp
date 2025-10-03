import { View, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';


export default function HomeScreen() {

  const router = useRouter();

  const listAllUsers = () => {
    router.push('/users')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management App</Text>
      <TouchableOpacity style={styles.btnContainer} onPress={listAllUsers}>
        <Text style={styles.btnText}>View All Users</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'

  },
  title:{
    fontSize:20,
    color:'#334443',
    fontWeight:'bold',
  },
  btnContainer:{
    backgroundColor:'#2F5755',
    padding:20,
    borderRadius:10,
    marginTop:10
  },
  btnText:{
    fontSize:16,
    color:'#fff',
    fontWeight:'bold'
  }
});

import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown:false,
        headerStyle:{backgroundColor: "#f5f5f5"},
        headerShadowVisible:false,
        tabBarActiveTintColor:'#af240fff',
        tabBarInactiveTintColor:'#666666',
        tabBarShowLabel:false,

       tabBarStyle:{
        backgroundColor:'#f5f5f5',
        // borderTopWidth:0,
        height:60,
       },

       tabBarLabelStyle:{
        fontSize:12,
       },

       tabBarItemStyle:{
        marginTop:8
       }
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
            name='home-outline' 
            size={size} 
            color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="addUser"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
            name='person-add-outline' 
            size={size} 
            color={color}/>
          )
        }}
      />
   
    </Tabs>
  );
}

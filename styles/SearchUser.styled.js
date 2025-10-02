import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container:{
        paddingTop:20,
        paddingHorizontal:16,
      },
      searchContainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#f0f0f0',
        paddingHorizontal:10,
        borderRadius:10
      },
      searchInput:{
       flex:1,
       fontSize:16,
       height:44,
       paddingLeft:20,
       borderWidth:0,
       color:'#000' 
      },
      searchIcon:{
        color:'#333'
      }
})

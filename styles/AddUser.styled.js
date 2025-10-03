import { StyleSheet } from "react-native"

export default StyleSheet.create({
    userInfo:{
        flex:1,
        paddingHorizontal:16,
        justifyContent:'center',
        backgroundColor:'#f2e9e9cc',      
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        color:'#333',
        marginBottom:10,
        textAlign:'center'
    },
    textInput:{
        borderWidth:1,
        borderColor:'#ccc',
        padding:20,
        marginVertical:5,
        borderRadius:8,
        backgroundColor:'#fff',
        fontSize:16,
        color:'#333'
    },
    addBtn:{
        marginTop:10,
        borderRadius:10,

    },
    errorTxt:{
        color:'#DD0303',
        fontSize:12,
        textAlign:'center',
        marginBottom:8,
  }
});
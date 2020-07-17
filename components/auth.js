import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect}from 'react';
import { StyleSheet, Text, View, Button,TextInput,AsyncStorage,TouchableOpacity } from 'react-native';
import { Icon} from 'react-native-elements';
import MovieList from './list';



export default function Auth(props) {

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [registerView,setRegisterView]=useState(false);


    useEffect(()=>{

      getToken(); // check if user have already login redirect to to home page

    },[])//[] indicate that it will render only once

    const auth =()=>{

      if(registerView){

        fetch(`http://ec2-52-201-177-168.compute-1.amazonaws.com/users/`,{
            method:'POST',
            headers:{
           
            'Content-Type': 'application/json',
              },
             body: JSON.stringify({ username:username, password:password})
     
             })
              .then(res=>res.json())
             .then(res=>{
              setRegisterView(false);
            })
            .catch(error=>console.log(error));


          

      }else{
        fetch(`http://ec2-52-201-177-168.compute-1.amazonaws.com/auth/`,{
            method:'POST',
            headers:{
           
            'Content-Type': 'application/json',
              },
             body: JSON.stringify({ username:username, password:password})
     
             })
              .then(res=>res.json())
             .then(res=>{
              saveToken(res.token);
              props.navigation.navigate("MovieList")
            })
            .catch(error=>console.log(error));


          }

      
        };  
            

const saveToken=async(token)=>{
  await AsyncStorage.setItem('MR_Token',token)
           
  }
        
    
 const getToken=async()=>{
   const token = await AsyncStorage.getItem('MR_Token');
   if(token)props.navigation.navigate("MovieList")

 }

const toggleView = ()=>{
  setRegisterView(!registerView);
}    

    
 
  return (
    <View  style={styles.container}>
  
       <Text style={styles.label}>User Name: </Text>
       <TextInput 
        style={styles.input}
        placeholder="Username"
        onChangeText={(text)=>setUsername(text)}
        value={username}
        autoCapitalize={'none'}

       />
      

<Text style={styles.label}>Password:</Text>
       <TextInput 
        style={styles.input}
        placeholder="Password"
        onChangeText={(text)=>setPassword(text)}
        value={password}
        secureTextEntry={true}
        autoCapitalize={'none'}

       />

       
       
       <Button  onPress={()=>auth()}title={registerView ? "Register":"Login"}/>
       <TouchableOpacity onPress={() => toggleView()}>
       {registerView ?  <Text style={styles.viewText}>Already have and account? Login.</Text>:
       <Text style={styles.viewText}>Don't have an account? Register here.</Text>}

      

       </TouchableOpacity>
    </View>
  );
  } 

//Navigation bar
Auth.navigationOptions = screenProps=>({
    title:"Login", 
    headerStyle:{
      backgroundColor:'orange',
    },
    headerTinColor:'#fff',
    headerTitleStyle:{
      fontWeight:'bold',
      fontSize:24
    },

  
  
   
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    paddingBottom:150

  },
  viewText:{
    fontSize:24,
    color:'white',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:30,

  },

  label:{
    fontSize:24,
    color:'white',

   
  },
    
  
    numrating:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',

    },
    input:{
        fontSize:24,
        margin:10,
        backgroundColor:'white'

    }
    
});

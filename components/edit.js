import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect}from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import { Icon} from 'react-native-elements';


export default function Edit(props) {
    const getMovie=props.navigation.getParam('movie',null)

    
    const [title,setTitle]=useState(getMovie.title)
    const [description,setDescription]=useState(getMovie.description)
    const saveMovie =()=>{
        if(getMovie.id){
             fetch(`http://ec2-52-201-177-168.compute-1.amazonaws.com/movie/${getMovie.id}/`,{
            method:'PUT',
            headers:{
            'Authorization':`Token ${getMovie}`,//get token
            'Content-Type': 'application/json',
              },
             body: JSON.stringify({ title:title, description:description})
     
             })
              .then(res=>res.json())
             .then(movie=>{
              props.navigation.navigate("Detail",{movie:movie, title:movie.title})
            })
            .catch(error=>console.log(error));

            }else{

              fetch(`http://ec2-52-201-177-168.compute-1.amazonaws.com/movie/`,{
              method:'POST',
              headers:{
              'Authorization':`Token ${getMovie}`,//get token
              'Content-Type': 'application/json',
              },
                body: JSON.stringify({ title:title, description:description})
     
              })
              .then(res=>res.json())
                .then(movie=>{
                props.navigation.navigate("MovieList", {title:'title'})
              })
              .catch(error=>console.log(error));

            }
        
    
 
};

    

    
 
  return (
    <View  style={styles.container}>
  
       <Text style={styles.label}>Title </Text>
       <TextInput 
        style={styles.input}
        placeholder="Title"
        onChangeText={(text)=>setTitle(text)}
        value={title}

       />
      

<Text style={styles.label}>Description</Text>
       <TextInput 
        style={styles.input}
        placeholder="Description"
        onChangeText={(text)=>setDescription(text)}
        value={description}

       />

       
       
       <Button  onPress={()=>saveMovie()}title={getMovie.id? "Edit":"Add" }/>
    </View>
  );
} 
//Navigation bar
Edit.navigationOptions = screenProps=>({
    title:screenProps.navigation.getParam('title'), 
    headerStyle:{
      backgroundColor:'orange',
    },
    headerTinColor:'#fff',
    headerTitleStyle:{
      fontWeight:'bold',
      fontSize:24
    },

    headerRight: () => (<Button title="Delete" 
      onPress={()=>deleteClicked(screenProps)}

    />)
   
   
})

const deleteClicked=(props)=>{
  const movie =props.navigation.getParam("movie")
  fetch(`http://ec2-52-201-177-168.compute-1.amazonaws.com/movie/${movie.id}/`,{
            method:'DELETE',
            headers:{
            'Authorization':`Token ${getMovie}`,//get token
            'Content-Type': 'application/json',
              },
        
     
             })
             
             .then(res=>{
              props.navigation.navigate("MovieList")
            })
            .catch(error=>console.log(error));


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    paddingBottom:150

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

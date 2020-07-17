import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect}from 'react';
import { StyleSheet, Text, View,FlatList,Image, Button,AsyncStorage} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MovieList(props) {
  const [movies,setMovies] = useState([])
  let token =null;

  const getToken = async() =>{
   token = await  AsyncStorage.getItem("MR_Token");
   if(token){
    getMovies();
   }else{
    props.navigation.navigate("Auth");
   }
  };
  useEffect(()=>{
    getToken();

  },[]);

  const getMovies =()=> {
    fetch(`http://ec2-52-201-177-168.compute-1.amazonaws.com/movie/`,{
      method:'Get',
      headers:{
        'Authorization': `Token ${token}`
       
      }
    })
    .then(res=>res.json())
    .then(jsonRes=>setMovies(jsonRes))
    .catch(error=>console.log(error));
    //[], i remove that from above
  }

  
  const movieclicked = (movie) => {
    props.navigation.navigate("Detail",{movie:movie, title:movie.title, token})
  }
  

  return (
    <View style={styles.imcolor}>
    <Image source={require('../assets/favicon.png')}
     style={{width:'100%',height:135, paddingTop:50}}
     resizeMode="contain"
    />

       <FlatList
          data={movies}
          renderItem={({item})=> (
            <TouchableOpacity onPress={()=> movieclicked(item)}>

            <View style={styles.item}>

               <Text style={styles.itemText}> {item.title}</Text>
            </View>
            </TouchableOpacity>
           
          ) 
      }
      keyExtractor={(item,index)=>index.toString()}

      />  

      <StatusBar style="auto" />
    </View>
  );
} 

//Navigation bar
MovieList.navigationOptions = screenProps=>({
  title:"List of Movies", 
  headerStyle:{
    backgroundColor:'orange',
  },
  headerTinColor:'#fff',
  headerTitleStyle:{
    fontWeight:'bold',
    fontSize:24
  },
 
  headerRight: () => (<Button title="Add New" 
    onPress={()=>screenProps.navigation.navigate("Edit",{movie:{title:'',description:''}})}

  />)
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    flex:1,
    padding:10,
    height:50,
    backgroundColor:'#282C25'

  },
  imcolor:{
    backgroundColor:'orange'
  },
    itemText:{
      flex:1,
      color:'#fff',
      fontSize:24

    }
});

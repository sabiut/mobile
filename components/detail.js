import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect}from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Icon} from 'react-native-elements';

export default function Detail(props) {
    const getMovie=props.navigation.getParam('movie',null)
    const getToken=props.navigation.getParam('token','')
    const[highlight,setHighlight]=useState(0)

    const rateClicked = () => {
      if(highlight > 0 && highlight < 6 ){
        fetch(`http://ec2-52-201-177-168.compute-1.amazonaws.com/movie/${getMovie.id}/rate_movie/`,{
        method:'POST',
        headers:{
        'Authorization':`Token ${getToken}`,
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({ starts: highlight})
     
    })
    .then(res=>res.json())
    .then(res=>{
      setHighlight(0);
        Alert.alert("Reating", res.message);
    })
     .catch(error=>Alert.alert('error',error));

      }
    }
 
  return (
    <View  style={styles.container}>
  
    <View style={styles.starContainer}>
    <Icon iconStyle={getMovie.average_rating > 0 ? styles.orange : styles.white} name='star' /> 
    <Icon iconStyle={getMovie.average_rating > 1 ? styles.orange : styles.white} name='star' /> 
    <Icon iconStyle={getMovie.average_rating > 2 ? styles.orange : styles.white} name='star' /> 
    <Icon iconStyle={getMovie.average_rating > 3 ? styles.orange : styles.white} name='star' /> 
    <Icon iconStyle={getMovie.average_rating > 4 ? styles.orange : styles.white} name='star' /> 
    <Text style={styles.numrating}>({getMovie.rating})</Text>
    </View>
    <Text style={styles.description}>{getMovie.description}</Text>
    
    <View style={{borderBottomColor:'white', borderBottomWidth:2}}/>
    <Text style={styles.description}>Rrate it</Text>
    
    <View style={styles.starContainer}>
    <Icon iconStyle={highlight > 0 ? styles.purple : styles.grey} name='star' onPress={()=>setHighlight(1)}/> 
    <Icon iconStyle={highlight > 1 ? styles.purple : styles.grey} name='star' onPress={()=>setHighlight(2)}/> 
    <Icon iconStyle={highlight> 2 ? styles.purple : styles.grey} name='star' onPress={()=>setHighlight(3)}/> 
    <Icon iconStyle={highlight> 3 ? styles.purple : styles.grey} name='star' onPress={()=>setHighlight(4)}/> 
    <Icon iconStyle={highlight > 4 ? styles.purple : styles.grey} name='star' onPress={()=>setHighlight(5)}/> 

      </View>

      <Button title="Rate" onPress={()=>rateClicked()}/>

      </View>
    
    
    
    
  );
} 
//Navigation bar
Detail.navigationOptions = screenProps=>({
    title:screenProps.navigation.getParam('title'), 
    headerStyle:{
      backgroundColor:'orange',
    },
    headerTinColor:'#fff',
    headerTitleStyle:{
      fontWeight:'bold',
      fontSize:24
    },
   
    headerRight: () => (<Button title="Edit" 
      onPress={()=>screenProps.navigation.navigate("Edit",{movie:screenProps.navigation.getParam("movie")})}

    />)
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

  description:{
    fontSize:20,
    color:'white',
    
    
  },

  item:{
    flex:1,
    padding:10,
    height:50,
    backgroundColor:'#282C25'

  },
    itemText:{
      flex:1,
      color:'#fff',
      fontSize:24

    },
    starContainer:{
        alignContent:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    orange:{
        color:'orange',
    },
    white:{
        color:'white',
    },
    purple:{
      color:'purple',
  },
   grey:{
      color:'grey',
  },
    numrating:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',

    }
});

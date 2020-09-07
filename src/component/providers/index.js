import React,{useState} from 'react';
import {AppContext} from '../context/appContext';

 export default function Provider(props){
   const [state,setState] = useState({
     userName:null,userNumber:null,logedUserKey:null,conversationId:null
   });
  return (
    <AppContext.Provider value={{
      data:state,
      updateState:(name,value)=>{
        setState({...state,[name]:value});
      }
    }}>
      {props.children}
    </AppContext.Provider>
  )
 }
import React,{useState} from 'react';
import {AppContext} from '../context/appContext';

 export default function Provider(props){
   const [state,setState] = useState({
     userName:null,userNumber:null,logedUserKey:null,conversationId:null
   });
  return (
    <AppContext.Provider value={{
      data:state,
      updateState:(data)=>{
        setState({...state,...data});
      }
    }}>
      {props.children}
    </AppContext.Provider>
  )
 }
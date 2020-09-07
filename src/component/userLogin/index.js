import React , { useState,useEffect, useContext }from 'react';
import TextField from '@material-ui/core/TextField';
import './style.css';
import Button from '@material-ui/core/Button';
import { Link,Redirect } from 'react-router-dom';
import firebase from '../../services/firebase'
import DBService from '../../services/db.services';
import {AppContext} from '../context/appContext';
import {setSessionCookie,getSessionCookie} from '../../services/cookie.service';

function UserLogin () {
  const [loading,setLoading] = useState(false); 
  const context = useContext(AppContext);
  useEffect(()=>{
    console.log("context",context);
  },[context.data.userName,context.data.userNumber,context.data.logedUserKey]);
  
  const handleSubmit = async () => {
    const re = /^[0-9\b]+$/;
    let userKey;
    if(!context.data.userName){
      alert("Please Enter Name");
      return;
    }
    if(!context.data.userNumber || !re.test(context.data.userNumber) || context.data.userNumber.length!=10){
      alert("Please Enter Valid Mobile Number");
      return;
    }
    setLoading(true);
      let isexists = await DBService.isUserAlreadyExists(context.data.userNumber);
      if(isexists === ''){
        let newUser={name:context.data.userName,mobNo:context.data.userNumber}
        DBService.addNewUser(newUser)
        .then(async res => {
          userKey = (res!=='') ? res:null;
         await context.updateState('logedUserKey',userKey);
          setSessionCookie("userName",context.data.userName);
          setSessionCookie("logedUserKey",userKey);
        })
      }else{
        console.log("User is already there");
        userKey = isexists;
        await context.updateState('logedUserKey',userKey);
        setSessionCookie("userName",context.data.userName);
        setSessionCookie("logedUserKey",userKey);
      }
      setLoading(false);
  }

  if (loading) {
    return <h4>Logging in...</h4>;
  }

return (
  <AppContext.Consumer>
    {
      context =>  (
        <div className="wrapper">
          <div className="main_header">
            Chat Application
          </div>
          <div className="user_name">
          <div style={{alignSelf: 'center',marginBottom: '15px'}}>
            <TextField
              label="Enter Name"
              margin="dense"
              variant="outlined"
              value={context.data.userName}
              onChange={(e)=>{context.updateState('userName',e.target.value)}}
            />
          </div>
         <div style={{alignSelf: 'center',marginBottom: '15px'}}>
          <TextField
            label="Enter Number"
            margin="dense"
            variant="outlined"
            value={context.data.userNumber}
            onChange={(e)=>{context.updateState('userNumber',e.target.value)}}
          />
          </div>
        {
        <div className="submit">
          <Button onClick={()=>handleSubmit()} variant="contained" style={{backgroundColor:'#6766FF',color:'white',borderRadius:'5px'}}>Start Chatting</Button>
          {
            (context.data.userName && context.data.userNumber) && context.data.logedUserKey ?
            <Redirect to={{
              pathname: '/userlist',
              state: { key: context.data.logedUserKey ,username: context.data.userName}
          }} /> : null
          }
        </div>
        }
        </div>
      </div>
      )
    }
  
  </AppContext.Consumer>
);
}

export default UserLogin;
import React , { useState,useEffect }from 'react';
import TextField from '@material-ui/core/TextField';
import './style.css';
import Button from '@material-ui/core/Button';
import { Link,Redirect } from 'react-router-dom';
import firebase from '../../services/firebase'
import DBService from '../../services/db.services';

function UserLogin () {
  const [userName,setName] = useState("");
  const [userNumber,setNumber] = useState("");
  const [userKey,setUserKey] = useState("");
  const databaseRef = firebase.database().ref("MyChatApp");

  useEffect(()=>{
 
  },[userName,userNumber,userKey])

  const handleSubmit = async () => {
    let userKey;
    if(!userName){
      alert("Please Enter Name");
    }
    if(!userNumber){
      alert("Please Enter Number");
    }
    if(userName && userNumber){
      let isexists = await DBService.isUserAlreadyExists(userName);
      if(isexists === ''){
        let newUser={name:userName,mobNo:userNumber}
        DBService.addNewUser(newUser)
        .then(res => {
          userKey = (res!='') ? res:null;
          setUserKey(userKey);
        })
      }else{
        userKey = isexists;
        await setUserKey(userKey);
      }
    }
  }

return (
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
        value={userName}
        onChange={(e)=>setName(e.target.value)}
      />
      </div>
      <div style={{alignSelf: 'center',marginBottom: '15px'}}>
        <TextField
          label="Enter Number"
          margin="dense"
          variant="outlined"
          value={userNumber}
          onChange={(e)=>setNumber(e.target.value)}
        />
      </div>
      <div className="submit">
        {/* <Link to={{ pathname: linktoChatList ? '/userchat' : '/hello' ,}} state={{key:userKey}} style={{ textDecoration: 'none' }}>
         <Button onClick={handleSubmit} variant="contained" color="secondary">Start Chatting</Button>
        </Link> */}

        <Button onClick={handleSubmit} variant="contained" style={{backgroundColor:'#6766FF',color:'white',borderRadius:'5px'}}>Start Chatting</Button>
        {
          (userName && userNumber) && userKey ?
          <Redirect to={{
            pathname: '/userlist',
            state: { key: userKey ,username: userName}
        }} /> : null
        }
       

      </div>
    </div>
  </div>
);
}

export default UserLogin;
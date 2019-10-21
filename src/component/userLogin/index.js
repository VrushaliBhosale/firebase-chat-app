import React , { useState,useEffect }from 'react';
import TextField from '@material-ui/core/TextField';
import './style.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import firebase from '../../services/firebase'

function UserLogin () {
  const [userName,setName] = useState("");
  const [userNumber,setNumber] = useState("");
  const databaseRef=firebase.database().ref("MyChatApp");

  useEffect(()=>{
   
  },[userName,userNumber])

  const handleSubmit = () => {
    if(!userName){
      alert("Please Enter Name");
    }
    if(!userNumber){
      alert("Please Enter Number");
    }
    if(userName && userNumber){
      console.log("connnected");
      databaseRef.child('Users').push({
         name:userName,
         mobNo:userNumber
      })
      console.log("saved to firebase.");
    }
   
    // databaseRef.child('users')
    // .once("value", snapshot => {
      // snapshot.child("Users").
      // if(!snapshot.child('u1').val()){
      //   databaseRef.child('/users').update({'name':userName},{'number':userNumber});
      // }
      // else {
      //   databaseRef.child('/users').update({'name':userName},{'number':userNumber})
      // } 
    //   console.log("firebase connected",snapshot);
    // })
  }

return (
  <div className="wrapper">
    <div className="main_header">
      <div>Chat Application</div> 
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
        <Link to={ userName && userNumber ? '/chat' : '/'} style={{ textDecoration: 'none' }}>
         <Button onClick={handleSubmit} variant="contained" color="secondary">Start Chatting</Button>
        </Link>
      </div>
    </div>
  </div>
);
}

export default UserLogin;
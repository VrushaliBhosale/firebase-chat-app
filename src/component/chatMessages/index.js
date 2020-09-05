import React, { useState, useEffect, useContext }from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField';
import firebase from '../../services/firebase'
import { Redirect } from 'react-router';
import DBService from '../../services/db.services';
import { AppContext } from '../context/appContext';
import { makeStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    input: {
      color: "white"
    }
  },
}));
function ChatMessages (props) {
  const [msg,setMessages]=useState('');
  const databaseRef = firebase.database().ref("MyChatApp");
  const [redirect,setRedireact] = useState(false);
  const [messages,setAllmessages] = useState([]);
  let ref = databaseRef.child('Conversations').child(props.location.state.cId).child('Messages');
  const context = useContext(AppContext);

  const sendMessage = async(e) => {
    if(e.key === 'Enter' && msg !== ""){
      await ref.child(Date.now()).set({
        sender:context.data.userName,
        message:msg,
        time:Date.now()
      })
      setMessages('');
    }
   //await DBService.savemessages(msg,props.location.state.cId,props.location.state.key);
  }
 
  const redirectToList = () => {
    setRedireact(true);
  }

 useEffect(() => {
  console.log("App context is :",context);
  const handleNewMessages = snap => {
    if (snap.val()) {
      // let messages = snap.val();
      // console.log("new msg :",Object.keys(snap.val()).length);
      // if(Object.keys(messages).length === Object.keys(snap.val()).length){
      //   console.log("they are same .")
      // }else{
      //   console.log("they are different .")
      // }
      setAllmessages(snap.val()); 
    }
  }
  ref.on('value', handleNewMessages);
  return () => {
   ref.off('value', handleNewMessages);
   };
  });
  const classes = useStyles();
return (
  <AppContext.Consumer>
    {
      context => (
        <div style={{border:'1px solid'}} className="wrapper">
          <div className="header">
            <div style={{marginTop: '4px', cursor:'pointer'}} onClick={redirectToList}>
            <i class="material-icons">
            arrow_back_ios
            </i>
            </div>
            <div>{props.location.state.selectedUser}</div>
          </div>
        <div className="card_wrapper">
            <div className='chat-area'>
              {
                Object.keys(messages).map(msg => {
                  return(
                    <div className={messages[msg]["sender"] === context.data.logedUserKey ? "sent-msg" : "received-msg"}>
                      {messages[msg]["message"]}
                    </div>) 
                })  
              }
            </div>
          <div className="text_button_wrapper">
          <Input 
            defaultValue="" 
            inputProps={{ 'aria-label': 'description' }} 
            style={{color:'white',width:'80%'}} 
            value={msg}
            onChange={(e)=>setMessages(e.target.value)}
            onKeyDown={sendMessage}
          />

            {/* <TextField
              id="standard-full-width"
              value={msg}
              onChange={(e)=>setMessages(e.target.value)}
              style={{width:'80%',color:'white'}}
              onKeyDown={sendMessage}
              InputProps={{
                classes: {
                    input: classes.input
                }
            }}
              />   */}
            {/* <i className="material-icons" onClick={sendMessage}>
              send
            </i> */}
          </div>
        </div>
        {
          redirect ?
          <Redirect to={{
            pathname:'/userlist',
            // state:{key:context.data.logedUserKey}
          }}/>
          : null
        }
    </div>
      )
    }
  </AppContext.Consumer>
);
}

export default ChatMessages;
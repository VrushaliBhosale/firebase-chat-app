import React, { useState, useEffect }from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField';
import firebase from '../../services/firebase'
import { Redirect } from 'react-router';
import DBService from '../../services/db.services';

function ChatMessages (props) {
  const [msg,setMessages]=useState('');
  const databaseRef = firebase.database().ref("MyChatApp");
  const [redirect,setRedireact] = useState(false);
  const [messages,setAllmessages] = useState([]);
  let ref = databaseRef.child('Conversations').child(props.location.state.cId).child('Messages');

  const sendMessage = async() => {
   //await DBService.savemessages(msg,props.location.state.cId,props.location.state.key);
   await ref.child(Date.now()).set({
    sender:props.location.state.key,
    message:msg,
    time:Date.now()
  })
  }
 
  const redirectToList = () => {
    setRedireact(true);
  }

 useEffect(() => {
  const handleNewMessages = snap => {
    if (snap.val()) {
      let messages = snap.val();
      setAllmessages(messages);
    }
  }
  ref.on('value', handleNewMessages);
  return () => {
   ref.off('value', handleNewMessages);
   };
  });

return (
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
            <div>
                {
                  Object.keys(messages).map(msg => {
                    return(
                      <div className={messages[msg]["sender"] === props.location.state.key ? "sent-msg" : "received-msg"}>
                        {messages[msg]["message"]}
                      </div>) 
                  })  
                }
            </div>
          }
        </div>
    <div className="text_button_wrapper">
      <TextField
        id="standard-full-width"
        value={msg}
        onChange={(e)=>setMessages(e.target.value)}
        style={{width:'80%'}}
        />  
      <i className="material-icons" onClick={sendMessage}>
        send
      </i>
    </div>
  </div>
  {
    redirect ?
    <Redirect to={{
      pathname:'/userlist',
      state:{key:props.location.state.key}
    }}/>
    : null
  }
  </div>
);
}

export default ChatMessages;
import React, { useState, useEffect }from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField';
import firebase from '../../services/firebase'
import { Redirect } from 'react-router';
import DBService from '../../services/db.services';

function ChatMessages (props) {
  const [msg,setMessages]=useState('');
  const databaseRef = firebase.database().ref("MychatApp");
  const [redirect,setRedireact]=useState(false);
  // const [messages,setMessagesArray]=useState([]);
  const [messages,setAllmessages]=useState([]);

  const sendMessage = async() => {
   console.log("msg :",msg);
   await DBService.savemessages(msg,props.location.state.cId,props.location.state.key);
   let conversationid = props.location.state.cId;
   DBService.getLastAddedMsg(conversationid).then(messages=>{
     setAllmessages(messages);
     console.log(messages);
   });
  }
 
  const redirectToList = () => {
    setRedireact(true);
  }

 useEffect(() => {
   DBService.getAllConversationMsg(props.location.state.cId).then(messages=>{
     setAllmessages(messages);
     console.log(messages);
   });
  },[]);

return (
  <div style={{border:'1px solid'}} className="wrapper">
    <div className="header">
      <div style={{marginTop: '4px', cursor:'pointer'}} onClick={redirectToList}>
      <i class="material-icons">
      arrow_back_ios
      </i>
      </div>
      <div>Chat Application</div>
    </div>
  <div className="card_wrapper">
    {/* <textarea 
      style={{
        height: 'calc(100vh - 2px - 28vh )',
        backgroundColor:'#F6F6F8',
        width:'97%',
        fontSize: '15px',
        padding: '5px'
      }} 
      value={msg} 
      readOnly
    >
      </textarea> */}
      <div className='chat-area'>
          {
            <div>
                {
                  messages.map(msg => {
                    
                    return(
                      <div className={msg.sender === props.location.state.key ? "sent-msg" : "received-msg"}>
                        {msg.message}
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
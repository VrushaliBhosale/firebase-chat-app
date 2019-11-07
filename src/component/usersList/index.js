/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import './style.css';
import firebase from '../../services/firebase'
import { Redirect } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';
import DBService from '../../services/db.services';
let selectedUser;
function UsersList (props) {

  const databaseRef=firebase.database().ref("MyChatApp");
  const [list,updateList] = useState([]);
  const [chatwith,setchatuser ]= useState('');
  const [conversationID,setConversationId] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [menu, setMenu] = React.useState(false);

  const redirectToChat = async(chatwith,name) => { 
    if(name) selectedUser = name;
    console.log("key :",chatwith);
    setchatuser(chatwith);
    let conversationID = await DBService.setConversation(props.location.state.key,chatwith);
    setConversationId(conversationID);
    console.log("cid in list:",conversationID);
    setRedirect(true);
  }

  useEffect( () => {
    databaseRef.child('Users')
    .once('value',(snapshot) => {
      let list=[];
      snapshot.forEach(snap=>{
        list.push({name:snap.val().name,mobno:snap.val().mobNo,id:snap.key});  
      })
      updateList(list);
      console.log(list);
    })
  },[])
     
  const openProfileMenu = () => {
    setMenu(true);
   
  }

  const handleClose = () => {
    setMenu(false);
    setOpen(true);
   

  };

return (
  <div className="chatListWrapper wrapper">
    <div className="chatListHeader">
    <div  >Chat Application</div>
    <div className="loginUser" onClick={openProfileMenu}>{props.location.state.username}</div>
    </div>
      {
        list ?
        list.map((data,index) => {
            return(
              <div key={index} onClick={()=>redirectToChat(data.id,data.name)}>
                {
                  data.id !== props.location.state.key ? 
                <div className='list'>
                  <div className="initialLetter">{data.name.split('')[0].toUpperCase()}</div>
                  <div style={{margin: '4px 0px 0px 20px',fontSize:'20px'}} >{data.name}</div>
                </div>:null
                }
              </div>
            )
        }) : null
      }
      {
        redirect && conversationID ? <Redirect to={{
          pathname: '/userchat',
          state:{key:props.location.state.key,cId:conversationID,selectedUser:selectedUser}
        }} /> 
        : null
      }

        { menu ? 
          <div style={{position:'absolute' ,right:250, }} onClick={handleClose}>
            <MenuItem value={10}>Profile</MenuItem>
            <MenuItem value={20}>Logout</MenuItem>
            <MenuItem value={30}>Help</MenuItem>
          </div>
          : null
        }
        {
          open ?
          <Redirect to={{
            pathname:'/',
            // state:{key:props.location.state.key}
          }}/>
          : null
        }
  </div>
);
}

export default UsersList;

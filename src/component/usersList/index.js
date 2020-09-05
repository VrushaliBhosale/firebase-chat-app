/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import firebase from '../../services/firebase'
import { Redirect } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DBService from '../../services/db.services';
import {AppContext} from '../context/appContext';
import {getSessionCookie} from '../../services/cookie.service';
import * as Cookies from "js-cookie";

let selectedUser;
function UsersList (props) {

  const databaseRef=firebase.database().ref("MyChatApp");
  const [list,updateList] = useState([]);
  const [chatwith,setchatuser ]= useState('');
  const [conversationID,setConversationId] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isMenuOpen, setMenu] = useState(null);
  const [creategrp,setcreategrp] = React.useState(false);
  const context = useContext(AppContext);
  const [username,setUserName] = useState();

  const redirectToChat = async(chatwith,name) => { 
    if(name) selectedUser = name;
     console.log("key :",chatwith);
    setchatuser(chatwith);
    let conversationID = await DBService.setConversation(context.data.logedUserKey,chatwith);
    setConversationId(conversationID);
    console.log("cid in list:",conversationID);
    setRedirect(true);
  }

  useEffect( () => {
    console.log("App context is :",context);
    let name = Cookies.get('userName');
    let key = Cookies.get('logedUserKey');
    if(name&&key){
      context.updateState('userName',name);
      context.updateState('logedUserKey',key);
      setUserName(name);
    }
    databaseRef.child('Users')
    .once('value',(snapshot) => {
      let list=[];
      snapshot.forEach(snap=>{
        list.push({name:snap.val().name,mobno:snap.val().mobNo,id:snap.key});  
      })
      updateList(list);
      console.log(list);
    })
  },[username])
     
  const openProfileMenu = (event) => {
    setMenu(event.currentTarget);
    console.log("cliked ..",isMenuOpen);
  }

  const handleClose = () => {
    setMenu(null);
  };

  const logout = () => {
    Cookies.remove('userName');
    Cookies.remove('logedUserKey');
    setOpen(true);
  }

  const createNewGroup = () => {
    console.log("redirected to grp");
    setcreategrp(true);
    console.log("redirected to grp",creategrp);
  }

return (
  <AppContext.Consumer>
    {
      context=>(
        <div className="chatListWrapper wrapper">
        <div className="chatListHeader">
        <div>Chat Application</div>
        <div className="loginUser" onClick={openProfileMenu}>{username ? username : 'Menus'}</div>
        </div>
          {
            list ?
            list.map((data,index) => {
                return(
                  <div key={index} onClick={()=>redirectToChat(data.id,data.name)}>
                    {
                      data.id !== context.data.logedUserKey ? 
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
              state:{cId:conversationID,selectedUser:selectedUser}
            }} /> 
            : null
          } 
          <Menu
            id="simple-menu"
            anchorEl={isMenuOpen}
            keepMounted
            open={Boolean(isMenuOpen)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
            <MenuItem onClick={createNewGroup}>New Group</MenuItem>
          </Menu>

            {/* { isMenuOpen ? 
              <div style={{position:'absolute' ,right:250, }} onClick={handleClose}>
                <MenuItem value={10}>Profile</MenuItem>
                <MenuItem value={20} onClick={logout}>Logout</MenuItem>
                <MenuItem value={30} onClick={createNewGroup}>Create new group</MenuItem>
                <MenuItem value={40}>Help</MenuItem>

              </div>
              : null
            } */}
            {
              open ?
              <Redirect to={{
                pathname:'/',
              }}/>
              : null
            }
            {
              creategrp ?
              <Redirect to={{
                pathname: '/selectGrpMembers',
                // state:{key:props.location.state.key}
              }} /> : null
            }
      </div>
      )
    }
  </AppContext.Consumer>
);
}

export default UsersList;

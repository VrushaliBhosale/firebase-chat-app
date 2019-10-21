import React, { useState, useEffect }from 'react';
import './style.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../../services/firebase'
import { Redirect } from 'react-router';

function Messages () {
  const [values,setValues] = useState({});
  // const [status,setStatus]=useState(false);
  const [msg,setMessages]=useState('');
  const databaseRef=firebase.database().ref("chatApp");
  const [redirect,setRedireact]=useState(false);
  // const [user,setuser] = useState();

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value });
  };
  
  const handleClick = () => {
    setValues({name: '' });
      databaseRef.child('/Messages').push(values.name);
  }

  useEffect( () => {
    databaseRef.child('Messages')
    .on('value',snapshot => {
      let msg='';
      snapshot.forEach(snap=>{
        msg=msg+"\n"+snap.val();
        setMessages(msg);
      })
    })
    databaseRef.child('users')
    .on('value',(snapshot) => {
      // let user=snapshot.val().u1
      // setuser(user);
      // console.log("user",user)
    })
  });

  const deleteNode = () => {
    databaseRef.remove();
    setRedireact({redirect:true});
    console.log('removed successfully',redirect);
  }

return (
  <div style={{border:'1px solid'}}>
    <div className="header">
      {/* <div>{user}</div> */}
      <div>Chat Application</div>
      <div onClick={deleteNode}> 
        <Button>
          Leave Chat
        </Button>
      </div>
    </div>
  <div className="card_wrapper">
    <textarea 
      style={{
        height: '80vh',
        backgroundColor:'#F6F6F8',
        fontSize: '15px',
        padding: '5px'
      }} 
      value={msg} 
      readOnly
    >
      </textarea>
    <div className="text_button_wrapper">
      <TextField
        id="standard-full-width"
        value={values.name}
        onChange={handleChange('name')}
        style={{width:'80%'}}
        />  
      <div className="send_button">
        <Button onClick={handleClick} style={{color:'white',fontWeight:'500'}}>
          send
        </Button>
      </div>
    </div>
  </div>
  {
    redirect?
    <Redirect to='/'/>
    : null
  }
  </div>
);
}

export default Messages;
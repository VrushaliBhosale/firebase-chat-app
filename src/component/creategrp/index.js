import React, {useEffect, useState, useContext} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css';
import firebase from '../../services/firebase';
import Button from '@material-ui/core/Button';
import { Link,Redirect } from 'react-router-dom';
import {AppContext} from '../context/appContext';
import { isContext } from 'vm';
import { textAlign } from '@material-ui/system';

function CreateGrp(props){
  const [list,updateList] = useState([]);
  const databaseRef=firebase.database().ref("MyChatApp");
  const context = useContext(AppContext);

  const handleChange = name => event => {
    let newlist=list;
    newlist[name].checked = event.target.checked;
    updateList(newlist);
    // setState({ ...state, [name]: event.target.checked });
  };

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
  })

  return (
    <div className="wrapper">
      <div className="main_header">
      Chat Application
    </div>
      <div>
        {
          list ?
          list.map((data,index) => {
            return(
              <div key={index}>
                {
                  data.id !== context.data.userName ? 
                <div className='list'>
                  <Checkbox
                    checked={data.checked}
                    onChange={handleChange(index)}
                    value="checkedB"
                    color="primary" 
                    inputProps={{
                      'aria-label': 'secondary checkbox',
                    }}
                  />
                  <div style={{margin: '4px 0px 0px 20px',fontSize:'20px',color:'black'}} >{data.name}</div>
                </div>:null
                }
              </div>
            )
        }) : null
        }
       
          <Button variant="contained" style={{backgroundColor:'#6766FF',color:'black',borderRadius:'5px'}}>Create Group</Button>
          {
          //   <Redirect to={{
          //     pathname: '/userlist',
          //     state: { }
          // }} /> 
          }
        
        </div>
        
    </div>
  );
}

export default CreateGrp;
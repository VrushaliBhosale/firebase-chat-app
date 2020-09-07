import React, {useEffect, useState, useContext} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css';
import firebase from '../../services/firebase';
import Button from '@material-ui/core/Button';
import { Link,Redirect } from 'react-router-dom';
import {AppContext} from '../context/appContext';
import DBService from '../../services/db.services';

function CreateGrp(){
  const [list,updateList] = useState([]);
  const databaseRef=firebase.database().ref("MyChatApp");
  const context = useContext(AppContext);

  const handleChange = (event,index) => {
    let newlist=list;
    newlist[index]["checked"] = event.target.checked;
     updateList(newlist);
     console.log("list after change",list);
  };

  const createNewGroup = () => {

  }

  useEffect( () => {
    let list=[];
    databaseRef.child('Users')
    .once('value',(snapshot) => {
      snapshot.forEach(snap=>{
        if(snap.key===context.data.logedUserKey)
          list.push({name:snap.val().name,mobno:snap.val().mobNo,id:snap.key,checked:true});
        else
          list.push({name:snap.val().name,mobno:snap.val().mobNo,id:snap.key});  
      })
      updateList(list);
    })
  },[])

  return (
    <AppContext.Consumer>
      {
        context=>(
          
          <div className="wrapper">
          <div style={{display:'flex',display: 'flex',alignItems: 'center',paddingLeft: '15px'}}>
            <Link to='/userlist'><i class="material-icons" style={{color:'black'}}>
              arrow_back_ios
            </i></Link>
            <div className="main_header" style={{background: 'none',color: 'black',fontSize: '22px',fontWeight: 'bold'}}>
              Chat Application
            </div>
          </div>
          <div>
            {
              list ?
              list.map((data,index) => {
                return(
                    data.id !== context.data.logedUserKey ? 
                    <div className='list' key={index}>
                      <Checkbox
                        checked={data.checked}
                        onChange={(e)=>handleChange(e,index)}
                        value="checkedB"
                        color="primary" 
                        inputProps={{
                          'aria-label': 'secondary checkbox',
                        }}
                      />
                      <div style={{margin: '4px 0px 0px 20px',fontSize:'20px',color:'black'}} >{data.name}</div>
                    </div>:null
                )
            }) : null
            }
           
              <div><Button variant="contained" onCLick={createNewGroup}>Create Group</Button></div>
              {
              //   <Redirect to={{
              //     pathname: '/userlist',
              //   
              // }} /> 
              }
            
            </div>
        </div>
        )
      }
      </AppContext.Consumer>
   
  );
}

export default CreateGrp;
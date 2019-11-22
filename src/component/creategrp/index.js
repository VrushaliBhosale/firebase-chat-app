import React, {useEffect, useState, useContext} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './style.css';
import firebase from '../../services/firebase';
import Button from '@material-ui/core/Button';
import { Link,Redirect } from 'react-router-dom';
import {AppContext} from '../context/appContext';


function CreateGrp(props){
  const [list,updateList] = useState([]);
  const databaseRef=firebase.database().ref("MyChatApp");
  const context = useContext(AppContext);
  const[indexChecked,setIndexChecked] = useState({});

  const handleChange = (event,index) => {
    setIndexChecked({index:index,value:event.target.checked});
    let newlist=list;
    newlist[index]["checked"] = event.target.checked;
    console.log("list :",newlist);
    updateList(newlist);
    // setState({ ...state, [name]: event.target.checked });
  };

 const getList = () =>{
    databaseRef.child('Users')
    .once('value',(snapshot) => {
      let list=[];
      snapshot.forEach(snap=>{
        list.push({name:snap.val().name,mobno:snap.val().mobNo,id:snap.key});  
      })
      updateList(list);
      console.log(list); 
    })
  }

  useEffect( () => {
    console.log("context users :",context);
    databaseRef.child('Users')
    .once('value',(snapshot) => {
      let list=[];
      snapshot.forEach(snap=>{
        list.push({name:snap.val().name,mobno:snap.val().mobNo,id:snap.key,checked:indexChecked});  
      })
      updateList(list);
      console.log(list); 
    })
    
  })

  return (
    <AppContext.Consumer>
      {
        context=>(
          
          <div className="wrapper">
          <i class="material-icons">
            arrow_back_ios
          </i>
          <div className="main_header">
          Chat Application
          </div>
          {/* {getList()} */}
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
                        onChange={(e)=>handleChange(e,index)}
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
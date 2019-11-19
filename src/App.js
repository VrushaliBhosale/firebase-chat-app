import React, {useState, useContext, useEffect, Component} from 'react';
import './App.css';
import UserLogin from './component/userLogin';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import UsersList from './component/usersList';
import ChatMessages from './component/chatMessages'
import NoPageFound from './component/noPageFound';
// import DemoMsg from './component/demoMsg';
import CreateGrp from './component/creategrp';
import Provider from './component/providers';
import {AppContext} from './component/context/appContext';
import * as Cookies from "js-cookie";

function App() {
  const context = useContext(AppContext);

  useEffect(()=>{
     console.log("Cookies values :",Cookies.get('logedUserKey'),Cookies.get('userName'));
  })

  const AuthenticatedRoute = ({component:Component}) => (
    <Route 
    render ={()=>(
      Cookies.get('logedUserKey') && Cookies.get('userName')  ?(
        <Redirect to='/userlist'/>
      ):(
        <Redirect to='/userlogin'/>
      )
    )}
    />
  )

return (
  <Provider>
    <Router>
      <Switch>
        <AuthenticatedRoute exact path="/" component={UsersList}  />
        <Route path="/userlogin" exact component={UserLogin} />
        <Route path="/userlist" component={UsersList} />
        <Route path="/userchat" component={ChatMessages}/>
        <Route path="/selectGrpMembers" component={CreateGrp}/>
        <Route component={NoPageFound} />
        
      </Switch>
    </Router>
  </Provider>
);
}

export default App;

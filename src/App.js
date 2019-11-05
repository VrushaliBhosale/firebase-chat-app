import React, {useState} from 'react';
import './App.css';
import UserLogin from './component/userLogin';
import { BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';
import UsersList from './component/usersList';
import ChatMessages from './component/chatMessages'
import NoPageFound from './component/noPageFound';
import DemoMsg from './component/demoMsg';

function App() {
  
  
return (
  <Router>
    <Switch>
      <Route path="/" exact  component={UserLogin} />
      {/* <Route path="/" exact  component={DemoMsg} /> */}
      <Route path="/userlist" component={UsersList}/>
      <Route path="/userchat" component={ChatMessages}/>
      <Route component={NoPageFound} />
    </Switch>
  </Router>
);
}

export default App;

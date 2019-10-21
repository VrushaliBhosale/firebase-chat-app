import React, {useState} from 'react';
import './App.css';
import UserLogin from './component/userLogin';
import { BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';
import Messages from './component/messages';
import NoPageFound from './component/noPageFound';

function App() {
  
  
return (
  <Router>
    <Switch>
      <Route path="/" exact  component={UserLogin} />
      {/* <Route path='/users' component={Users}/> */}
      <Route path="/chat" component={Messages}/>
      <Route component={NoPageFound} />
    </Switch>
  </Router>
);
}

export default App;

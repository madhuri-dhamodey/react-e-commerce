import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Productlist from './components/Productlist';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from "./components/Modal";

class App extends Component {
  render() {
    return (
     <React.Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Productlist}/>
          <Route path="/Details" component={Details}/>
          <Route path="/Cart" component={Cart}/>
          <Route component={Default}/>
        </Switch>
        <Modal/>
     </React.Fragment>

    );
  }
} 

export default App;

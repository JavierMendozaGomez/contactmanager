import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Contacts from './components/contacts/Contacts';
import Header from './components/layout/Header';
import AddContact from './components/contacts/AddContact';
import About from './pages/About';
import NotFound from './pages/NotFound.js'
import {Provider} from './context.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding='Contact Manager App' />
            <div className='container'>
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about/:id" component={About} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

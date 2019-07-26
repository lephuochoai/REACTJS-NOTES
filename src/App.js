import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import registerComponent from './components/register/registerComponent';
import loginComponent from './components/login/loginComponent';
import homeComponent from './components/home/homeComponent';
import HeaderComponent from './components/header/headerComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadStorage } from './store/actions/loadStorageAction';

class App extends Component {

  componentWillMount() {
    this.props.loadStorage();
  }

  render() {
    return (
      <Router>
        <div>        
          <HeaderComponent />
          <Route exact path='/' component={homeComponent} />
          <Route path='/register' component={registerComponent} />
          <Route path='/login' component={loginComponent} />      
        </div>
      </Router>
    );
  }
}


const mapStateToProps = (store) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadStorage,
}, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(App);

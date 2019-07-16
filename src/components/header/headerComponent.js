import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class headerComponent extends Component {
    
    render() {
        return (
            <div>
            <ToastContainer autoClose={3000} />
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand> <NavLink to='/'>Notes U</NavLink> </Navbar.Brand>
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end mx-2">
                        {/* <Nav className="mr-auto"> */}
                            <NavLink to='/'>HOME</NavLink>
                                { this.props.name === '' && <NavLink className='px-2' to='/login'>Login</NavLink>}
                                { this.props.name === '' && <NavLink className='px-2' to='/register'>Register</NavLink> }
                                { this.props.name !== '' && <NavLink className='px-2' to='/profile'>{ this.props.name }</NavLink> }
                                { this.props.name !== '' && <NavLink className='px-2' to='/logout' onClick={ () => {
                                    this.props.logout(this.props.token)
                                    .then(res => {
                                        return this.props.history.push('/login')
                                    })
                                    .catch(err => {
                                        return toast.error("Logout Wrong! ", {
                                            position: toast.POSITION.TOP_RIGHT
                                        });
                                    })
                                } }>LOGOUT</NavLink> }
                                
                        {/* </Nav> */}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}


const mapStateToProps = (store) => {
    return {
        name: store.authReducers.name,
        token: store.authReducers.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (token) => dispatch(logout(token))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(headerComponent));

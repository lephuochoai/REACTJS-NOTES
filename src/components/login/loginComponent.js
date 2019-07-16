import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../store/actions/authActions';
import { withRouter } from 'react-router-dom';

class loginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.token !== '') {
            this.props.history.push('/');
        }
    }

    
    render() {
        return (
            <div className="container">
            <ToastContainer autoClose={3000} />
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" disabled={!this.state.username || !this.state.password} onClick={() => {
                        this.props.login(this.state.username, this.state.password)
                        .then(() => {

                        })
                        .catch((err) => {
                            toast.error("Login Wrong! "+ err, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        })                    
                    }}>
                        LOGIN
                    </Button>
                    <Link to="/register">SWITCH REGISTER</Link>
                </Form>
            </div>
        );
    }
}


const mapStateToProps = (store) => {
    return  {
        token: store.authReducers.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch( login(username, password) )
    }
}   

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(loginComponent));

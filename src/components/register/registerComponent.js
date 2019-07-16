import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../store/actions/authActions'
import { withRouter } from 'react-router-dom'


class registerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            name: '',
            password: '',
            re_pass: ''  
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

                        <Form.Label>Replace Password</Form.Label>
                        <Form.Control value={this.state.re_pass} onChange={(event) => this.setState({ re_pass: event.target.value })} type="password" placeholder="Replace Password" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} type="text" placeholder="Enter your name" />
                    </Form.Group>
                    
                    <Button variant="primary" disabled={!this.state.username||!this.state.email||!this.state.name||!this.state.password||!this.state.re_pass} onClick={() => {
                        this.props.registerUser(this.state.username, this.state.password, this.state.name, this.state.email)
                        .then((res) => {
                            toast.success("Register Success!", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            // return this.setState({
                            //     username: '',
                            //     email: '',
                            //     name: '',
                            //     password: '',
                            //     re_pass: ''  
                            // });
                        })
                        .catch((err) => {
                            console.log(err);                            
                            toast.error("Register Wrong! "+ err, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            // return this.setState({
                            //     username: '',
                            //     email: '',
                            //     name: '',
                            //     password: '',
                            //     re_pass: ''  
                            // });                        
                        })                        
                    }}>
                        REGISTER
                    </Button>
                    <Link to="/login">SWITCH LOGIN</Link>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.authReducers.username,
        token: store.authReducers.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (username, password, name, email) => dispatch(registerUser(username, password, name, email))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(registerComponent));

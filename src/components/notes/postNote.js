import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            isDisabled: false
        }
    }
    
    render() {
        return (
            <div>
            <ToastContainer autoClose={3000} />
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={this.state.title} onChange={(e) => this.setState({ title: e.target.value})} type="text" placeholder="Enter title note" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control value={this.state.content} onChange={(e) => this.setState({ content: e.target.value})}as="textarea" rows="3" />
                    </Form.Group>
                    <Button variant="primary" disabled={this.state.isDisabled} onClick={() => {
                        this.setState({ isDisabled: true });
                        this.props.postNote(this.state.title, this.state.content, this.props.token)
                        .then(() => {
                            toast.success("POST note success!", {
                                position: toast.POSITION.TOP_RIGHT
                            });

                            this.setState({ title: '', content: '' , isDisabled: false});
                        })
                        .catch(() => {
                            toast.error('POST note fail', {
                                position: toast.POSITION.TOP_RIGHT
                            });

                            this.setState({ title: '', content: '' });
                        })
                    }}>Post</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.authReducers.token
    }
}

export default connect(mapStateToProps, null)(post);
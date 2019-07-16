import React, { Component } from 'react';
import { Card, Button, Form, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'

class NoteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            title: this.props.title,
            isChange: false
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.content !== this.props.content || nextProps.title !== this.props.title) {
            this.setState({ title: nextProps.title, content: nextProps.content });
        }
    }
    
    render() {
        return (
            <div>
            <ToastContainer autoClose={3000} />
                <Card>
                    <FormControl
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        // variant={this.props.colorTitle}
                        className={'btn btn-'+this.props.colorTitle}
                        style={{color: '#rgb(241, 241, 241)'}}
                        onChange={ (e) => this.setState({ title: e.target.value, isChange: true }) }
                        value={ this.state.title }
                        />
                    <Card.Body>                        
                        <Form.Control 
                        value={ this.state.content } 
                        onChange={ (e) => this.setState({ content: e.target.value, isChange: true }) } as="textarea" rows="3" />
                    </Card.Body>
                    <Card.Subtitle className="mx-4 mt-1 text-muted"> Created: { moment(this.props.created_at).format("HH:mm DD-MM-YYYY") } </Card.Subtitle>
                    <Card.Subtitle className="mx-4 mt-1 text-muted"> Updated: { moment(this.props.updated_at).format("HH:mm DD-MM-YYYY") } </Card.Subtitle>
                    <div className='d-flex justify-content-around my-2'>
                        <Button style={{width:'80px'}} variant="primary" disabled={this.state.isChange === false} onClick={() => {
                            this.props.updateNote(this.props.id, this.state.title, this.state.content, this.props.token)
                            .then(() => {
                                return toast.success("Update note success!", {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            })
                            .catch(() => {
                                return toast.error("Update note wrong!", {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            })
                            this.setState({isChange: false});
                        } } >Update</Button>
                        <Button style={{width:'80px'}} variant="danger" onClick={() => {                            
                            this.props.deleteNote(this.props.id, this.props.token)
                            .then( res => {                               
                                return toast.success("DELETE note success!", {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            })
                            .catch(err => {
                                return toast.error("Delete note wrong!", {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            })
                        }} >Delete</Button>
                    </div>

                </Card>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.authReducers.token
    }
}

export default connect(mapStateToProps, null)(NoteComponent);
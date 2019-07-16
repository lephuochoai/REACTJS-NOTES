import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Post from '../notes/postNote';
import NoteComponent from '../notes/noteComponent';
import { postNote } from '../../store/actions/noteActions';
import { updateNote } from '../../store/actions/noteActions';
import { getNotes } from '../../store/actions/noteActions';
import { deleteNote } from '../../store/actions/noteActions';

class homeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: [
                'primary',
                'secondary',
                'success',
                'danger',
                'warning',
                'info',
                'dark',
            ]
        }
    }

    componentWillMount() {        
        if(this.props.token === '') {
            return this.props.history.push('/login');
        }
        this.props.getNotes(this.props.token)
    }

    randomColor = (min, max) => {
        return this.state.colors[Math.floor(Math.random() * (max - min + 1) + min)];
    }

    render() {
        return (
            <div className='container'>
                <Post postNote={this.props.postNote} />
                
                <div className='row'>
                    {
                        this.props.notes.length === 0 && <div>Empty</div>
                    }
                    {                        
                        this.props.notes.sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map((note, index) => {
                            return <div key={index} className='col-md-4 col-sm-6 col-6 my-2'>                            
                                <NoteComponent                                      
                                    colorTitle={ this.randomColor(0, this.state.colors.length -1) } 
                                    id={note.id}
                                    title={note.title} 
                                    content={note.content} 
                                    created_at={note.created_at} 
                                    updated_at={note.updated_at} 
                                    updateNote={this.props.updateNote} 
                                    deleteNote={this.props.deleteNote}
                                />
                            </div>
                        })
                    }
                </div>                
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        notes: store.noteReducers.notes,
        token: store.authReducers.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNotes: (token) => dispatch(getNotes(token)),
        postNote: (title, content, token) => dispatch(postNote(title, content, token)),
        updateNote: (id, title, content, token) => dispatch(updateNote(id, title, content, token)),
        deleteNote: (id, token) => dispatch(deleteNote(id, token))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(homeComponent));

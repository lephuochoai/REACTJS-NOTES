import Axios from "axios";

export function postNote(title, content, token) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Axios.post('http://localhost:2999/api/v1/notes/', { title, content }, {
                headers: { authorization: token }
            })
            .then((res) => {
                if(res.data.success === true) {                
                    dispatch({
                        type: 'ADD_NOTE_SUCCESS',
                        data: {
                            id: res.data.result.id,
                            title: res.data.result.title,
                            content: res.data.result.content,
                            created_at: res.data.result.created_at,
                            updated_at: res.data.result.updated_at
                        }
                    })
                    return resolve();
                } else {
                    dispatch({
                        type: 'ADD_NOTE_FAIL'
                    })
                    return reject();
                }
            })
            .catch(() => {
                dispatch({
                    type: 'OPERATION_POST_NOTE_WRONG'
                })
                return reject();
            })
        })
    }
}


export function getNotes(token) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Axios.get('http://localhost:2999/api/v1/notes/',{
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                if(res.data.success === true) {
                    dispatch({
                        type: 'GET_NOTES_SUCCESS',
                        data: {
                            notes: res.data.result
                        }
                    })
                    return resolve();
                } else {
                    dispatch({
                        type: 'GET_NOTES_FAIL'
                    })
                    return reject();
                }
            })
            .catch(err => {
                dispatch({
                    type: 'OPEARATION_GET_NOTES_FAIL'
                })
                return reject();
            })
        })
    }
}

export function updateNote(id, title, content, token) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Axios.put('http://localhost:2999/api/v1/notes/'+id, { title, content },{
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                if(res.data.success === true) {
                    dispatch({
                        type: 'UPDATE_NOTE_SUCCESS',
                        data: {
                            id, title, content,
                            updated_at: res.data.result.updated_at
                        }
                    })
                    return resolve();
                } else {
                    dispatch({
                        type: 'UPDATE_NOTE_FAIL'
                    })
                    return reject();
                }
            })
            .catch(err => {
                dispatch({
                    type: 'OPERATION_UPDATE_WRONG'
                })
                return reject();
            })
        })
    }
}

export function deleteNote(id, token) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Axios.delete('http://localhost:2999/api/v1/notes/'+id, {
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                if(res.data.success === true){
                    dispatch({
                        type: 'DELETE_NOTE_SUCCESS',
                        data: { id }
                    })
                    return resolve();                
                } 
                dispatch({
                    type: 'DELETE_NOTE_FAIL',
                })
                return reject(res.data.message);   
            })
            .catch(err => {
                dispatch({
                    type: 'CATCH_OPERATION_DELETE_NOTE'
                })
                return reject();
            })
        })
    }
}
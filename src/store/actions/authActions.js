import Axios from "axios";

export function registerUser (username, password, name, email) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Axios.post('http://localhost:2999/api/v1/auth/register', { username, password, name, email } )
                .then(res => {           
                    if(res.data.success === true) { 
                        localStorage.setItem('id', res.data.result.id);
                        localStorage.setItem('username', res.data.result.username);
                        localStorage.setItem('name', res.data.result.name);
                        localStorage.setItem('authorization', res.data.result.token);                      
                        dispatch({
                            type: 'ADD_USER_SUCCESS',
                            data: {
                                id: res.data.result.id,
                                username: res.data.result.username,
                                name: res.data.result.name,
                                token: res.data.result.token
                            }
                        })
                        return resolve();
                    } else {
                        dispatch({
                            type: 'REGISTER_FAIL'
                        })
                        return reject(res.data.message);
                    }
                })
                .catch(err => {
                    dispatch({
                        type: 'CATCH_REGISTER_FAIL'
                    })
                    return reject();
                })
        })
        
    } 
}

export function login (username, password) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Axios.post('http://localhost:2999/api/v1/auth/login', { username, password } )
                .then(res => {           
                    if(res.data.success === true) { 
                        localStorage.setItem('id', res.data.result.id);
                        localStorage.setItem('username', res.data.result.username);
                        localStorage.setItem('name', res.data.result.name);
                        localStorage.setItem('authorization', res.data.result.token);                       
                        dispatch({
                            type: 'ADD_USER_SUCCESS',
                            data: {
                                id: res.data.result.id,
                                username: res.data.result.username,
                                name: res.data.result.name,
                                token: res.data.result.token
                            }
                        })
                        return resolve();
                    } else {
                        dispatch({
                            type: 'LOGIN_FAIL'
                        })
                        return reject(res.data.message);
                    }
                })
                .catch(err => {
                    dispatch({
                        type: 'OPERATION_LOGIN_FAIL'
                    })
                    return reject(err);
                })
        })
        
    } 
}

export function logout(token) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Axios.post('http://localhost:2999/api/v1/auth/logout', {} ,{
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                if(res.data.success === true ) {
                    console.log(res.data);
                    localStorage.removeItem('id');
                    localStorage.removeItem('username');
                    localStorage.removeItem('name');
                    localStorage.removeItem('authorization');
                    dispatch({
                        type: 'LOGOUT_SUCCESS'
                    })
                    return resolve();
                } else {
                    console.log(res.data);
                    
                    dispatch({
                        type: 'LOGOUT_FAIL'
                    })
                    return reject();
                }
                
            })
            .catch(err => {
                dispatch({
                    type: 'OPERATION_LOGOUT_FAIL'
                })
                return reject();
            })
        })
    }
}
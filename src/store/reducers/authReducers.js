
const initialState = {
    id: '',
    username: '',
    name: '',
    email: '',
    token: ''
}

const authReducers = (state = initialState, action) => {
    // console.log(action);
    
    switch (action.type) {
        case 'ADD_USER_SUCCESS':
            return {
                ...state,
                id: action.data.id,
                username: action.data.username,
                email: action.data.email,
                name: action.data.name,
                token: action.data.token
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                id: '',
                username: '',
                email: '',
                name: '',
                token: ''
            }
        default:
            return state;
    }

}

export { authReducers }

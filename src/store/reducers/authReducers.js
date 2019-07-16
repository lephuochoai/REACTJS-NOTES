
const initialState = {
    id: '',
    username: '',
    name: '',
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
                name: action.data.name,
                token: action.data.token
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                id: '',
                username: '',
                name: '',
                token: ''
            }
        default:
            return state;
    }

}

export { authReducers }

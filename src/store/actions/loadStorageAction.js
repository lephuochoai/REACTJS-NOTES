export const loadStorage = () => {
    return async dispatch => {
        const token = await localStorage.getItem('authorization');
        const id = await localStorage.getItem('id');
        const email = await localStorage.getItem('email');
        const name = await localStorage.getItem('name');
        const username = await localStorage.getItem('username');
        // console.log('load localstorage');
        if(!token || !id || !name || !username) {
            return dispatch({
                type: 'GET_LOCALSTORAGE_FAIL'
            })
        }
        
        return dispatch({
            type: 'ADD_USER_SUCCESS',
            data: { token, id, email, name, username }
        })
    }
}
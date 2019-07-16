
const initialState = {
    notes: []
}

const noteReducers = (state = initialState, action) => {
    // console.log(action);
    
    switch (action.type) {
        case 'GET_NOTES_SUCCESS':           
            return {
                ...state,
                notes: action.data.notes.map(note => {
                    return {
                        id: note.id,
                        title: note.title,
                        content: note.content,
                        created_at: note.created_at,
                        updated_at: note.updated_at
                    }
                })          
            }
        case 'ADD_NOTE_SUCCESS':           
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        id: action.data.id,
                        title: action.data.title,
                        content: action.data.content,
                        created_at: action.data.created_at,
                        updated_at: action.data.updated_at
                    }
                ]
            }
        case 'UPDATE_NOTE_SUCCESS':
            return {
                ...state,
                notes: state.notes.map(note => {
                    if(note.id === action.data.id) {
                        return {
                            ...note,
                            title: action.data.title,
                            content: action.data.content,
                            updated_at: action.data.updated_at
                        }
                    }
                    return note;
                })
            }
        case 'DELETE_NOTE_SUCCESS':  
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.data.id)
            }
        default:
            return state;
    }
} 

export { noteReducers }

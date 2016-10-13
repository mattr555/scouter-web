const ADD_MESSAGE = "ADD_MESSAGE";
const CLOSE_MESSAGE = "CLOSE_MESSAGE";
const CLEAR_MESSAGES = "CLEAR_MESSAGES";

const reducer = (state = [], action) => {
    switch (action.type){
    case ADD_MESSAGE:
        return [...state, {...action.message, id: state.reduce((maxId, message) => Math.max(maxId, message.id), -1) + 1}];
    case CLOSE_MESSAGE:
        return state.filter((message) => message.id !== action.id);
    case CLEAR_MESSAGES:
        return [];
    default:
        return state;
    }
};

const addMessage = (message) => ({type: ADD_MESSAGE, message});
const closeMessage = (id) => ({type: CLOSE_MESSAGE, id});
const clearMessages = () => ({type: CLEAR_MESSAGES});

export default reducer;
export {addMessage, closeMessage, clearMessages};

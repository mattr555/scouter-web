export const asyncReducer = ({
    types, initKey, initValue = null,
    mapResponseToValue = ((resp) => (resp))
}) => {
    const [requestType, successType, failureType, cleanupType] = types;

    return (
        state = {fetching: false, error: null, [initKey]: initValue},
        action
    ) => {
        switch (action.type){
        case requestType:
            return {...state, fetching: true, error: null, [initKey]: initValue};
        case successType:
            return {...state, fetching: false, [initKey]: mapResponseToValue(action.response)};
        case failureType:
            return {...state, fetching: false, error: action.error};
        case cleanupType:
            return {...state, fetching: false, error: null, [initKey]: initValue};
        default:
            return state;
        }
    };
};

import { API_REQUEST_SUCCESS } from '../constants'

export default function RequestReducer(state = { data: {} }, action) {
    switch (action.type) {
        case API_REQUEST_SUCCESS:
            return action.payload;
        default:
            return state
    }
}

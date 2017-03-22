import { STORAGE_GET_SUCCESS } from '../constants'

export default function StorageReducer(state = {}, action) {
    switch (action.type) {
        case STORAGE_GET_SUCCESS:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}

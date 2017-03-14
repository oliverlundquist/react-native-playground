import { CONFIG_SUCCESS } from '../constants'

export default function ConfigReducer(state = { config: {} }, action) {
    switch (action.type) {
        case CONFIG_SUCCESS:
            return action.payload
        default:
            return state
    }
}

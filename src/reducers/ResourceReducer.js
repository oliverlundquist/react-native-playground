import { API_GET_REQUEST_SUCCESS } from '../constants'

const defaultState = {
    products: [
        {
            attributes: {
                image: 'images/39013_Korbo_Classic_24_1.jpg',
                name: {
                    no: "loading products"
                }
            }
        }
    ]
}

export default function ResourceReducer(state = defaultState, action) {
    switch (action.type) {
        case API_GET_REQUEST_SUCCESS:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}

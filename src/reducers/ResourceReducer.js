import { API_GET_REQUEST_SUCCESS } from '../constants'

const defaultState = {
    products: [
        { attributes: { image: 'some-loading.gif', name: { no: "..." } } },,
        { attributes: { image: 'some-loading.gif', name: { no: "..." } } },
        { attributes: { image: 'some-loading.gif', name: { no: "..." } } },
        { attributes: { image: 'some-loading.gif', name: { no: "..." } } },
        { attributes: { image: 'some-loading.gif', name: { no: "..." } } },
        { attributes: { image: 'some-loading.gif', name: { no: "..." } } }
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

export default function LoginReducer(state = { login: false }, action) {
    switch (action.type) {
        case 'login':
            return { login: true }
        default:
            return state
    }
}

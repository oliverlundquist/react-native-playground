export function login() {
    return (dispatch, getState) => {
        return new Promise((resolve) => setTimeout(resolve, 100));
        dispatch({
            type: 'login'
        })
    }
}

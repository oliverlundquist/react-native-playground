import request from 'axios'
import { loadUserData } from './user'

export const login = (user, pass) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        let { data } = await request.post('/login', { user, pass });
        await dispatch(loadUserData(data.uid));
        dispatch({ type: LOGIN_SUCCESS, data });
    } catch(error) {
        dispatch({ type: LOGIN_ERROR, error });
    }
}

export const loadUserData = (uid) => async (dispatch) => {
    try {
        dispatch({ type: USERDATA_REQUEST });
        let { data } = await request.get(`/users/${uid}`);
        dispatch({ type: USERDATA_SUCCESS, data });
    } catch(error) {
        dispatch({ type: USERDATA_ERROR, error });
    }
}

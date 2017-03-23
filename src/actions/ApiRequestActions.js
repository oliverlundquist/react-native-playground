import { API_GET_REQUEST_REQUEST, API_GET_REQUEST_SUCCESS, API_GET_REQUEST_ERROR } from '../constants'
import * as Auth from './AuthRequestActions'

export const get = (resource, retrying = false) => async (dispatch, getState) => {
    try {
        dispatch({ type: API_GET_REQUEST_REQUEST })
        let token = getState().storage.access_token
        let shopname = getState().storage.shopname
        var response = await fetch('https://api.mystore.no/shops/' + shopname + '/' + resource, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/vnd.api+json',
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/vnd.api+json'
            })
        })
        var responseJson = await response.json()

        // error?
        if (response.ok === false) {
            let errors = [];
            responseJson.errors.forEach((error) => {
                errors.push(error.title + ' [' + error.status + ']: ' + error.detail);
            })
            throw Error(errors);
        }

        dispatch({ type: API_GET_REQUEST_SUCCESS, payload: { [resource]: responseJson.data }})
    } catch (error) {
        dispatch({ type: API_GET_REQUEST_ERROR, payload: error.toString(), error: true });

        // can we rescue this? try to refresh token and retry
        if (response.status === 403 && responseJson.errors[0].detail === 'Token has expired or is invalid' && retrying === false) {
            await dispatch(Auth.refreshToken('get', resource))
        }
    }
}

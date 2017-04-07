import { API_GET_REQUEST_REQUEST, API_GET_REQUEST_SUCCESS, API_GET_REQUEST_ERROR } from '../constants'
import * as Auth from './AuthRequestActions'
import * as qs from 'qs'

const defaultGetOptions = {
    resource: null,
    parameters: {},
    callback: (response, options, state) => { return { [options.resource]: response.data } }
}

export const get = (requestOptions = {}, retrying = false) => async (dispatch, getState) => {
    try {
        dispatch({ type: API_GET_REQUEST_REQUEST })
        var options  = Object.assign({}, defaultGetOptions, requestOptions);
        let token    = getState().storage.access_token
        let shopname = getState().storage.shopname
        var response = await fetch('https://api.mystore.no/shops/' + shopname + '/' + options.resource + queryParams(options.parameters), {
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

        dispatch({ type: API_GET_REQUEST_SUCCESS, payload: options.callback(responseJson, options, getState())})
    } catch (error) {
        dispatch({ type: API_GET_REQUEST_ERROR, payload: error.toString(), error: true });

        // can we rescue this? try to refresh token and retry
        if (response.status === 403 && responseJson.errors[0].detail === 'Token has expired or is invalid' && retrying === false) {
            await dispatch(Auth.refreshToken(options))
        }
    }
}

const queryParams = (params) => {
    let queryString = qs.stringify(params)
    return queryString.length ? '?' + queryString : queryString;
}

import { OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET } from 'react-native-dotenv'
import { AUTH_ISSUE_TOKEN_REQUEST, AUTH_ISSUE_TOKEN_SUCCESS, AUTH_ISSUE_TOKEN_ERROR } from '../constants'
import * as Storage from './AsyncStorageActions'

export const issueToken = (shopname, username, password) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_ISSUE_TOKEN_REQUEST })
        let response = await fetch('https://auth.mystore.no/oauth/token', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                grant_type: 'password',
                client_id: OAUTH2_CLIENT_ID,
                client_secret: OAUTH2_CLIENT_SECRET,
                scope: '*',
                no_mystore_host: 'chips',
                username: 'oliver@mystore.no',
                password: 'password'
                // no_mystore_host: shopname,
                // username: username,
                // password: password,
            })
        })
        let responseJson = await response.json()

        // error?
        if (response.ok === false) {
            let errors = [];
            responseJson.errors.forEach((error) => {
                errors.push(error.title + ' [' + error.status + ']: ' + error.detail);
            })
            throw Error(errors);
        }
        await dispatch(Storage.set({ access_token: responseJson.access_token, refresh_token: responseJson.refresh_token }))
        dispatch({ type: AUTH_ISSUE_TOKEN_SUCCESS })
    } catch (error) {
        dispatch({ type: AUTH_ISSUE_TOKEN_ERROR, payload: error.toString(), error: true });
    }
}

import { API_REQUEST_REQUEST, API_REQUEST_SUCCESS, API_REQUEST_ERROR } from '../constants'
import { API_KEY, ANOTHER_CONFIG } from 'react-native-dotenv'

export const get = (type) => async (dispatch) => {
    try {
        dispatch({ type: API_REQUEST_REQUEST });

        let response = await fetch('https://api.mystore.no/shops/shopname/languages', {
            headers: new Headers({
                "Content-Type": "application/vnd.api+json",
                "Authorization": "Bearer " + API_KEY,
                "Accept": "application/vnd.api+json",
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

        dispatch({ type: API_REQUEST_SUCCESS, payload: { [type]: responseJson.data } })
    } catch (error) {
        dispatch({ type: API_REQUEST_ERROR, payload: error.toString(), error: true });
    }
}



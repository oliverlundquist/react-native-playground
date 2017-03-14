import { CONFIG_REQUEST, CONFIG_SUCCESS, CONFIG_ERROR } from '../constants'
import { AsyncStorage } from 'react-native'

// get settings from async storage

export const get = (keys) => async (dispatch) => {
    try {
        dispatch({ type: CONFIG_REQUEST });
        let results = {};
        let storage = await AsyncStorage.multiGet(keys);
        storage.forEach((_storage) => results[_storage[0]] = _storage[1]);
        dispatch({ type: CONFIG_SUCCESS, payload: results });
    } catch (error) {
        dispatch({ type: CONFIG_ERROR, payload: error.toString(), error: true });
    }
}

export const config = () => async (dispatch) => {
    try {
        dispatch({ type: CONFIG_REQUEST });
        let config = {
            access_token: await AsyncStorage.getItem('@tokens:access_token'),
            refresh_token: await AsyncStorage.getItem('@tokens:refresh_token')
        }
        dispatch({ type: CONFIG_SUCCESS, payload: config });
    } catch (error) {
        dispatch({ type: CONFIG_ERROR, payload: error.toString(), error: true });
    }
}

import {
    STORAGE_GET_REQUEST,
    STORAGE_GET_SUCCESS,
    STORAGE_GET_ERROR,
    STORAGE_SET_REQUEST,
    STORAGE_SET_SUCCESS,
    STORAGE_SET_ERROR,
    STORAGE_REMOVE_REQUEST,
    STORAGE_REMOVE_SUCCESS,
    STORAGE_REMOVE_ERROR
} from '../constants'
import { AsyncStorage } from 'react-native'

export const get = (keys) => async (dispatch) => {
    try {
        dispatch({ type: STORAGE_GET_REQUEST });
        let results = {};
        let storage = await AsyncStorage.multiGet(keys);
        storage.forEach((_storage) => results[_storage[0]] = _storage[1]);
        dispatch({ type: STORAGE_GET_SUCCESS, payload: results });
    } catch (error) {
        dispatch({ type: STORAGE_GET_ERROR, payload: error.toString(), error: true });
    }
}

export const set = (results) => async (dispatch) => {
    try {
        dispatch({ type: STORAGE_SET_REQUEST });
        let data = [];
        Object.keys(results).forEach((key) => {
            data.push([key, results[key]]);
        });
        await AsyncStorage.multiSet(data);
        await dispatch(get(Object.keys(results)))
        dispatch({ type: STORAGE_SET_SUCCESS, payload: results});
    } catch (error) {
        dispatch({ type: STORAGE_SET_ERROR, payload: error.toString(), error: true });
    }
}

export const remove = (keys) => async (dispatch) => {
    try {
        dispatch({ type: STORAGE_REMOVE_REQUEST })
        await AsyncStorage.multiRemove(keys);
        await dispatch(get(keys))
        dispatch({ type: STORAGE_REMOVE_SUCCESS })
    } catch (error) {
        dispatch({ type: STORAGE_REMOVE_ERROR, payload: error.toString(), error: true })
    }
}

import React, { Component } from 'react'
import { Dashboard, Login } from './index'
import { connect } from 'react-redux'
import * as Storage from '../actions/AsyncStorageActions'

class Root extends Component {
    componentDidMount() {
        this.props.loadStorageToState()
    }

    render () {
        { return this.props.access_token && this.props.refresh_token ? ( <Dashboard /> ) : ( <Login /> ) }
    }
}

export default connect(
    state => ({
        access_token: state.storage.access_token,
        refresh_token: state.storage.refresh_token
    }),
    dispatch => ({
        loadStorageToState: () => dispatch(Storage.get(['access_token', 'refresh_token', 'shopname', 'username', 'password']))
    })
)(Root)

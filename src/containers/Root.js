import React, { Component } from 'react'
import { Dashboard, Login } from './index'
import { connect } from 'react-redux'
import * as Config from '../actions/ConfigActions';

class Root extends Component {
    componentDidMount() {
        this.props.config();
    }
    // load config
    // logged in?

    render () {
        { return this.props.login === true ? ( <Dashboard /> ) : ( <Login /> ) }
    }
}

export default connect(
    state => ({
        login: state.login.login
    }),
    dispatch => ({
        config: () => dispatch(Config.get(['@tokens:access_token', '@tokens:refresh_token']))
    })
)(Root)

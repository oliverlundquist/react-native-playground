import React, { Component } from 'react'
import { Dashboard, Login } from './index'
import { connect } from 'react-redux'

class Root extends Component {
    // load config
    // logged in?

    render () {
        { return this.props.login === true ? ( <Dashboard /> ) : ( <Login /> ) }
    }
}

export default connect(
    state => ({
        login: state.login.login
    })//,
    // dispatch => ({
    // increment: count => dispatch(Actions.increment(count))
    // })
)(Root)

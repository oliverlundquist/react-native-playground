import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ART } from 'react-native'

class ChartBar extends Component {
    render() {
        const path = [
            'M ' + this.props.x + ' ' + this.props.chartHeight,
            'H ' + (this.props.x + this.props.barWidth),
            'V ' + (this.props.chartHeight - this.props.barHeight),
            'H ' + this.props.x,
            'Z'
        ].join(' ')
        return (
            <ART.Shape d={path} {...styles} />
        );
    }
}

ChartBar.propTypes = {
    x: React.PropTypes.number.isRequired,
    chartHeight: React.PropTypes.number.isRequired,
    barHeight: React.PropTypes.number.isRequired,
    barWidth: React.PropTypes.number.isRequired,
}

const styles = {
    stroke: '#f0f',
    fill: '#0ff',
    strokeWidth: 2
}

export default connect(
    state => ({
        //
    }),
    dispatch => ({
        //
    })
)(ChartBar)

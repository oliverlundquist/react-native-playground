import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions, Text, View, Image, ART } from 'react-native'
import * as ApiRequest from '../actions/ApiRequestActions'
import { scaleLinear, scaleBand } from "d3-scale"
import { ChartBar } from '../components'

class Dashboard extends Component {

    componentDidMount() {
        this.props.getOrders(dates)
    }

    render () {
        const { width }   = Dimensions.get('window')
        // const x           = scaleBand().domain([0, dates.length-1]).rangeRound([0, (width-20)]).padding(0.1);
        // const y           = scaleLinear().domain([0, 100]).rangeRound([0, 300]);
        const x           = scaleBand().domain(Object.keys(this.props.orders)).rangeRound([0, (width-20)]).padding(0.1);
        const y           = scaleLinear().domain([0, Math.max(...Object.values(this.props.orders))]).rangeRound([0, 300]);
        const barWidth    = x.bandwidth()
        const chartHeight = 300

        return (
            <View style={styles.tabContent}>
                <ART.Surface width={(width-20)} height={300} style={{backgroundColor:'#ddd'}}>
                    <ART.Group x={0} y={0}>
                        {Object.keys(this.props.orders).map((key, index) => {
                            return (
                                <ChartBar
                                    key={index}
                                    x={x(key)}
                                    barHeight={y(this.props.orders[key])}
                                    barWidth={barWidth}
                                    chartHeight={chartHeight}
                                />
                            )
                        })}
                    </ART.Group>
                </ART.Surface>
                <Text style={{ marginTop: 20, marginBottom: 10, marginHorizontal: 50, color: 'white' }}>Dashboard!</Text>
                <Text style={{ marginTop: 5, marginBottom: 10, marginHorizontal: 50, color: 'white' }}>Put some cool real-time graphs here that show sales data and sales data history</Text>
                <Image
                    source={require('../../assets/square-dashboard.png')}
                    style={{ marginHorizontal: 50, flex: 0.8 }}
                    resizeMode="contain"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ccc'
    },
    tabText: {
        color: 'white',
        margin: 20,
    },
});

const now   = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
const dates = [
    {
        from: new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 4), today.getHours(), today.getMinutes(), (today.getSeconds() - 1)),
        to:   new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 3)),
    },
    {
        from: new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 3), today.getHours(), today.getMinutes(), (today.getSeconds() - 1)),
        to:   new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 2)),
    },
    {
        from: new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 2), today.getHours(), today.getMinutes(), (today.getSeconds() - 1)),
        to:   new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 1)),
    },
    {
        from: new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 1), today.getHours(), today.getMinutes(), (today.getSeconds() - 1)),
        to:   new Date(today.getFullYear(), today.getMonth(), (today.getDate())),
    },
    {
        from: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), (today.getSeconds() - 1)),
        to:   new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 1)),
    }
]

const formatDate = (date) => {
    return date.getFullYear() + '-' +
        ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getDate()).slice(-2) + ' ' +
        ('00' + date.getHours()).slice(-2) + ':' +
        ('00' + date.getMinutes()).slice(-2) + ':' +
        ('00' + date.getSeconds()).slice(-2)
}

const sort = (object) => {
    let result = {}
    Object.keys(object).sort().forEach(key => result[key] = object[key])
    return result
}

export default connect(
    state => ({
        orders: state.resources.orders,
    }),
    dispatch => ({
        getOrders: (dates) => {
            dates.map(date => {
                dispatch(ApiRequest.get({
                    resource: 'orders',
                    parameters: {
                        filter: {
                            created_at: {path: 'created_at', value: formatDate(date.from), operator: '>'},
                            created_at: {path: 'created_at', value: formatDate(date.to),   operator: '<'}
                        }
                    },
                    callback: (response, options, state) => {
                        return {
                            ['orders']: sort(Object.assign({}, state.resources.orders, {
                                [formatDate(date.from).slice(0, 10)]: response.data ? response.data.length : 0
                            }))
                        }
                    }
                }))
            })
        }
    })
)(Dashboard)

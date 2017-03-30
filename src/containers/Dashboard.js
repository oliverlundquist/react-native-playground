import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Dimensions, Text, View, Image, ART } from 'react-native'
import { scaleLinear, scaleBand } from "d3-scale"
import { ChartBar } from '../components'

class Dashboard extends Component {
    render () {
        const { width } = Dimensions.get('window')
        const x = scaleBand()
            .domain([new Date(2000, 0, 1), new Date(2000, 0, 7)])
            .rangeRound([0, (width-20)]) // x pixels wide
            .padding(0.1);
        const y = scaleLinear()
            .domain([0, 100])
            .rangeRound([0, 300]); // y pixels high
        const chartBarX = x(new Date(2000, 0, 1))
        const barHeight = y(70)
        const barWidth = x.bandwidth()
        const chartHeight = 300
        const chartBarX2 = x(new Date(2000, 0, 7))
        const barHeight2 = y(30)

        return (
            <View style={styles.tabContent}>
                <ART.Surface width={(width-20)} height={300} style={{backgroundColor:'#ddd'}}>
                    <ART.Group x={0} y={0}>
                        <ChartBar x={chartBarX} barHeight={barHeight} barWidth={barWidth} chartHeight={chartHeight} />
                        <ChartBar x={chartBarX2} barHeight={barHeight2} barWidth={barWidth} chartHeight={chartHeight} />
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

export default connect(
    state => ({
        //
    }),
    dispatch => ({
        //
    })
)(Dashboard)

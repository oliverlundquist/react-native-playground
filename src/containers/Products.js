import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native'
import * as ApiRequest from '../actions/ApiRequestActions'
import { ProductDetails } from './'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class ProductList extends Component {

    componentDidMount() {
        this.props.getProducts()
    }

    _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        let imgSource = { uri: 'https://cdn.mystore4.no/cdn/128_128/' + this.props.shopname + '/' + rowData.attributes.image }
        return (
            <TouchableHighlight onPress={() => { this.props.navigator.push({ component: ProductDetails, passProps: { product: rowData.attributes } }) }}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource}/>
                        <Text style={styles.text}>
                            { rowData.attributes.name ? rowData.attributes.name.no : 'Product Name N/A' }
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}
            />
        );
    }

    render () {
        return (
            <ListView
                dataSource={this.props.products}
                renderRow={this._renderRow.bind(this)}
                renderSeparator={this._renderSeparator}
                automaticallyAdjustContentInsets={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
        marginRight: 10,
        backgroundColor: '#FFFFFF'
    },
    text: {
        flex: 1,
    }
});

export default connect(
    state => ({
        shopname: state.storage.shopname,
        products: ds.cloneWithRows(state.resources.products),
    }),
    dispatch => ({
        getProducts: () => dispatch(ApiRequest.get({ resource: 'products' }))
    })
)(ProductList)

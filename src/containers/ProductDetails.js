import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'

class ProductDetails extends Component {
    render () {
        let imgSource = { uri: 'https://cdn.mystore4.no/cdn/128_128/' + this.props.shopname + '/' + this.props.product.image }
        return (
            <ScrollView automaticallyAdjustContentInsets={false}>
                <View style={styles.tabContent}>
                    <Text style={styles.headline}>{ this.props.product.name ? this.props.product.name.no : 'Product Name N/A' }</Text>
                    <Image style={styles.thumb} source={imgSource}/>
                    <Text style={styles.description}>{ this.props.product.description ? this.props.product.description.no : 'Product Description N/A' }</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    headline: {
        marginTop: 30,
        marginBottom: 10,
        fontSize: 24
    },
    description: {
        marginHorizontal: 20,
        paddingBottom: 100
    },
    thumb: {
        width: 128,
        height: 128,
    }
});

export default connect(
    state => ({
        shopname: state.storage.shopname
    }),
    dispatch => ({
        //
    })
)(ProductDetails)

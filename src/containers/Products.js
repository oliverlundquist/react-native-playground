import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native'
import * as ApiRequest from '../actions/ApiRequestActions'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';
const hashCode = function(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

class Products extends Component {

    componentDidMount() {
        this.props.getProducts()
    }

    _genRows(pressData: {[key: number]: boolean}): Array<string> {
        var dataBlob = [];
        for (var ii = 0; ii < 100; ii++) {
            var pressedText = pressData[ii] ? ' (pressed)' : '';
            dataBlob.push('Row ' + ii + pressedText);
        }
        return dataBlob;
    }

    renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        let imgSource = { uri: 'https://cdn.mystore4.no/users/' + this.props.shopname + '_mystore_no/images/' + rowData.attributes.image }
        return (
            <TouchableHighlight onPress={() => { console.log('click click') }}>
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
                renderRow={this.renderRow.bind(this)}
                renderSeparator={this._renderSeparator}
            >
                <Text>Some text</Text>
            </ListView>
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
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
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
        getProducts: () => dispatch(ApiRequest.get('products'))
    })
)(Products)

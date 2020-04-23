import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Layout from './theme/Layout'

export class Sheesha extends Component {

    render() {
        alert(JSON.stringify(this.props.items))
        return (
            <Layout>
                <Text> prop </Text>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.seeshaItems,
        total: state.total,
        added : state.addedItems
    }
}

const mapDispatchToProps =(dispatch)=> {
    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        addQuantity: (id) => { dispatch(addQuantity(id)) },
        subtractQuantity: (id) => { dispatch(subQuantity(id)) },
        removeItem: (id) => { dispatch(removeFromCart(id)) },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sheesha)

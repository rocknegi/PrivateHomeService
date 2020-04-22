import React, { Component } from 'react'
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native'
import { BackgroundColor, PrimayColor } from './theme/Colors'
import Layout from './theme/Layout'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import { removeFromCart, addQuantity, subQuantity } from '../redux/actions'

class Cart extends Component {
    //to remove the item completely
    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }
    render() {
        return (
            <Layout>
                {this.props.items.length?<ScrollView>
                    {this.props.items.map(item => {
                        return (
                            <View style={styles.list} key={item.id}>
                                <Image
                                    source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                    style={styles.logo}
                                />
                                <Text style={styles.text}>Brand Name{"\n"}£{item.price}</Text>
                                <Icon onPress={() => this.handleAddQuantity(item.id)} name="plus" style={styles.icon} />
                                <Text style={{ fontSize: 20 }}>{item.quantity}</Text>
                                <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                            </View>
                        )
                    })}
                    <Text>{this.props.total} </Text>

                </ScrollView>:<Text>Your Cart is empty</Text>}
            </Layout>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        total: state.total
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeFromCart(id)) },
        addQuantity: (id) => { dispatch(addQuantity(id)) },
        subtractQuantity: (id) => { dispatch(subQuantity(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BackgroundColor
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20
    },
    logo: {
        height: 80,
        width: 90,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 15,
        padding: 10,
    },
    icon: {
        fontSize: 25,
        // color: TextColorWhite
    },
    button: {
        backgroundColor: PrimayColor,
        borderRadius: 6,
        marginHorizontal: '35%',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        padding: 10
    },
})
import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native'
import { BackgroundColor, PrimayColor, TextColorWhite } from './theme/Colors'
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Layout from './theme/Layout'
import { connect } from 'react-redux'
import { addToCart } from '../redux/actions';

class SelectedCategory extends Component {
    static navigationOptions = ({ navigation },props) => {
        return {
            title: '',
            headerRight: () => <MaterialIcon onPress={() => navigation.navigate('Cart')} name="shopping-cart" style={{ fontSize: 28, right: 10 }} />
        }
    }
    handleClick = (id) => {
        this.props.addToCart(id);
    }
    notiifcation = () => <View style={styles.circle}>
        <Text style={styles.count}>{this.props.items.length}</Text>
    </View>
    render() {
        return (
            <Layout>
                <ScrollView>
                    {this.props.items.map(item => {
                        return (
                            <View style={styles.list} key={item.id}>
                                <Image
                                    source={{ uri: item.img }}
                                    style={styles.logo}
                                />
                                <Text style={styles.text}>{item.title}{"\n"}£{item.price}/Unit</Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.handleClick(item.id)}
                                >
                                    <Text style={styles.buttonText}>Add to cart</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            </Layout>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        itemsInCart: state.addedItems,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCategory)


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
        // marginHorizontal: '35%',
        height: 40,
        justifyContent: 'center',
        // marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'red'
    },
    count: { color: '#FFF' }
})


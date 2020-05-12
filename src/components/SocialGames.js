import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, StyleSheet, Platform } from 'react-native'
import { BackgroundColor, PrimayColor, TextColorWhite } from './theme/Colors'

import Layout from './theme/Layout'
import { connect } from 'react-redux'
import { addToCart, addQuantity, subQuantity, removeFromCart, fetchData } from '../redux/actions';



class SocialGames extends Component {

    state = {
        selected: [],
        total: 0,

    }
    componentDidMount() {
        this.props.fetchData('games')
    }

    handleClick = (item, category) => {
        this.props.addToCart(item, category);
        this.props.toggle()
    }


    render() {
        return (
            <Layout>

                <ScrollView showsVerticalScrollIndicator={false} >
                    {this.props.items && <View style={{ flex: 1 }}>
                    <View style={styles.container} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',marginBottom:'5%' }}>
                                    <Image
                                        source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                        style={{ height: 60, width: 60 }}
                                    />
                                    <Text style={[styles.text, {}]}>Item{"\n"}
                                            Some Description
                                            </Text>
                                    <Text style={[styles.text, { flex: 0, alignSelf: 'center' }]}>Free</Text>
                                   
                                </View>



                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',marginBottom:'5%' }}>
                                    <Image
                                        source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                        style={{ height: 60, width: 60 }}
                                    />
                                    <Text style={[styles.text, {}]}>Item 2{"\n"}
                                            Some Description
                                            </Text>
                                    <Text style={[styles.text, { flex: 0, alignSelf: 'center' }]}>Free</Text>
                                   
                                </View>
                        {this.props.items.map(item => {
                            return (<View style={styles.container} key={item.id}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <Image
                                        source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                        style={{ height: 60, width: 60 }}
                                    />
                                    <Text style={[styles.text, {}]}>{item.title}{"\n"}
                                            Some Description
                                            </Text>
                                    <Text style={[styles.text, { flex: 0, alignSelf: 'center' }]}>FCFA{item.price}</Text>
                                    <TouchableOpacity
                                        onPress={() => this.handleClick(this.props.items, 'games')}
                                        style={styles.button}><Text style={styles.buttonText}>add to cart</Text></TouchableOpacity>
                                </View>



                            </View>)
                        })}

                    </View>

                    }

                </ScrollView>
            </Layout>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        items: state.items,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id, category) => { dispatch(addToCart(id, category)) },
        fetchData: (category) => { dispatch(fetchData(category)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialGames)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BackgroundColor
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    text: {
        flex: 1,
        fontSize: 15,
        padding: 10,
        // flexWrap: 'nowrap',
        fontFamily:Platform.OS==='android'?'COMIC':'ComicSansMS',
    },
    icon: {
        fontSize: 25,
        // backgroundColor:'#fd8539',
        marginTop: -10,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: PrimayColor,
        borderRadius: 100,
        height: 40,
        justifyContent: 'center',
        // marginHorizontal: '25%',
        // margin: '5%'
        alignSelf: 'center',
        margin: 2
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10,
        fontFamily:Platform.OS==='android'?'COMIC':'ComicSansMS',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fd9a50',
    },
    count: { color: '#FFF' },
    option: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#eee',
        borderRadius: 6,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: PrimayColor
    }
})


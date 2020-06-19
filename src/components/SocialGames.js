import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, StyleSheet, Platform } from 'react-native'
import { BackgroundColor, PrimayColor, TextColorWhite } from './theme/Colors'
import images from '../assets/images'
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
        // const tItem = item.filter(e=>e.price>0)
        // console.log(tItem)
        this.props.addToCart(item, category);
        // this.props.toggle()
    }


    render() {
        return (
            <Layout>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {this.props.items && <View style={{ flex: 1 }}>
                        {this.props.items.map(item => {
                            return (<View style={styles.container} key={item.id}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: '5%' }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ height: 55, width: 55, alignSelf: 'center' }}
                                    />
                                    <Text style={[styles.text, { textAlign: 'center', flex: 0.8, flexWrap: 'wrap', fontWeight: 'bold' }]}>{item.title}{"\n"}
                                        <Text style={{ fontWeight: 'normal' }}> {item.desc} {"\n"}</Text>
                                        {item.price !== 0 && <Text style={[styles.text, { flex: 0.5, alignSelf: 'center' }]}>FCFA {item.price}</Text>}
                                    </Text>
                                    {item.price === 0 ?
                                        <TouchableOpacity
                                            style={[styles.button, { backgroundColor: '#fafafa' }]}><Text style={[styles.buttonText, { color: '#000' }]}>         Free</Text></TouchableOpacity>
                                        :
                                        <>
                                            <TouchableOpacity
                                                onPress={() => this.handleClick(item.title, 'games')}
                                                style={styles.button}><Text style={styles.buttonText}>add to cart</Text></TouchableOpacity>
                                        </>
                                    }
                                </View>



                            </View>)
                        })}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity
                                onPress={this.props.toggle}
                                style={[styles.button, { marginTop: 10, width: '30%' }]}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>

                        </View>
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
        fontSize: 14,
        padding: 10,
        flexWrap: 'wrap',
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
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
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
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


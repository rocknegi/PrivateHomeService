import React, { Component, } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import Layout from './theme/Layout'
import { BackgroundColor, PrimayColor } from './theme/Colors'

export class OrderSummary extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Order Summary'
        }
    }
    state = {
        complimentary: this.props.navigation.getParam('data')
    }
    render() {
        // console.log(JSON.stringify(this.props.items, undefined, 3))
        return (
            <Layout>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.props.items && 
                    <View>
                        <View style={styles.list}>
                            <Text style={[styles.text,{flexGrow:1.5}]}>Name</Text>
                            <Text style={styles.text}>Price</Text>
                            <Text style={styles.text}>Quantity</Text>
                            <Text style={styles.text}>Total</Text>
                        </View>
                        {this.state.complimentary.map(item => {
                            return (
                                <View key={item.name} style={styles.list} >
                                    <Text style={[styles.text,{flexGrow:1.5}]}>{item.name}</Text>
                                    <Text style={[styles.text,]}>Free</Text>
                                    <Text style={[styles.text,]}>1</Text>
                                    <Text style={styles.text}>0</Text>
                                </View>
                            )
                        })}
                        {this.props.items.map(item => {
                            return (
                                <View key={item.id}>
                                    <View style={styles.list} >
                                        {item.hotess ? <Text style={[styles.text,{flexGrow:1.5}]}>Hotess</Text>: <Text style={[styles.text,{flexGrow:1.5}]}>{item.title}</Text>}              
                                        {item.hotess ? <Text style={styles.text}>2500/Unit</Text> : <Text style={styles.text}>{item.price}/Unit</Text>}
                                        {item.hotess ? <Text style={styles.text}>{item.hotess}</Text> : <Text style={styles.text}>{item.quantity}</Text>}
                                        {item.hotess ? <Text style={styles.text}>{item.price}</Text> : <Text style={styles.text}>{item.price * item.quantity}</Text>}
                                    </View>
                                   { item.wineGlass>0&&<View style={styles.list}>
                                        <Text style={styles.text}>Wine glass</Text> 
                                        <Text style={styles.text}>{item.wineGlass}</Text>
                                    </View>}
                                    {item.champagneGlass>0&&<View style={styles.list}>
                                       <Text style={styles.text}>Whiskey glass</Text>
                                       <Text style={styles.text}>{item.champagneGlass}</Text>
                                    </View>}
                                    {item.whiskeyGlass>0&&<View style={styles.list}>
                                       <Text style={styles.text}>Champagne glass</Text> 
                                       <Text style={styles.text}>{item.whiskeyGlass}</Text>
                                    </View>}
                                    {item.service&&<View style={styles.list}>
                                       <Text style={styles.text}>Service</Text> 
                                       <Text style={styles.text}>{item.service}</Text>
                                    </View>}
                                    {item.hotess&&<View style={styles.list}>
                                       <Text style={styles.text}>Hotess</Text> 
                                       <Text style={styles.text}>{item.hotess}</Text>
                                    </View>}
                                 </View>
                            )
                        })}
                    </View>}

                </ScrollView>
                {this.props.items.length ? <View style={styles.footer}>
                    <Text style={[styles.text, { fontSize: 25 }]}>Total</Text>
                    <Text style={[styles.text, { fontSize: 25, }]}>€ {this.props.total} </Text>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('location')}
                        style={[styles.button, { marginBottom: 0, right: '20%', height: 40 }]}>
                        <Text style={styles.buttonText}>Pay Now</Text>
                    </TouchableOpacity>
                </View> : null}
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.addedItems,
    total: state.total
})


export default connect(mapStateToProps)(OrderSummary)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BackgroundColor
    },
    list: {
        flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 0, marginBottom: 10
    },
    logo: {
        height: 80,
        width: 90,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        flex: 1,
        flexWrap:'wrap'
    },
    icon: {
        fontSize: 25,
        // color: TextColorWhite
    },
    button: {
        backgroundColor: PrimayColor,
        borderRadius: 6,
        // marginHorizontal: '35%',
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
    modal: {
        flexDirection: 'row', justifyContent: 'space-between',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: PrimayColor
    },
    textHeading: {
        fontSize: 20,
        textAlign: 'center',
        padding: 5,
        margin: 20,
        backgroundColor: '#fd6d24',
        color: '#fff',
        fontWeight: 'bold'
    }
})
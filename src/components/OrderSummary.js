import React, { Component, } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import Layout from './theme/Layout'
import { BackgroundColor, PrimayColor } from './theme/Colors'

export class OrderSummary extends Component {
    static navigationOptions = ({ navigation }, props) => {
        return {
            headerShown: false,
            title: '',
        }
    }
    state = {
        complimentary: this.props.navigation.getParam('data')
    }
    render() {
        console.log(JSON.stringify(this.props.items, undefined, 3))
        return (
            <Layout>
                <View style={{ backgroundColor: PrimayColor, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50 }}>
                    <Icon style={{ fontSize: 30, left: 5 }} name="arrow-left" onPress={() => this.props.navigation.goBack()} />
                    <Text style={[styles.text, { textAlign: 'left' }]}>{this.props.language.summary}</Text>

                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.props.items &&
                        <View>
                            <View style={[styles.list, { backgroundColor: '#eee' }]}>
                                <Text style={[styles.text, { flexGrow: 1.5, borderWidth: 1, margin: 1 }]}>{this.props.language.product}</Text>
                                <Text style={[styles.text, { borderWidth: 1, margin: 1 }]}>{this.props.language.price}</Text>
                                <Text style={[styles.text, { borderWidth: 1, margin: 0 }]}>{this.props.language.quantity}</Text>
                                <Text style={[styles.text, { borderWidth: 1, margin: 1 }]}>Total</Text>
                            </View>
                            {this.state.complimentary.map(item => {
                                return (
                                    <View key={item.title}>
                                        <View key={item.name} style={styles.list} >
                                            <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                            <Text style={[styles.text,]}>Free</Text>
                                            <Text style={[styles.text,]}>1</Text>
                                            <Text style={styles.text}>0</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                    </View>

                                )
                            })}
                            {this.props.items.filter(e => e.category === 'Social').map(item => {
                                return (
                                    <View key={item.title}>
                                        <View style={styles.list} >
                                            <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                            <Text style={styles.text}>{item.price}/Unit</Text>
                                            <Text style={[styles.text,]}>{item.quantity}</Text>
                                            <Text style={[styles.text,]}>{item.price * item.quantity}</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                    </View>
                                )
                            })}

                            {this.props.items.filter(e => e.category === 'Seesha').map(item => {
                                return (
                                    <View key={item.title}>
                                        <View style={styles.list} >
                                            <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                            <Text style={styles.text}>{item.price}/Unit</Text>
                                            <Text style={styles.text}>{item.quantity}</Text>
                                            <Text style={styles.text}>{item.price * item.quantity}</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                    </View>
                                )
                            })}
                            {this.props.items.filter(e => e.category === 'liquors').map(item => {
                                return (
                                    <View key={item.title}>
                                        <View style={styles.list} >
                                            <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                            <Text style={styles.text}>{item.price}/pack</Text>
                                            <Text style={styles.text}>{item.quantity}</Text>
                                            <Text style={styles.text}>{item.price * item.quantity}</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                    </View>
                                )
                            })}
                            {this.props.items.filter(e => e.category === 'Whiskey12').map(item => {
                                return (
                                    <View key={item.title}>
                                        <View style={styles.list} >
                                            <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                            <Text style={styles.text}>{item.price}/Btle</Text>
                                            <Text style={styles.text}>{item.quantity}</Text>
                                            <Text style={styles.text}>{item.price * item.quantity}</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                    </View>
                                )
                            })}
                            {this.props.items.filter(e => e.category === 'Whiskey15').map(item => {
                                return (
                                    <View key={item.title}>
                                        <View style={styles.list} >
                                            <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                            <Text style={styles.text}>{item.price}/Btle</Text>
                                            <Text style={styles.text}>{item.quantity}</Text>
                                            <Text style={styles.text}>{item.price * item.quantity}</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                    </View>
                                )
                            })}
                            {this.props.items.filter(e => e.category === 'Whiskey18').map(item => {
                                return (
                                    <View key={item.title}>
                                        <View style={styles.list} >
                                            <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                            <Text style={styles.text}>{item.price}/Btle</Text>
                                            <Text style={styles.text}>{item.quantity}</Text>
                                            <Text style={styles.text}>{item.price * item.quantity}</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                    </View>
                                )
                            })}
                            {this.props.items.filter(e => e.category === 'Champagne').map(item => {
                                return (
                                    <View key={item.title}>
                                        <View style={styles.list} >
                                            <Text style={[styles.text, { flexGrow: 1.5 }]}>{item.title}</Text>
                                            <Text style={styles.text}>{item.price}/Btle</Text>
                                            <Text style={styles.text}>{item.quantity}</Text>
                                            <Text style={styles.text}>{item.price * item.quantity}</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                    </View>
                                )
                            })}

                            {this.props.selection === 'phs' && this.props.items.map(item => {
                                return (
                                    <View>
                                        {item.hotess && <View key={item.id}>
                                            <View style={[styles.list]} >
                                                {item.hotess ? <Text style={[styles.text, { flexGrow: 1.5 }]}>Service Time</Text> : null}
                                                {item.hotess ? <Text style={styles.text}>{item.currentRate}/hr</Text> : null}
                                                {item.hotess ? <Text style={styles.text}>{item.service}</Text> : null}
                                                {item.hotess ? <Text style={styles.text}>{item.price}</Text> : null}
                                            </View>
                                            <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                            {item.hotess && <><View style={styles.list}>
                                                <Text style={[styles.text, { flex: 0.9 }]}>Hostess</Text>
                                                <Text style={[styles.text, { flex: 2.1 }]}>{item.hotess}</Text>
                                            </View>
                                                <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                            </>
                                            }
                                            {item.wineGlass > 0 && <><View style={styles.list}>
                                                <Text style={[styles.text, { flex: 0.9 }]}>Wine glass</Text>
                                                <Text style={[styles.text, { flex: 2.1 }]}>{item.wineGlass}</Text>
                                            </View>
                                                <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                            </>
                                            }

                                            {item.whiskeyGlass > 0 && <><View style={styles.list}>
                                                <Text style={[styles.text, { flex: 1.2 }]}>Whisky glass</Text>
                                                <Text style={[styles.text, { flex: 2.8 }]}>{item.whiskeyGlass}</Text>
                                            </View>
                                                <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                            </>
                                            }

                                            {item.champagneGlass > 0 && <><View style={styles.list}>
                                                <Text style={[styles.text, { flex: 1.3 }]}>Champagne glass</Text>
                                                <Text style={[styles.text, { flex: 3.0 }]}>{item.champagneGlass}</Text>
                                            </View>
                                                <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View>
                                            </>
                                            }

                                            {/* {item.service&&<View style={styles.list}>
                                       <Text style={styles.text}>Service</Text> 
                                       <Text style={styles.text}>{item.service}</Text>
                                    </View>} */}
                                            {/* <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '5%' }}></View> */}



                                        </View>}
                                    </View>
                                )
                            })}
                        </View>}

                </ScrollView>
                {this.props.items.length ? <View style={[styles.footer]}>
                    <Text style={[styles.text, { fontSize: 13, padding: 10, flexGrow: 2, paddingLeft: 0 }]}>Total</Text>
                    <Text style={[styles.text, { fontSize: 13, padding: 10, marginLeft: '-4%', flexGrow: 4.5, paddingLeft: 0, paddingRight: 0, top: 7 }]}>FCFA {this.props.total}{"\n"}
                        <Text style={{ fontSize: 10 }}>{this.props.language.tax}</Text>
                    </Text>
                    <Text style={[styles.text, { fontSize: 13, padding: 10, marginLeft: '-5%', flexGrow: 6, paddingLeft: 0, paddingRight: 0 }]}>{this.props.language.account}:{"\n"} FCFA 10.000</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('location')}
                        style={[styles.button, { marginBottom: 0, height: 35 }]}>
                        <Text style={[styles.buttonText, { alignContent: 'center' }]}>{this.props.language.paynow}</Text>
                    </TouchableOpacity>
                </View> : null}
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.addedItems,
    total: state.total,
    selection: state.selection,
    language: state.language
})


export default connect(mapStateToProps)(OrderSummary)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BackgroundColor
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
        marginBottom: 5
    },
    logo: {
        height: 80,
        width: 90,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 14,
        padding: 10,
        textAlign: 'center',
        flex: 1,
        flexWrap: 'wrap',
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
        alignSelf: 'center'
    },
    icon: {
        fontSize: 25,
        // color: TextColorWhite
    },
    button: {
        backgroundColor: PrimayColor,
        borderRadius: 100,
        // marginHorizontal: '35%',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 8,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS'
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
        borderColor: PrimayColor,
        marginHorizontal: 5
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
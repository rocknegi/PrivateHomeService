import React, { Component } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native'
import { BackgroundColor, PrimayColor } from './theme/Colors'

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import { removeFromCart, addQuantity, subQuantity, addOption, subOption, addOnAdd } from '../redux/actions'

import _ from 'lodash'

export default class GlassAndServices extends Component {

    state = {
        wineBottles: 0,
        whiskeyBottles: 0,
        champagneBottles: 0,
        error: null,
        maxGlass: 12,
        currentRate: 3000,
        glassesVisible: true,
        item: {
            wineGlass: 0,
            whiskeyGlass: 0,
            champagneGlass: 0,
            hotess: 1,
            price: 0,
            category: 'service',
            id: 'service',
            service: 1,
            currentRate: 0
        },
        obj: {},
    }

    componentDidMount() {
        let wineBottles = this.props.data.filter(item => item.category === 'liquors')
        let whiskeyBottles = this.props.data.filter(item => item.category === 'Whiskey12' || item.category === 'Whiskey15' || item.category === 'Whiskey18')
        let champagneBottles = this.props.data.filter(item => item.category === 'Champagne')
        if (wineBottles.length > 0 && whiskeyBottles.length === 0 && champagneBottles.length === 0)
            this.setState({ glassesVisible: false })
        else {
            if (wineBottles.length > 0) {
                let totalBottles = 0;
                wineBottles.forEach(item => totalBottles += item.quantity)
                this.setState({
                    wineBottles: totalBottles, item: {
                        ...this.state.item,
                        wineGlass: ++this.state.item.wineGlass
                    }
                })
            }
            if (whiskeyBottles.length > 0) {
                let totalBottles = 0;
                whiskeyBottles.forEach(item => totalBottles += item.quantity)
                this.setState({
                    whiskeyBottles: totalBottles, item: {
                        ...this.state.item,
                        whiskeyGlass: ++this.state.item.whiskeyGlass
                    }
                })
            }

            if (champagneBottles.length > 0) {
                let totalBottles = 0;
                champagneBottles.forEach(item => totalBottles += item.quantity)
                this.setState({
                    champagneBottles: totalBottles, item: {
                        ...this.state.item,
                        champagneGlass: ++this.state.item.champagneGlass
                    }
                })
            }
        }
    }

    glassAddition(item, bottle) {
        if (this.state.item[item] >= 4 * this.state[bottle]) {
            alert('Max 4 glasses per bottle')
        }
        else {
            this.setState({
                item: {
                    ...this.state.item,
                    [item]: this.state.item[item] + 1
                }
            }, () => this.handleOk())

        }
    }
    glassSub(item, bottle) {
        if (this.state.item[item] <= 1) {
            alert('Min 1 glasses ')
        }
        else {
            this.setState({
                item: {
                    ...this.state.item,
                    [item]: this.state.item[item] - 1
                }
            },
                () => {
                    let totalGlass = this.state.item.wineGlass + this.state.item.whiskeyGlass + this.state.item.champagneGlass
                    if (totalGlass % 12 === 0
                    ) {
                        if (this.state.currentRate === 5000) this.setState({ currentRate: this.state.currentRate - 2500 })
                        else this.setState({ currentRate: this.state.currentRate - 2500 })
                        this.setState({
                            item: {
                                ...this.state.item,
                                hotess: this.state.item.hotess - 1,
                            }
                        },
                            // ()=>this.setState({currentRate:this.state.currentRate-(2500*this.state.item.hotess)})
                        )
                        this.setState({ maxGlass: this.state.maxGlass - 12 })
                    }
                }
            )
        }
    }
    hotessAddition = () => {
        this.setState({
            item: {
                ...this.state.item,
                service: this.state.item.service + 1,
                price: this.state.currentRate + this.state.item.price
            }
        })
    }
    hotesssub = () => {
        if (this.state.item.service <= 1) {
            alert('Min one service')
        }
        else {
            this.setState({
                item: {
                    ...this.state.item,
                    service: this.state.item.service - 1,
                    price: this.state.item.price - this.state.currentRate
                }
            })
            if (this.state.maxGlass > 12)
                this.setState({ maxGlass: this.state.maxGlass - 12 })
        }

    }
    handleOk = (ok) => {
        let totalGlass = this.state.item.wineGlass + this.state.item.whiskeyGlass + this.state.item.champagneGlass
        if (totalGlass > this.state.maxGlass) {
            this.setState({
                item: {
                    ...this.state.item,
                    hotess: this.state.item.hotess + 1,
                },
            }, () => {
                if (this.state.currentRate === 2500) this.setState({ currentRate: this.state.currentRate * this.state.item.hotess })
                else this.setState({ currentRate: this.state.currentRate + 2500 })
            }
            )
            this.setState({ maxGlass: this.state.maxGlass + 12 },
                // ()=>this.props.increaseTotal(this.state.item)
            )
            // if(ok==='ok')this.props.toggle()
        }
        else return
        // if(ok==='ok')this.props.increaseTotal(this.state.item)
        // if(ok==='ok')this.props.toggle()
        // }

    }
    sendData = () => {
        // this.handleOk();
        this.setState({
            item: {
                ...this.state.item,
                currentRate: this.state.currentRate
            }
        }, () => this.props.increaseTotal(this.state.item))

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#eee', padding: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 5 }}>
                        {this.state.glassesVisible && <View>
                            <Text style={[styles.text, { margin: 10 }]}>Choose your glasses amount</Text>
                            {this.state.wineBottles > 0 && <View style={styles.list} >
                                <Text style={{ fontSize: 16, textAlign: 'center', flex: 0.36, fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', }}>Wine Glass</Text>
                                <Icon onPress={() => this.glassSub('wineGlass', 'wineBottles')} name="minus" style={styles.icon} />
                                <Text style={{ fontSize: 15, fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', width: 21 }}>{this.state.item.wineGlass}</Text>
                                <Icon onPress={() => this.glassAddition('wineGlass', 'wineBottles')} name="plus" style={styles.icon} />
                            </View>}
                            {this.state.whiskeyBottles > 0 && <View style={styles.list} >
                                <Text style={{ fontSize: 16, textAlign: 'center', flex: 0.36, fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', }}>Whisky Glass</Text>
                                <Icon onPress={() => this.glassSub('whiskeyGlass', 'whiskeyBottles')} name="minus" style={styles.icon} />
                                <Text style={{ fontSize: 15, fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', width: 20 }}>{this.state.item.whiskeyGlass}</Text>
                                <Icon onPress={() => this.glassAddition('whiskeyGlass', 'whiskeyBottles')} name="plus" style={styles.icon} />
                            </View>}
                            {this.state.champagneBottles > 0 && <View style={styles.list} >
                                <Text style={{ fontSize: 15, textAlign: 'center', fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', flexWrap: 'wrap', flex: 0.36 }}>Champagne Glass</Text>
                                <Icon onPress={() => this.glassSub('champagneGlass', 'champagneBottles')} name="minus" style={styles.icon} />
                                <Text style={{ fontSize: 15, fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', width: 20 }}>{this.state.item.champagneGlass}</Text>
                                <Icon onPress={() => this.glassAddition('champagneGlass', 'champagneBottles')} name="plus" style={styles.icon} />
                                {this.state.error &&
                                    <Text>{this.state.error}</Text>
                                }
                            </View>}
                        </View>}
                        <Text style={[styles.text, { margin: 15, }]}>Select Hotess and Service</Text>
                        <View style={[styles.list, { marginBottom: 5 }]} >
                            <Text style={{ fontSize: 16, textAlign: 'center', flex: 0.378, fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', }}>Service time{"\n"}<Text style={{ fontSize: 12 }}>(First hour is free)</Text></Text>
                            <Icon onPress={this.hotesssub} name="minus" style={styles.icon} />
                            <Text style={{ fontSize: 17, fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', width: 20 }}>{this.state.item && this.state.item.service}</Text>
                            <Icon onPress={this.hotessAddition} name="plus" style={styles.icon} />
                            {this.state.error &&
                                <Text>{this.state.error}</Text>
                            }
                        </View>
                        <View style={styles.list}>
                            <Text style={styles.text}>{this.state.currentRate} fcfa/ Hr</Text>
                            <Text style={styles.text}>{this.state.item.price} fcfa</Text>
                        </View>

                        <View style={{ marginBottom: 10, flexDirection: 'row' }} >
                            <Text style={{ fontSize: 18, textAlign: 'center', flex: 0.99, fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS' }}>Hostess</Text>
                            {/* <Icon onPress={()=>this.setState({
                                item: {
                                    ...this.state.item,
                                    hotess: this.state.item.hotess - 1,
                                }
                            })} name="minus" style={styles.icon} /> */}
                            <Text style={{ fontSize: 18, flex: 0.1 }}>{this.state.item && this.state.item.hotess}</Text>
                            {/* <Icon onPress={()=>this.setState({
                                item: {
                                    ...this.state.item,
                                    hotess: this.state.item.hotess + 1,
                                }
                            })} name="plus" style={styles.icon} /> */}
                            <Text style={styles.text}>           </Text>
                            {this.state.error &&
                                <Text>{this.state.error}</Text>
                            }

                        </View>
                        <View style={{ padding: 5 }}>
                            <Text style={{ fontSize: 12, fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', }}>* First Service Hour free</Text>
                            <Text style={{ fontSize: 12, fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', }}>** For each 12 glasses,you get one more hostess</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity
                                onPress={this.props.toggle}
                                style={[styles.button, { marginTop: 10, width: '30%' }]}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.sendData}
                                style={[styles.button, { marginTop: 10, width: '30%' }]}>
                                <Text style={styles.buttonText}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BackgroundColor
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: '2%'
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
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
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
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        padding: 10,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
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
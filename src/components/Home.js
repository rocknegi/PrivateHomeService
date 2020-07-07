import React, { Component, Fragment } from 'react'
import { Text, View, SafeAreaView, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { PrimayColor } from './theme/Colors'
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux';
import images from '../assets/images';
import firebase from 'react-native-firebase';
import { set } from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

const Discounted = firebase.firestore().collection('Discounted');

const data = [
    {
        id: 1,
        name: 'Pack selection',
        category: 'liquors'
    },
    {
        id: 2,
        name: 'Whiskey 12 Years',
        category: 'Whiskey12'
    },
    {
        id: 3,
        name: 'Whiskey 15 Years',
        category: 'Whiskey15'
    },
    {
        id: 4,
        name: 'Whiskey 18 Years',
        category: 'Whiskey18'
    },
    {
        id: 5,
        name: 'Champagne ',
        category: 'Champagne'
    },

]

const order = firebase.firestore().collection('Managers');

class Home extends Component {
    static navigationOptions = ({ }) => {
        return {
            headerShown: false,
            title: '',
        }
    }

    state = {
        DisocuntedItems: [],
        notification: false,
        phoneNo: ''
    }

    async componentDidMount() {
        const items = []
        Discounted.get().then(doc => {
            doc.forEach(item => {
                items.push(({ ...item.data(), id: item.id }));
            })
            this.setState({ DisocuntedItems: items })
        }
        );

        const phoneNo = await AsyncStorage.getItem('phoneNo');
        this.setState({ phoneNo })

        order.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().phoneNo == this.state.phoneNo) {
                    this.setState({ notification: doc.data().confirmed })
                }
            })
        })

    }

    render() {
        return (
            <View style={styles.linearGradient}>
                <SafeAreaView style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: PrimayColor, height: 50 }}>
                        <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                            <Icon style={{ fontSize: 30, left: 5, marginRight: 5 }} name="menu" onPress={() => this.props.navigation.openDrawer()} />
                            {this.state.notification && <View style={styles.circle}>
                                <View style={styles.count}>
                                    <Text style={{ textAlign: 'center', }}>
                                        1
                                    </Text>
                                </View>

                            </View>}
                        </View>
                        <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                            {this.props.itemsInCart > 0 && <View style={styles.circle}>
                                <View style={styles.count}>
                                    <Text style={{ textAlign: 'center', }}>
                                        {this.props.itemsInCart}
                                    </Text>
                                </View>

                            </View>}
                            <MaterialIcon onPress={() => this.props.navigation.navigate('Cart', {
                            })} name="shopping-cart" style={{ fontSize: 30, marginRight: 10 }} />

                        </View>

                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                        <Image
                            source={images.logoBlack}
                            style={[styles.logo, { alignSelf: 'center' }]}
                        />
                        <Text style={{ fontSize: Platform.OS === 'android' ? 25 : 16, fontFamily: Platform.OS === 'android' ? 'HT Gelateria W01 Regular' : 'ComicSansMS', textAlign: 'center', marginBottom: 5 }}>
                            Vos besoins sont nos Services
                    </Text>
                        <View style={{ marginHorizontal: '13%' }}>
                            <Text style={[styles.text, {
                                alignSelf: 'flex-end',
                                fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
                                fontStyle: 'italic',
                                fontWeight: 'bold'
                            }]}>
                                Our Selection
                            </Text>
                            {data.map(item => {
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => this.props.navigation.navigate('SelctedCategory', {
                                            category: item.category,
                                            name: item.name
                                        })}
                                        style={styles.list}>
                                        <Text style={[styles.text, { padding: 10 }]}>{item.name}</Text>
                                        <Icon name="arrow-right" style={styles.icon} />
                                    </TouchableOpacity>
                                )
                            })}
                            <Text style={[styles.text, {
                                fontStyle: 'italic',
                                fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
                                fontWeight: 'bold', alignSelf: 'flex-end'
                            }]}>Discounted</Text>
                            <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']} style={{ height: 1.5, marginHorizontal: '2%' }}></LinearGradient>
                        </View>


                        <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {this.state.DisocuntedItems.length >= 1 &&
                                <View style={{ flex: 1, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'flex-end', paddingTop: 5 }}>
                                    {this.state.DisocuntedItems.map(item => (
                                        <Fragment key={item.image}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('SelctedCategory', {
                                                    category: item.desc,
                                                    name: item.label
                                                })}
                                            >
                                                <Image
                                                    style={{ height: 100, width: Dimensions.get('screen').width / 4, resizeMode: 'contain', marginBottom: 5 }}
                                                    source={{ uri: item.image }}
                                                />
                                            </TouchableOpacity>
                                            <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']} style={{ height: 100, width: 1.5, marginTop: 20, marginLeft: 10, marginRight: 10 }}><Text> </Text></LinearGradient>
                                        </Fragment>
                                    ))}
                                </View>}
                            {/* <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('SelctedCategory', {
                                        category: 'liquors',
                                        name: 'Liquors & wines'
                                    })}
                                >
                                    <Image
                                        style={{ height: 100, width: Dimensions.get('screen').width / 4, resizeMode: 'contain' }}
                                        source={{ uri: 'https://cdn.shopify.com/s/files/1/0046/8687/2649/products/TOUR_CANTELOUP_BLANC_VIN_BLANC_MOELLEUX_75CL_1_1_600x600.jpg?v=1561551685' }}
                                    />
                                </TouchableOpacity>
                                <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']} style={{ height: 100, width: 1.5, marginTop: 20, marginLeft: 10, marginRight: 10 }}><Text> </Text></LinearGradient>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('SelctedCategory', {
                                        category: 'Champagne',
                                        name: 'Champagne'
                                    })}
                                >
                                    <Image
                                        style={{ height: 100, width: Dimensions.get('screen').width / 4, resizeMode: 'contain' }}
                                        source={images.champagne}
                                    />
                                </TouchableOpacity>

                                <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']} style={{ height: 100, width: 1.5, marginTop: 20, marginLeft: 10, marginRight: 10 }}><Text> </Text></LinearGradient>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('SelctedCategory', {
                                        category: 'Whiskey12',
                                        name: 'Whiskey 12 Years'
                                    })}>
                                    <Image
                                        style={{ height: 100, width: Dimensions.get('screen').width / 4, resizeMode: 'contain' }}
                                        source={{ uri: 'https://i.imgur.com/aRBEehx.jpg' }}
                                    />
                                </TouchableOpacity>
                                <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']} style={{ height: 100, width: 1.5, marginTop: 20, marginLeft: 10, marginRight: 10 }}><Text> </Text></LinearGradient>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('SelctedCategory', {
                                        category: 'Whiskey18',
                                        name: 'Whiskey 18 Years'
                                    })}>
                                    <Image
                                        style={{ height: 100, width: Dimensions.get('screen').width / 4, resizeMode: 'contain' }}
                                        source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/71TJyxwtgmL._AC_SL1500_.jpg' }}
                                    />
                                </TouchableOpacity>
                                <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']} style={{ height: 100, width: 1.5, marginTop: 20, marginLeft: 10, marginRight: 10 }}><Text> </Text></LinearGradient>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('SelctedCategory', {
                                        category: 'Whiskey15',
                                        name: 'Whiskey 15 Years'
                                    })}>
                                    <Image
                                        style={{ height: 100, width: Dimensions.get('screen').width / 4, resizeMode: 'contain' }}
                                        source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/91uKOYIrm9L._AC_SL1500_.jpg' }}
                                    />
                                </TouchableOpacity> */}

                        </ScrollView>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        itemsInCart: state.itemsInCart
    }
}

export default connect(mapStateToProps)(Home)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    linearGradient: {
        flex: 1,
        // paddingLeft: 5,
        // paddingRight: 5,
        borderRadius: 5
    },
    logo: {
        height: Dimensions.get('window').width / 3.2,
        width: Dimensions.get('window').width / 3.2,
        resizeMode: 'contain',
        marginBottom: 10,
        // marginTop: 20
    },
    text: {
        fontSize: 18,
        // textAlign: 'center',
        padding: 5,
        // marginBottom: 10,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: PrimayColor,
        backgroundColor: '#fafafa',
        marginBottom: 8,
        // marginHorizontal: '13%',
        elevation: 10,
    },
    icon: {
        fontSize: 25,
        right: 20,
        color: PrimayColor
    },
    scrollList: {
        height: 150,
        width: 180,
        resizeMode: 'contain',
        marginLeft: 10
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fafafa',
    },
    count: { color: '#FFF' },
})
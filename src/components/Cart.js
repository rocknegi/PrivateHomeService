import React, { Component } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Platform, Alert } from 'react-native'
import { BackgroundColor, PrimayColor } from './theme/Colors'
import Layout from './theme/Layout'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import { removeFromCart, addQuantity, subQuantity, addOption, subOption, addOnAdd, addToCart } from '../redux/actions'
import Modal from 'react-native-modal';
import _ from 'lodash'
import firestore from '@react-native-firebase/firestore';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import GlassAndServices from './GlassAndServices'
import images from '../assets/images'

class Cart extends Component {
    state = {
        isModal: false,
        loading: false,
        res: null,
        seesha: null,
        liquors: null,
        complimentary: [],
        imageModal: false,
        image: ''
    }
    static navigationOptions = ({ navigation }, props) => {
        return {
            headerShown: false,
            title: '',
        }
    }
    componentDidMount() {
        const Free = firestore().collection('Free');
        let complimentary = [];

        Free.get().then(snapshot => {
            snapshot.forEach(doc => {
                complimentary.push(({ ...doc.data(), id: doc.id }))
            });
            // console.log(JSON.stringify(complimentary,undefined,2))
            this.setState({ complimentary })
        });

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.props.removeItem('service');
        });
        this.setState({ seesha: this.props.items.filter(e => e.category === 'seesha') })
        this.setState({ liquors: this.props.items.filter(e => e.category === 'liquors') }, () => {
            // console.log(this.state.liquors)
        })
    }

    toggleModal = () => {
        this.setState({ isModal: !this.state.isModal, })
    }

    toggleImageModal = () => {
        this.setState({ imageModal: !this.state.imageModal, })
    }


    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    handleSubtractQuantity = (id, seesha) => {
        this.props.subtractQuantity(id, seesha);
    }
    handleAddOption = (id) => {
        this.props.addOption(id);
    }
    handleSubtractOption = (id) => {
        this.props.subOption(id);
    }
    increaseTotal = (item) => {
        // const item = [data]
        this.props.addToCart(item, 'service');
        this.props.navigation.navigate('orderSummary', {
            data: this.state.complimentary
        });
        this.toggleModal()
    }

    setImage = (image) => {
        this.setState({ image: image })
        this.toggleImageModal()
    }
    render() {
        return (
            <Layout>
                <View style={{ marginHorizontal: '0%', flex: 1 }}>
                    <View style={{ backgroundColor: PrimayColor, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50 }}>
                        <Icon style={{ fontSize: 30, left: 5 }} name="arrow-left" onPress={() => this.props.navigation.goBack()} />
                        <Text style={[styles.text, { textAlign: 'left' }]}>Cart</Text>

                    </View>
                    {this.props.items.length ?
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.textHeading}>Free of charge</Text>
                            {this.state.complimentary.map((item, i) => {
                                return (
                                    <View key={item.title}>
                                        <View style={[styles.list, { marginHorizontal: '0%' }]}>
                                            <TouchableOpacity onPress={() => this.setImage(item.image)}>
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={{
                                                        height: 70,
                                                        width: 70,
                                                        resizeMode: 'contain',
                                                        marginTop: '5%'
                                                    }}
                                                />
                                            </TouchableOpacity>
                                            <Text style={[styles.text, { flex: 0.65, flexWrap: 'wrap', left: '20%', alignSelf: 'center', top: 8, fontSize: 15 }]}>{item.title}</Text>
                                        </View>
                                        {i < this.state.complimentary.length - 1 && <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '15%' }}></View>}
                                    </View>
                                )
                            })}
                            <View>
                                {this.props.items.find(e => e.category === 'Social') && <Text style={styles.textHeading}>Social games</Text>}
                                {this.props.items.filter(e => e.category === 'Social').map(item => {
                                    return (
                                        <View>
                                            <View style={styles.list} >
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={styles.logo}
                                                />
                                                <Text style={{ fontSize: 20, textAlign: 'center' }}>{item.title}</Text>
                                                <Text style={{ fontSize: 20 }}>FCFA{item.price}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                <TouchableOpacity style={styles.button} onPress={() => this.handleRemove(item.id)}>
                                                    <Text style={styles.buttonText}>Remove</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            <View>
                                {this.props.items.find(e => e.category === 'Seesha') && <Text style={styles.textHeading}>Shisha</Text>}
                                {this.state.seesha && this.props.items.filter(e => e.category === 'Seesha').map((item, i) => {
                                    return (
                                        <View key={item.title}>
                                            <View style={styles.list} >
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={styles.logo}
                                                />
                                                <Text style={styles.text}>{item.title}{"\n"}FCFA {item.price}/Unit</Text>
                                                <Icon onPress={() => this.handleSubtractQuantity(item.id, 'seesha')} name="minus" style={styles.icon} />
                                                <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
                                                <Icon onPress={() => this.handleAddQuantity(item.id, 'seesha')} name="plus" style={styles.icon} />
                                            </View>
                                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                <TouchableOpacity style={styles.button} onPress={() => this.handleRemove(item.id)}>
                                                    <Text style={styles.buttonText}>Remove</Text>
                                                </TouchableOpacity>
                                            </View> */}
                                            {i < this.state.seesha.length - 1 && <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '15%' }}></View>}

                                        </View>
                                    )
                                })}
                            </View>
                            {this.props.items.find(e => e.category === 'liquors') && <Text style={styles.textHeading}>liqueurs & Wines</Text>}
                            {this.state.liquors && this.props.items.filter(e => e.category === 'liquors').map((item, i) => {
                                return (
                                    <View key={item.title}>
                                        <View style={styles.list} >
                                            <Image
                                                source={{ uri: item.image }}
                                                style={styles.logo}
                                            />
                                            <Text style={styles.text}>{item.title}{"\n"}FCFA {item.price}/Unit</Text>
                                            <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                            <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
                                            <Icon onPress={() => this.handleAddQuantity(item.id)} name="plus" style={styles.icon} />

                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <TouchableOpacity style={styles.button} onPress={() => this.toggleModal(item)}>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.button} onPress={() => this.handleRemove(item.id)}>
                                                <Text style={styles.buttonText}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {i < this.state.liquors.length - 1 && <View style={{ borderBottomWidth: 2, borderBottomColor: '#e0e0e0', marginHorizontal: '15%' }}></View>}
                                    </View>
                                )
                            })}
                            {this.props.items.find(e => e.category === 'Whiskey12') && <Text style={styles.textHeading}>Whiskey 12 Years</Text>}
                            {this.props.items.filter(e => e.category === 'Whiskey12').map(item => {
                                return (
                                    <View key={item.title}>
                                        <View style={styles.list} >
                                            <Image
                                                source={{ uri: item.image }}
                                                style={styles.logo}
                                            />
                                            <Text style={styles.text}>{item.title}{"\n"}FCFA {item.price}/Unit</Text>
                                            <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                            <Text style={{ fontSize: 18, }}>{item.quantity}</Text>
                                            <Icon onPress={() => this.handleAddQuantity(item.id)} name="plus" style={styles.icon} />

                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <TouchableOpacity style={styles.button} onPress={() => this.toggleModal(item)}>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.button} onPress={() => this.handleRemove(item.id)}>
                                                <Text style={styles.buttonText}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.modal}>

                                        </View>

                                    </View>
                                )
                            })}
                            {this.props.items.find(e => e.category === 'Whiskey15') && <Text style={styles.textHeading}>Whiskey 15 Years</Text>}
                            {this.props.items.filter(e => e.category === 'Whiskey15').map(item => {
                                return (
                                    <View key={item.title}>
                                        <View style={styles.list} >
                                            <Image
                                                source={{ uri: item.image }}
                                                style={styles.logo}
                                            />
                                            <Text style={styles.text}>{item.title}{"\n"}FCFA {item.price}/Unit</Text>
                                            <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                            <Text style={{ fontSize: 18, }}>{item.quantity}</Text>
                                            <Icon onPress={() => this.handleAddQuantity(item.id)} name="plus" style={styles.icon} />

                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <TouchableOpacity style={styles.button} onPress={() => this.toggleModal(item)}>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.button} onPress={() => this.handleRemove(item.id)}>
                                                <Text style={styles.buttonText}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.modal}>


                                        </View>

                                    </View>
                                )
                            })}
                            <View>
                                {this.props.items.find(e => e.category === 'Whiskey18') && <Text style={styles.textHeading}>Whiskey 18 Years</Text>}
                                {this.props.items.filter(e => e.category === 'Whiskey18').map(item => {
                                    return (
                                        <View key={item.title}>
                                            <View style={styles.list} >
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={styles.logo}
                                                />
                                                <Text style={styles.text}>{item.title}{"\n"}FCFA {item.price}/Unit</Text>
                                                <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                                <Text style={{ fontSize: 18, }}>{item.quantity}</Text>
                                                <Icon onPress={() => this.handleAddQuantity(item.id)} name="plus" style={styles.icon} />

                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button} onPress={() => this.toggleModal(item)}>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.button} onPress={() => this.handleRemove(item.id)}>
                                                    <Text style={styles.buttonText}>Remove</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.modal}>


                                            </View>

                                        </View>
                                    )
                                })}</View>
                            <View>
                                {this.props.items.find(e => e.category === 'Champagne') && <Text style={styles.textHeading}>Champagne</Text>}
                                {this.props.items.filter(e => e.category === 'Champagne').map(item => {
                                    return (
                                        <View key={item.title}>
                                            <View style={styles.list} >
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={styles.logo}
                                                />
                                                <Text style={styles.text}>{item.title}{"\n"}FCFA {item.price}/Unit</Text>
                                                <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                                <Text style={{ fontSize: 18, }}>{item.quantity}</Text>
                                                <Icon onPress={() => this.handleAddQuantity(item.id)} name="plus" style={styles.icon} />

                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.button} onPress={() => this.toggleModal(item)}>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.button} onPress={() => this.handleRemove(item.id)}>
                                                    <Text style={styles.buttonText}>Remove</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.modal}>


                                            </View>

                                        </View>
                                    )
                                })}</View>


                            <Modal
                                isVisible={this.state.isModal}
                                scrollHorizontal={true}
                                animationIn="slideInUp"
                                onBackdropPress={() => this.toggleModal()}
                                style={{ marginTop: 10 }}
                                useNativeDriver={true}
                            >
                                <GlassAndServices toggle={this.toggleModal} increaseTotal={this.increaseTotal} data={this.props.items} />
                            </Modal>

                            <Modal
                                isVisible={this.state.imageModal}
                                scrollHorizontal={true}
                                animationIn="slideInUp"
                                onBackdropPress={this.toggleImageModal}
                                style={{ marginTop: 10 }}
                                useNativeDriver={true}
                            >
                                <Image
                                    source={{ uri: this.state.image }}
                                    style={{ height: '60%', resizeMode: 'contain' }}
                                />
                                <TouchableOpacity style={styles.button} onPress={this.toggleImageModal}>
                                    <Text style={styles.buttonText}>Close</Text>
                                </TouchableOpacity>
                            </Modal>
                        </ScrollView> : <Text style={[styles.text]}>Your cart is empty</Text>}
                    {this.props.items.length ? <View style={styles.footer}>
                        <Text style={[styles.text, { fontSize: 13, flex: 0.3 }]}>Total </Text>
                        <Text style={[styles.text, { fontSize: 13, flex: 0.5, left: '-30%' }]}>fcfa {this.props.total}</Text>
                        <Text style={[styles.text, { fontSize: 13, flex: 0.6, left: '-40%' }]}>Account: {"\n"}fcfa 10.000</Text>
                        <TouchableOpacity
                            onPress={this.toggleModal}
                            style={[styles.button, { marginBottom: 0, width: '25%', left: '-25%' }]}>
                            <Text style={[styles.buttonText, { alignContent: 'center' }]}>Buy Now</Text>
                        </TouchableOpacity>
                    </View> : null}
                </View>
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
        subtractQuantity: (id) => { dispatch(subQuantity(id)) },
        addOption: (id) => { dispatch(addOption(id)) },
        subOption: (id) => { dispatch(subOption(id)) },
        addOnAdd: (item, option) => { dispatch(addOnAdd(item, option)) },
        addToCart: (id, category) => { dispatch(addToCart(id, category)) },
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
        marginBottom: 20,
        marginHorizontal: '5%'
    },
    logo: {
        height: 80,
        width: 70,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    text: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
        flex: 0.8,
        flexWrap: 'wrap'
    },
    icon: {
        fontSize: 25,
        // color: TextColorWhite
    },
    button: {
        backgroundColor: PrimayColor,
        borderRadius: 100,
        // marginHorizontal: '35%',
        // height: 35,
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
    },
    modal: {
        flexDirection: 'row', justifyContent: 'space-between',
    },
    footer: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: PrimayColor,
        marginHorizontal: '3%',
        paddingVertical: '2%'
    },
    textHeading: {
        fontSize: 19,
        textAlign: 'center',
        padding: 5,
        margin: 20,
        backgroundColor: '#eee',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: PrimayColor,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS'
    }
})
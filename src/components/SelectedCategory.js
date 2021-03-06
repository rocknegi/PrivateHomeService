import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native'
import { BackgroundColor, PrimayColor, TextColorWhite } from './theme/Colors'
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box'
import Layout from './theme/Layout'
import { connect } from 'react-redux'
import { addToCart, addQuantity, subQuantity, removeFromCart, fetchData } from '../redux/actions';
import Modal from 'react-native-modal';
// import firestore from '@react-native-firebase/firestore';
import firebase from 'react-native-firebase';
import Sheesha from './Sheesha';
import SocialGames from './SocialGames';
import { sub } from 'react-native-reanimated';


class SelectedCategory extends Component {
    counter = () => <View style={styles.circle}>
        <View style={styles.count}>{this.state.count}</View>
    </View>
    static navigationOptions = ({ navigation }, props) => {
        return {
            headerShown: false,
            title: '',
        }
    }
    state = {
        count: 0,
        category: this.props.navigation.getParam('category'),
        selected: [],
        total: 0,
        title: this.props.navigation.getParam('name'),
        seeshaModal: false,
        socialGamesModal: false,
        seeMoreModal: false,
        data: [],
        imageModal: false,
        image: ''
    }
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ count: this.props.added.length })
        });
        if (this.state.category === 'seesha')
            this.props.fetchData('seesha')
        else if (this.state.category === 'games')
            this.props.fetchData('games')
        else if (this.state.category.includes('DD'))
            this.props.fetchData('DD')
        else this.props.fetchData('');

        const db = firebase.firestore().collection(`SeeMoreChampagne`);
        const data = []
        db.get().then(snapshot => {
            snapshot.forEach(doc => {
                data.push(({ ...doc.data(), id: doc.id }))
            })
            this.setState({ data })
        });

    }

    componentWillUnmount() {
        this.focusListener.remove();
    }
    calculate = (item) => {

    }
    handleRemove = (id) => {
        this.props.removeItem(id);
        this.setState({ count: this.state.count - 1 })
    }
    handleClick = (item, category) => {
        if (this.state.category !== 'seesha' && this.state.category !== 'games') {
            this.props.addToCart(item, category);
        }
        else {
            this.props.addToCart(this.state.selected, category);
        }
        this.setState({ count: this.props.added.length + 1 })
    }
    handleAddQuantity = (item) => {
        if (this.state.category !== 'seesha'
            && this.state.category !== 'games'
        ) {
            this.props.addQuantity(item);
        }
        else {
            if (this.state.selected.find(e => e.id === item.id)) {
                item.quantity++;
                this.setState((state) => ({
                    selected: [...state.selected],
                    total: state.total + item.price
                }))
            }
            else {
                item.quantity++;
                this.setState((state) => ({
                    selected: [...state.selected, item],
                    total: state.total + item.price
                }))
            }
        }
        // this.setState({selected:item})
        this.calculate(item)

    }
    handleSubtractQuantity = (item) => {
        if (item.quantity > 0) {
            item.quantity--
            this.setState((state) => ({
                selected: [...state.selected, item],
                total: state.total - item.price
            }))
        }
        // this.props.subtractQuantity(id);
    }

    toggleModal = (modal) => {

        if (this.props.itemsInCart > 0)
            this.setState({ [modal]: !this.state[modal] })
        else if (modal === 'seeMoreModal')
            this.setState({ [modal]: !this.state[modal] })
        else return
    }
    handleSeeshaModal = () => {
        this.toggleModal('seeshaModal');
        this.props.fetchData('')
    }
    handleSocialGamesModal = () => {
        this.toggleModal('socialGamesModal');
        if (this.props.selection === 'phs')
            this.props.fetchData('')
        else
            this.props.fetchData('DD')
    }
    toggleImageModal = () => {
        this.setState({ imageModal: !this.state.imageModal, })
    }
    setImage = (image) => {
        this.setState({ image: image })
        this.toggleImageModal()
    }

    notiifcation = () => <View style={styles.circle}>
        <Text style={styles.count}>{this.props.items.length}</Text>
    </View>
    render() {
        // alert(JSON.stringify(this.props.items))
        return (
            <Layout>
                <View style={{ backgroundColor: PrimayColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
                    <Icon style={{ fontSize: 30, left: 5 }} name="arrow-left" onPress={() => this.props.navigation.goBack()} />
                    <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                        {this.props.itemsInCart > 0 && <View style={styles.circle}>
                            <View style={styles.count}>
                                <Text style={{ textAlign: 'center', }}>
                                    {this.props.itemsInCart}
                                </Text>
                            </View>

                        </View>}
                        <MaterialIcon onPress={() => this.props.navigation.navigate('Cart', {
                            category: this.state.category
                        })} name="shopping-cart" style={{ fontSize: 30, marginRight: 5 }} />

                    </View>

                </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {this.props.items && <View style={{ flex: 1 }}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 15, marginTop: 5 }}>
                                {this.props.selection === 'phs' ? <>
                                    <Text
                                        style={{
                                            fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
                                            backgroundColor: this.props.itemsInCart > 0 ? PrimayColor : '#fafafa',
                                            fontSize: 18, borderRadius: 8, textAlign: 'center', borderWidth: 2, borderColor: PrimayColor, padding: '4%', paddingHorizontal: '7.2%', alignSelf: 'center'
                                        }}
                                        onPress={() => this.toggleModal('seeshaModal')}
                                    >SHISHA</Text>
                                    <Text
                                        onPress={() => this.toggleModal('socialGamesModal')}
                                        style={{
                                            fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
                                            backgroundColor: this.props.itemsInCart > 0 ? PrimayColor : '#fafafa',
                                            fontSize: 18, borderRadius: 8, textAlign: 'center', borderWidth: 2, borderColor: PrimayColor, paddingLeft: '10%', paddingRight: '10%', paddingTop: '0.4%', paddingBottom: '0.4%', alignSelf: 'center'
                                        }}
                                    >{this.props.language.games1} {"\n"}{this.props.language.games2}</Text>
                                </> :
                                    <Text
                                        onPress={() => this.toggleModal('socialGamesModal')}
                                        style={{
                                            fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
                                            backgroundColor: this.props.itemsInCart > 0 ? PrimayColor : '#fafafa',
                                            fontSize: 18, borderRadius: 8, textAlign: 'center', borderWidth: 2, borderColor: PrimayColor, padding: '4%', paddingHorizontal: '7.2%', alignSelf: 'center'
                                        }}
                                    >{this.props.language.extra}</Text>
                                }
                            </View>
                            <Text style={{
                                fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
                                fontSize: 18, textAlign: 'center', borderWidth: 2, borderColor: PrimayColor, padding: 8, marginHorizontal: '10%', marginBottom: 10
                            }}>{this.state.title}
                                {/* <Text style={{ fontSize: 14 }}>{this.props.selection === 'phs' ? ' (Home Services)' : ' (Drink Delivery)'}</Text> */}
                            </Text>

                            {this.props.items.filter(e => e.category === this.state.category.replace('DD', '')).map(item => {
                                return (
                                    <View key={item.title}>
                                        <View>

                                            <View style={styles.list} >
                                                <TouchableWithoutFeedback onPress={() => this.setImage(item.image)}>
                                                    <Image
                                                        source={{ uri: item.image }}
                                                        style={styles.logo}
                                                    />
                                                </TouchableWithoutFeedback>
                                                <Text style={styles.text}>
                                                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                                                    {"\n"}{item.desc}
                                                    {"\n"}
                                                    {this.state.category === 'liquors' ? <Text style={{ fontWeight: 'bold' }}>FCFA {item.price}/pack</Text> : <Text style={{ fontWeight: 'bold' }}>FCFA {item.price}/Btle</Text>}
                                                    {/* {"\n"}<Text onPress={() => this.toggleModal('seeMoreModal')}
                                                        style={{ textDecorationLine: 'underline' }}>See more</Text> */}
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => this.handleClick(item, this.state.category)}
                                                    style={styles.button}
                                                    key={item.price}>
                                                    <Text style={styles.buttonText}>{this.props.language.addCart}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.option}>
                                                {/* <Text style={[styles.text, { padding: 0, fontSize: 22 }]}>FCFA{item.price}/unit</Text> */}
                                                {/* <TouchableOpacity
                                                        onPress={() => this.handleClick(item, this.state.category)}
                                                        style={styles.button}
                                                        key={item.price}>
                                                        <Text style={styles.buttonText}>add to cart</Text>
                                                    </TouchableOpacity> */}
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                        <Modal isVisible={this.state.seeMoreModal}
                            onBackdropPress={() => this.toggleModal('seeMoreModal')}
                            style={{ flex: 1, marginTop: '50%', backgroundColor: '#fafafa', padding: 10 }}
                            useNativeDriver={true}
                        >
                            <>
                                <ScrollView style={{ flexDirection: 'row', }} horizontal={true}
                                    contentContainerStyle={{ justifyContent: 'center' }}
                                >
                                    {this.state.data.map(item => (
                                        <View key={item.desc} >
                                            <Image style={{ height: 200, width: 200, resizeMode: 'contain', justifyContent: 'center', alignSelf: 'center' }} source={{ uri: item.image }} />
                                            <Text style={[styles.text, { textAlign: 'center' }]}>{item.desc}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                                <TouchableOpacity style={styles.button}
                                    onPress={() => this.toggleModal('seeMoreModal')}
                                >
                                    <Text style={styles.buttonText}>Close</Text>
                                </TouchableOpacity>
                            </>
                        </Modal>
                        <Modal isVisible={this.state.seeshaModal}
                            onBackdropPress={this.handleSeeshaModal}
                            style={{ flex: 1, marginTop: '20%', backgroundColor: '#fafafa', padding: 10 }}
                            useNativeDriver={true}
                        >
                            <Sheesha toggle={this.handleSeeshaModal} />
                        </Modal>


                        <Modal
                            isVisible={this.state.socialGamesModal}
                            onBackdropPress={this.handleSocialGamesModal}
                            style={{ flex: 1, marginTop: '20%', backgroundColor: '#fafafa', padding: 10 }}
                            useNativeDriver={true}
                        >
                            <SocialGames toggle={this.handleSocialGamesModal} />
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
                            <TouchableOpacity style={{
                                backgroundColor: PrimayColor,
                                borderRadius: 100,
                                // marginHorizontal: '35%',
                                // height: 35,
                                justifyContent: 'center',
                                marginBottom: 10
                            }} onPress={this.toggleImageModal}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </Modal>

                    </View>
                    }



                </ScrollView>
                {this.state.category !== 'seesha' && this.state.category !== 'games' ? <View style={styles.footer}>
                    <Text style={[styles.text, { fontSize: 20, flex: 0 }]}>Total</Text>
                    <Text style={[styles.text, { textAlign: 'right', fontSize: 20, padding: 5, alignSelf: 'center' }]}>FCFA {this.props.total} </Text>
                </View> : <View style={styles.footer}>
                        <Text style={[styles.text, { fontSize: 22 }]}>Total</Text>
                        <Text style={[styles.text, { textAlign: 'right', fontSize: 25, padding: 5, alignSelf: 'center' }]}>FCFA {this.state.total} </Text>
                    </View>}
            </Layout>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        total: state.total,
        added: state.addedItems,
        itemsInCart: state.itemsInCart,
        selection: state.selection,
        language: state.language
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id, category) => { dispatch(addToCart(id, category)) },
        addQuantity: (item,) => { dispatch(addQuantity(item)) },
        subtractQuantity: (id) => { dispatch(subQuantity(id)) },
        removeItem: (id) => { dispatch(removeFromCart(id)) },
        fetchData: (category) => { dispatch(fetchData(category)) }

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
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: '10%'
    },
    logo: {
        height: 80,
        width: 80,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    text: {
        flex: 1,
        fontSize: 13,
        padding: 10,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
    },
    icon: {
        fontSize: 25,
        // backgroundColor:'#fd8539',
        marginTop: -10,
        alignSelf: 'center'
    },
    button: {
        borderRadius: 100,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 2,
        backgroundColor: PrimayColor

    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        // fontSize: 15,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
        padding: 10
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fafafa',
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
        borderColor: PrimayColor,
        marginHorizontal: '10%'
    }
})


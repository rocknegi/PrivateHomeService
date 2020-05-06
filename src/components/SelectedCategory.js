import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native'
import { BackgroundColor, PrimayColor, TextColorWhite } from './theme/Colors'
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box'
import Layout from './theme/Layout'
import { connect } from 'react-redux'
import { addToCart, addQuantity, subQuantity, removeFromCart, fetchData } from '../redux/actions';
import Modal from 'react-native-modal';
import Sheesha from './Sheesha';
import SocialGames from './SocialGames';


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
        title:this.props.navigation.getParam('name'),
        seeshaModal:false,
        socialGamesModal:false,
        seeMoreModal:false
    }
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ count: this.props.added.length })
        });
        if (this.state.category === 'seesha')
            this.props.fetchData('seesha')
            else if(this.state.category==='games')
            this.props.fetchData('games')
        else this.props.fetchData('');

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
        if (this.state.category !== 'seesha'&&this.state.category !== 'games') {
            this.props.addToCart(item, category);
        }
        else {
            this.props.addToCart(this.state.selected, category);
        }
        this.setState({ count: this.props.added.length + 1 })
    }
    handleAddQuantity = (item) => {
        if (this.state.category !== 'seesha'
        &&this.state.category !== 'games'
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
            item.quantity --
            this.setState((state) => ({
                selected: [...state.selected, item],
                total: state.total - item.price
            }))
        }
        // this.props.subtractQuantity(id);
    }

    toggleModal = (modal)=>{
        this.setState({[modal]:!this.state[modal]})
    }
    handleSeeshaModal = ()=>{
        this.toggleModal('seeshaModal');
        this.props.fetchData('')
    }
    handleSocialGamesModal = ()=>{
        this.toggleModal('socialGamesModal');
        this.props.fetchData('')
    }

    notiifcation = () => <View style={styles.circle}>
        <Text style={styles.count}>{this.props.items.length}</Text>
    </View>
    render() {
        // alert(JSON.stringify(this.props.items))
        return (
            <Layout>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                    <Icon style={{ fontSize: 25, left: 5 }} name="arrow-left" onPress={() => this.props.navigation.goBack()} />
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
                        })} name="shopping-cart" style={{ fontSize: 25, }} />

                    </View>

                </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {this.props.items && <View style={{ flex: 1 }}>
                            <View>
                            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:15,marginTop:5}}>
                                                    <Text
                                                    style={{fontSize: 22,borderRadius:8,textAlign:'center',borderWidth:2,borderColor:PrimayColor,padding:'8%',alignSelf:'center'}}
                                                    onPress={()=>this.toggleModal('seeshaModal')}
                                                    >Seesha</Text>
                                                    <Text
                                                    onPress={()=>this.toggleModal('socialGamesModal')}
                                                    style={{fontSize: 22,borderRadius:8,textAlign:'center',borderWidth:2,borderColor:PrimayColor,paddingLeft:'8%',paddingRight:'8%',paddingTop:'5%',paddingBottom:'5%',alignSelf:'center'}}
                                                    >Social {"\n"}Games</Text>
                                                </View>
                                                <Text style={{fontSize: 22,textAlign:'center',borderWidth:2,borderColor:PrimayColor,padding:8,marginHorizontal:'10%',marginBottom:10}}>{this.state.title}</Text>

                                {this.props.items.filter(e => e.category === this.state.category).map(item => {
                                    return (
                                        <View key={item.id}>
                                            <View>
                                                
                                                <View style={styles.list} >
                                                    <Image
                                                        source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                                        style={styles.logo}
                                                    />
                                                    <Text style={styles.text}>{item.title}{"\n"}
                                                        Some Description
                                                        {"\n"}€{item.price}/unit
                                                        {"\n"}<Text onPress={()=>this.toggleModal('seeMoreModal')}
                                                        style={{textDecorationLine:'underline'}}>See more</Text>
                                                        </Text>
                                                    <TouchableOpacity
                                                        onPress={() => this.handleClick(item, this.state.category)}
                                                        style={styles.button}
                                                        key={item.price}>
                                                        <Text style={styles.buttonText}>Add to cart</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.option}>
                                                    {/* <Text style={[styles.text, { padding: 0, fontSize: 22 }]}>€{item.price}/unit</Text> */}
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
                        onBackdropPress={()=>this.toggleModal('seeMoreModal')}
                        style={{flex:1,marginTop:'80%',backgroundColor:'#fafafa',padding:10}}
                        >
                            <View></View>
  </Modal>
                        <Modal isVisible={this.state.seeshaModal}
                        onBackdropPress={this.handleSeeshaModal}
                        style={{flex:1,marginTop:'80%',backgroundColor:'#fafafa',padding:10}}
                        >
                            <Sheesha toggle={this.handleSeeshaModal}/>
  </Modal>
                        
                       
                           <Modal
                           isVisible={this.state.socialGamesModal}
                           onBackdropPress={this.handleSocialGamesModal}
                           style={{flex:1,marginTop:'100%',backgroundColor:'#fafafa',padding:10}}
                           >
                           <SocialGames toggle={this.handleSocialGamesModal}/>
                               </Modal>             
                
                    </View>
    }



                </ScrollView>
                {this.state.category !== 'seesha'&&this.state.category !== 'games'  ? <View style={styles.footer}>
                    <Text style={[styles.text, { fontSize: 25 }]}>Total</Text>
                    <Text style={[styles.text, { textAlign: 'right', fontSize: 25, padding: 5, alignSelf: 'center' }]}>€ {this.props.total} </Text>
                </View> : <View style={styles.footer}>
                        <Text style={[styles.text, { fontSize: 25 }]}>Total</Text>
                        <Text style={[styles.text, { textAlign: 'right', fontSize: 25, padding: 5, alignSelf: 'center' }]}>€ {this.state.total} </Text>
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
        itemsInCart:state.itemsInCart
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id, category) => { dispatch(addToCart(id, category)) },
        addQuantity: (item, ) => { dispatch(addQuantity(item)) },
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
    },
    icon: {
        fontSize: 25,
        // backgroundColor:'#fd8539',
        marginTop: -10,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#ff8a65',
        borderRadius: 6,
        height: 40,
        justifyContent: 'center',
        // marginHorizontal: '25%',
        // margin: '5%'
        alignSelf:'center',
        margin:2
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10
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
        borderWidth:2,
        borderColor:PrimayColor
    }
})


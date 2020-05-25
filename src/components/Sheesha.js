import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, StyleSheet, Platform } from 'react-native'
import { BackgroundColor, PrimayColor, TextColorWhite } from './theme/Colors'
import Icon from 'react-native-vector-icons/Feather'
import Layout from './theme/Layout'
import { connect } from 'react-redux'
import { addToCart, addQuantity, subQuantity, removeFromCart, fetchData } from '../redux/actions';



class Seesha extends Component {
    state = {
        selected: [],
        total: 0,
    }
    componentDidMount() {
            this.props.fetchData('seesha')
    }

    calculate = (item) => {

    }
    handleRemove = (id) => {
        this.props.removeItem(id);
        this.setState({ count: this.state.count - 1 })
    }
    handleClick = (item, category) => {

            this.props.addToCart(this.state.selected, category);
            this.setState({selected:[]})
            this.props.toggle()
    }
    handleAddQuantity = (item) => {
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

    notiifcation = () => <View style={styles.circle}>
        <Text style={styles.count}>{this.props.items.length}</Text>
    </View>
    render() {
        // alert(JSON.stringify(this.props.items))
        return (
            <Layout>
                
                <ScrollView showsVerticalScrollIndicator={false} >
                    {this.props.items && <View style={{ flex: 1 }}>
                                 <View style={styles.container}>
                                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            <Text style={[styles.text, { flex: 1, }]}>Brand Name{"\n"}
                                             Some Description loreum ipsom loreum ipsom loreum ipsom
                            </Text>

                                    </View> */}

                                    <View style={styles.options}>
                                        <Text style={[styles.text, { textAlign:'center',fontSize:18, marginTop: '2%',flex:0 }]}>Select your favourite taste</Text>
                                    </View>
                                    {this.props.items.map(item => {
                                        return (
                                            <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ fontFamily:Platform.OS==='android'?'COMIC':'ComicSansMS',fontSize: 18 }}>{item.title}</Text>
                                                <Text style={{ fontFamily:Platform.OS==='android'?'COMIC':'ComicSansMS',fontSize: 18,flexWrap:'wrap' }}>FCFA {item.price}/Unit</Text>
                                                <Icon onPress={() => this.handleSubtractQuantity(item)} name="minus" style={styles.icon} />
                                                <Text style={{ fontFamily:Platform.OS==='android'?'COMIC':'ComicSansMS',fontSize: 20,marginBottom:'2%' }}>{item.quantity}</Text>
                                                <Icon onPress={() => this.handleAddQuantity(item)} name="plus" style={styles.icon} />
                                            </View>
                                        )
                                    })}
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.handleClick(this.props.items, 'seesha')}
                                    style={[styles.button,{marginTop:'10%'}]}><Text style={styles.buttonText}>add to cart</Text></TouchableOpacity>   
                
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

export default connect(mapStateToProps, mapDispatchToProps)(Seesha)


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
        fontFamily:Platform.OS==='android'?'COMIC':'ComicSansMS',
        // flexWrap: 'nowrap',
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
        alignSelf:'center',
        margin:2
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
        borderWidth:2,
        borderColor:PrimayColor
    }
})


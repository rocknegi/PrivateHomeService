import React, { Component } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import { BackgroundColor, PrimayColor } from './theme/Colors'
import Layout from './theme/Layout'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import { removeFromCart, addQuantity, subQuantity, addOption, subOption, addOnAdd,addToCart } from '../redux/actions'
import Modal from 'react-native-modal';
import _ from 'lodash'
import GlassAndServices from './GlassAndServices'

class Cart extends Component {
    state = {
        isModal: false,
        loading: false,
        res: null,
        complimentary:[
            {
            name:'Bluetooth',
            image:'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png'
            },
            {
                name:'Light Decoration',
                image:'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png'
                },
                {
                    name:'Social Game item 1',
                    image:'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png'
                    },
                    {
                        name:'Social Game item 2',
                        image:'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png'
                        },
    ]
    }
    componentDidMount(){

            this.focusListener = this.props.navigation.addListener('didFocus', () => {
                this.props.removeItem('service');
            });

    }

    toggleModal = () => {
        this.setState({ isModal: !this.state.isModal, })
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
    increaseTotal = (item)=>{
        // const item = [data]
        this.props.addToCart(item,'service');
        this.props.navigation.navigate('orderSummary',{
            data:this.state.complimentary
        })
    }
    render() {
        return (
            <Layout>
                {this.props.items.length ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.textHeading}>Complimentary items</Text>
                        {this.state.complimentary.map(item=>{
                            return(
                                <View style={[styles.list,{justifyContent:'center'}]} >
                                  <Image
                                 source={{ uri: item.image }}
                                 style={styles.logo}
                                                />
                                 <Text style={[styles.text,{flex:0.5}]}>{item.name}</Text>
                                 </View>
                            )
                        })}
                        {this.props.items.find(e => e.category === 'liquors')&&<Text style={styles.textHeading}>liquors</Text>}
                        {this.props.items.filter(e => e.category === 'liquors').map(item => {
                            return (
                                <View key={item.id}>
                                    <View style={styles.list} >
                                        <Image
                                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                            style={styles.logo}
                                        />
                                        <Text style={styles.text}>Brand Name{"\n"}€{item.price}/Unit</Text>
                                        <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                        <Text style={{ fontSize: 20 }}>{item.quantity}</Text>
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
                         {this.props.items.find(e => e.category === 'Whiskey12')&&<Text style={styles.textHeading}>Whiskey 12</Text>}
                        {this.props.items.filter(e => e.category === 'Whiskey12').map(item => {
                            return (
                                <View key={item.id}>
                                    <View style={styles.list} >
                                        <Image
                                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                            style={styles.logo}
                                        />
                                        <Text style={styles.text}>Brand Name{"\n"}€{item.price}/Unit</Text>
                                        <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                        <Text style={{ fontSize: 20 }}>{item.quantity}</Text>
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
                         {this.props.items.find(e => e.category === 'Whiskey19')&&<Text style={styles.textHeading}>Whiskey 19</Text>}
                        {this.props.items.filter(e => e.category === 'Whiskey19').map(item => {
                            return (
                                <View key={item.id}>
                                    <View style={styles.list} >
                                        <Image
                                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                            style={styles.logo}
                                        />
                                        <Text style={styles.text}>Brand Name{"\n"}€{item.price}/Unit</Text>
                                        <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                        <Text style={{ fontSize: 20 }}>{item.quantity}</Text>
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
                        {this.props.items.find(e=>e.category==='Whiskey18')&& <Text style={styles.textHeading}>Whiskey18</Text>}
                        {this.props.items.filter(e => e.category === 'Whiskey18').map(item => {
                            return (
                                <View key={item.id}>
                                    <View style={styles.list} >
                                        <Image
                                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                            style={styles.logo}
                                        />
                                        <Text style={styles.text}>Brand Name{"\n"}€{item.price}/Unit</Text>
                                        <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                        <Text style={{ fontSize: 20 }}>{item.quantity}</Text>
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
                        {this.props.items.find(e=>e.category==='Champagne')&& <Text style={styles.textHeading}>Champagne</Text>}
                        {this.props.items.filter(e => e.category === 'Champagne').map(item => {
                            return (
                                <View key={item.id}>
                                    <View style={styles.list} >
                                        <Image
                                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                            style={styles.logo}
                                        />
                                        <Text style={styles.text}>Brand Name{"\n"}€{item.price}/Unit</Text>
                                        <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                        <Text style={{ fontSize: 20 }}>{item.quantity}</Text>
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
                        {this.props.items.find(e=>e.category==='seesha')&& <Text style={styles.textHeading}>Seesha</Text>}
                            {this.props.items.filter(e=>e.category==='seesha').map(item => {
                                return (
                                    <View>
                                        <View style={styles.list} >
                                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{item.title}</Text>
                                            <Text style={{ fontSize: 20 }}>€{item.price}/Unit</Text>
                                            <Icon onPress={() => this.handleSubtractQuantity(item.id,'seesha')} name="minus" style={styles.icon} />
                                            <Text style={{ fontSize: 20 }}>{item.quantity}</Text>
                                            <Icon onPress={() => this.handleAddQuantity(item.id,'seesha')} name="plus" style={styles.icon} />
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
                            {this.props.items.find(e=>e.category==='games')&&<Text style={styles.textHeading}>Games</Text>}
                            {this.props.items.filter(e=>e.category==='games').map(item => {
                                return (
                                    <View>
                                        <View style={styles.list} >
                                            <Text style={{ fontSize: 20, textAlign: 'center' }}>{item.title}</Text>
                                            <Text style={{ fontSize: 20 }}>€{item.price}</Text>
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
                        <Modal
                                            isVisible={this.state.isModal}
                                            scrollHorizontal={true}
                                            animationIn="slideInUp"
                                            onBackdropPress={() => this.toggleModal()}
                                        >
                                           <GlassAndServices toggle={this.toggleModal} increaseTotal={this.increaseTotal} data={this.props.items}/>
                                        </Modal>
                    </ScrollView> : <Text style={styles.text}>Your cart is empty</Text>}
                {this.props.items.length ? <View style={styles.footer}>
                    <Text style={[styles.text, { fontSize: 25 }]}>Total</Text>
                    <Text style={[styles.text, { fontSize: 25, }]}>€ {this.props.total} </Text>
                    <TouchableOpacity 
                    onPress={this.toggleModal}
                    style={[styles.button, { marginBottom: 0, right: '20%', height: 40 }]}>
                        <Text style={styles.buttonText}>Buy Now</Text>
                    </TouchableOpacity>
                </View> : null}
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
        marginBottom: 20
    },
    logo: {
        height: 80,
        width: 90,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 20,
        padding: 10,
        textAlign: 'center'
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
        borderWidth:2,
        borderColor:PrimayColor
    },
    textHeading:{
        fontSize:20,
        textAlign:'center',
        padding:5,
        margin:20,
        backgroundColor:'#fd6d24',
        color: '#fff',
        fontWeight:'bold'
    }
})
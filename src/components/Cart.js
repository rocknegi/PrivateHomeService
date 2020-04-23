import React, { Component } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import { BackgroundColor, PrimayColor } from './theme/Colors'
import Layout from './theme/Layout'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import { removeFromCart, addQuantity, subQuantity, addOption, subOption } from '../redux/actions'
import Modal from 'react-native-modal';

class Cart extends Component {
    state = {
        isModal: false,
        whiskyGlass: 1,
        ChampagneGlass: 1,
        error: null
    }

    glassAddition(item) {
        if (this.state[item] >= 4) {
            alert('Max 4 glasses per bottle')
        }
        else {
            this.setState({ [item]: this.state[item] + 1 })
        }
    }

    glassSub(item) {
        if (this.state[item] <= 1) {
            alert('Min 1 glass')
        }
        else {
            this.setState({ [item]: this.state[item] - 1 })
        }
    }
    toggleModal = () => {
        this.setState({ isModal: !this.state.isModal })
    }

    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }
    handleAddOption = (id) => {
        this.props.addOption(id);
    }
    handleSubtractOption = (id) => {
        this.props.subOption(id);
    }
    render() {
        return (
            <Layout>
                {this.props.items.length ? <ScrollView>
                    {this.props.items.map(item => {
                        return (
                            <View key={item.id}>
                                <View style={styles.list} >
                                    <Image
                                        source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                        style={styles.logo}
                                    />
                                    <Text style={styles.text}>Brand Name{"\n"}£{item.price}/Unit</Text>
                                    <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                                    <Text style={{ fontSize: 20 }}>{item.quantity}</Text>
                                    <Icon onPress={() => this.handleAddQuantity(item.id)} name="plus" style={styles.icon} />

                                </View>
                                <View style={{ flexDirection:'row',justifyContent:'space-evenly'}}>
                                    <TouchableOpacity style={styles.button} onPress={this.toggleModal}>
                                        <Text style={styles.buttonText}>Customise</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={()=>this.handleRemove(item.id)}>
                                        <Text style={styles.buttonText}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modal}>

                                    <Modal
                                        isVisible={this.state.isModal}
                                        scrollHorizontal={true}
                                        animationIn="slideInUp"
                                        onBackdropPress={() => this.toggleModal()}
                                    >
                                        <SafeAreaView style={{ flex: 1, backgroundColor: '#eee', marginTop: '150%',padding:10}}>
                                            <ScrollView>
                                                <View style={{marginTop:20}}>
                                                    <View  style={styles.list} >
                                                        <Text style={{fontSize:20,textAlign:'center'}}>Whisky Glass</Text>
                                                        <Icon onPress={() => this.glassAddition('whiskyGlass')} name="plus" style={styles.icon} />
                                                        <Text style={{ fontSize: 20 }}>{this.state.whiskyGlass}</Text>
                                                        <Icon onPress={() => this.glassSub('whiskyGlass')} name="minus" style={styles.icon} />
                                                    </View>
                                                    <View  style={styles.list} >
                                                        <Text style={{fontSize:20,textAlign:'center'}}>Champagne Glass</Text>
                                                        <Icon onPress={() => this.glassAddition('ChampagneGlass')} name="plus" style={styles.icon} />
                                                        <Text style={{ fontSize: 20 }}>{this.state.ChampagneGlass}</Text>
                                                        <Icon onPress={() => this.glassSub('ChampagneGlass')} name="minus" style={styles.icon} />
                                                        {this.state.error &&
                                                            <Text>{this.state.error}</Text>
                                                        }
                                                    </View>
                                                    <TouchableOpacity 
                                                    onPress={this.toggleModal}
                                                    style={[styles.button,{marginTop:10,marginHorizontal: '35%',}]}>
                                                        <Text style={styles.buttonText}>Save</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </ScrollView>
                                        </SafeAreaView>
                                    </Modal>
                                </View>

                            </View>
                        )
                    })}

                </ScrollView> : <Text style={styles.text}>Your cart is empty</Text>}
                {this.props.items.length ?     <View style={styles.footer}>
                    <Text style={[styles.text, { fontSize: 25 }]}>Total</Text>
                    <Text style={[styles.text, { fontSize: 25, }]}>€ {this.props.total} </Text>
                    <TouchableOpacity style={[styles.button, { marginBottom: 0, right: '20%', height: 40 }]}>
                        <Text style={styles.buttonText}>Buy Now</Text>
                    </TouchableOpacity>
                </View>:null}
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
        subOption: (id) => { dispatch(subOption()) }
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
        backgroundColor: '#fdbf83',
        borderRadius: 10,
        marginBottom: 10,
    }
})
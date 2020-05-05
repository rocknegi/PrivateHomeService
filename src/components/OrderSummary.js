import React, { Component, } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import Layout from './theme/Layout'
import { BackgroundColor, PrimayColor } from './theme/Colors'

export class OrderSummary extends Component {
state={
    complimentary:this.props.navigation.getParam('data')
}
    render() {
        console.log(JSON.stringify(this.props.items))
        return (
            <Layout>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.props.items && <View>
                        {this.state.complimentary.map(item=>{
                            return(
                                <View key={item.name} style={[styles.list,{justifyContent:'center'}]} >
                                 <Text style={[styles.text,{flex:0.5}]}>{item.name}</Text>
                                 </View>
                            )
                        })}
                        {this.props.items.map(item => {
                            return (
                                <View key={item.id}>
                                    <View style={styles.list} >
                                        <Text style={styles.text}>Brand Name{"\n"}€{item.price}/Unit</Text>
                                        <Text style={{ fontSize: 20 }}>{item.quantity}</Text>

                                    </View>
                                    <View style={styles.modal}>
                                    </View>
                                </View>
                            )
                        })}
                    </View>}
                </ScrollView>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.addedItems,
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
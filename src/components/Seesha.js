import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import Layout from './theme/Layout'
import Icon from 'react-native-vector-icons/Feather'
export default class Seesha extends Component {
    render() {
        return (
            <Layout>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Image
                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                            style={styles.logo}
                        />
                        <Text style={[styles.text, { flex: 1, }]}>Brand Name{"\n"}
                                Some Description loreum ipsom loreum ipsom loreum ipsom
                                </Text>

                    </View>

                    <View style={styles.options}>
                        <Text style={[styles.text, { fontSize: 25 }]}>Taste</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Option 1</Text>
                        <Text>Price/Unit</Text>
                        <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                        <Text style={{ fontSize: 20 }}>0</Text>
                        <Icon onPress={() => this.handleAddQuantity(item.id)} name="plus" style={styles.icon} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Option 2</Text>
                        <Text>Price/Unit</Text>
                        <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                        <Text style={{ fontSize: 20 }}>0</Text>
                        <Icon onPress={() => this.handleAddQuantity(item.id)} name="plus" style={styles.icon} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Option 3</Text>
                        <Text>Price/Unit</Text>
                        <Icon onPress={() => this.handleSubtractQuantity(item.id)} name="minus" style={styles.icon} />
                        <Text style={{ fontSize: 20 }}>0</Text>
                        <Icon onPress={() => this.handleAddQuantity(item.id)} name="plus" style={styles.icon} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={[styles.text, { fontSize: 25 }]}>Total</Text>
                    <Text style={[styles.text, { textAlign: 'right', fontSize: 25, padding: 5,alignSelf:'center' }]}>€ {this.props.total} </Text>
                </View>
            </Layout>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    logo: {
        flex: 1,
        height: 120,
        width: '100%',
        resizeMode: 'contain',
        // marginBottom: 20,
        marginTop: 10
    },
    text: {

        fontSize: 18,
        padding: 10,
        flexWrap: 'wrap',
    },
    options: {
        // flex: 1,
        marginTop: 50
    },
    icon: {
        fontSize: 25,
        // color: TextColorWhite
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fdbf83',
        borderRadius: 10,
        marginBottom: 10
    }
})
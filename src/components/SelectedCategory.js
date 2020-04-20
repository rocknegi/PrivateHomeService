import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native'
import { BackgroundColor, PrimayColor } from './theme/Colors'
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Layout from './theme/Layout'

export default class SelectedCategory extends Component {
    static navigationOptions = () => {
        return {
    headerRight: () => <MaterialIcon name="shopping-cart" style={{ fontSize: 28, right: 10 }} />
}
    }
    render() {
        return (
            <Layout>
                <ScrollView>
                    <View style={styles.list}>
                        <Image
                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                            style={styles.logo}
                        />
                        <Text style={styles.text}>Brand Name{"\n"}Price/Unit</Text>
                        <Icon name="plus" style={styles.icon} />
                        <Text style={{ fontSize: 20 }}>[0]</Text>
                        <Icon name="minus" style={styles.icon} />
                        <Text></Text>
                    </View>
                    <View style={styles.list}>
                        <Image
                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                            style={styles.logo}
                        />
                        <Text style={styles.text}>Brand Name{"\n"}Price/Unit</Text>
                        <Icon name="plus" style={styles.icon} />
                        <Text style={{ fontSize: 20 }}>[0]</Text>
                        <Icon name="minus" style={styles.icon} />
                        <Text></Text>
                    </View>
                    <View style={styles.list}>
                        <Image
                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                            style={styles.logo}
                        />
                        <Text style={styles.text}>Brand Name{"\n"}Price/Unit</Text>
                        <Icon name="plus" style={styles.icon} />
                        <Text style={{ fontSize: 20 }}>[0]</Text>
                        <Icon name="minus" style={styles.icon} />
                        <Text></Text>
                    </View>
                    <View style={styles.list}>
                        <Image
                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                            style={styles.logo}
                        />
                        <Text style={styles.text}>Brand Name{"\n"}Price/Unit</Text>
                        <Icon name="plus" style={styles.icon} />
                        <Text style={{ fontSize: 20 }}>[0]</Text>
                        <Icon name="minus" style={styles.icon} />
                        <Text></Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add to cart</Text>
                    </TouchableOpacity><TouchableOpacity style={styles.buttonContainer}></TouchableOpacity>
                </ScrollView>
            </Layout>
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
        fontSize: 15,
        padding: 10
    },
    icon: {
        fontSize: 25,
        color: PrimayColor
    },
    button: {
        backgroundColor: PrimayColor,
        borderRadius: 6,
        marginHorizontal: '35%',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        padding:10
    },
})
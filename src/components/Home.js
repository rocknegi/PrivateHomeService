import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { PrimayColor } from './theme/Colors'
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const data = [
    {
        id: 1,
        name: 'Liquers et virus',
        category: 'liquors'
    },
    {
        id: 2,
        name: 'Whiskey 12 years',
        category: 'Whiskey12'
    },
    {
        id: 3,
        name: 'Whiskey 19 years',
        category: 'Whiskey19'
    },
    {
        id: 4,
        name: 'Whiskey 18 years',
        category: 'Whiskey18'
    },
    {
        id: 5,
        name: 'Champagne',
        category: 'Champagne'
    },
    {
        id: 6,
        name: 'Seesha',
        category: 'seesha'
    },
]

export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: '',
            headerRight: () => (<MaterialIcon onPress={() => navigation.navigate('Cart')} name="shopping-cart" style={{ fontSize: 25, }} />)
            , headerLeft: () => (<Icon style={{ fontSize: 25, left: 5 }} name="menu" onPress={() => navigation.openDrawer()} />)
        }
    }
    render() {
        return (
            <LinearGradient colors={['#f3b771', '#f3a85f', '#f3974e', '#f38640', '#f37335']} style={styles.linearGradient}>
                <SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                        <Image
                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                            style={styles.logo}
                        />
                        <Text style={[styles.text, { fontSize: 30 }]}>Select Here</Text>
                        {data.map(item => {
                            return(
                                <TouchableOpacity
                                key={item.id}
                                onPress={() => item.category!=='seesha'? this.props.navigation.navigate('SelctedCategory', {
                                    category: item.category
                                }):this.props.navigation.navigate('seesha', {
                                    category: item.category
                                })}
                                style={styles.list}>
                                <Text style={styles.text}>{item.name}</Text>
                                <Icon name="arrow-right" style={styles.icon} />
                            </TouchableOpacity>
                            )
                        })}


                        <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Discounted</Text>
                        <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            <Image
                                source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                style={styles.scrollList}
                            />
                            <Image
                                source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                style={styles.scrollList}
                            />
                            <Image
                                source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                style={styles.scrollList}
                            />
                            <Image
                                source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                style={styles.scrollList}
                            />
                        </ScrollView>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fafafa'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    logo: {
        height: 150,
        width: '100%',
        resizeMode: 'contain',
        marginBottom: 20,
        marginTop: 20
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        marginBottom: 10,
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#eee',
        marginBottom: 10,
        marginHorizontal: '3%',
        elevation: 5
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
    }
})
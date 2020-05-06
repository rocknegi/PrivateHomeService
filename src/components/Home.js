import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { PrimayColor } from './theme/Colors'
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import images from '../assets/images';

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
    // {
    //     id: 6,
    //     name: 'Seesha',
    //     category: 'seesha'
    // },
    // {
    //     id: 7,
    //     name: 'Social Games',
    //     category: 'games'
    // },
]

class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
        headerShown:false,
        title:''   
        }
    }
    render() {
        return (
            <View style={styles.linearGradient}>
                <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                    <Icon style={{ fontSize: 25, left: 5 }} name="menu" onPress={() => this.props.navigation.openDrawer()}  />
                    <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                        {this.props.itemsInCart > 0 && <View style={styles.circle}>
                            <View style={styles.count}>
                                <Text style={{ textAlign: 'center', }}>
                                    {this.props.itemsInCart}
                                </Text>
                            </View>

                        </View>}
                        <MaterialIcon onPress={() => this.props.navigation.navigate('Cart', {
                            // category: this.state.category
                        })} name="shopping-cart" style={{ fontSize: 25, }} />

                    </View>

                </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                        <Image
                            source={images.logoBlack}
                            style={[styles.logo,{alignSelf:'center'}]}
                        />
                        <View style={{marginHorizontal:'13%'}}>
                        <Text style={[styles.text, { fontSize: 30,alignSelf:'flex-end' }]}>Our Selection</Text>
                        {data.map(item => {
                            return(
                                <TouchableOpacity
                                key={item.id}
                                onPress={() => this.props.navigation.navigate('SelctedCategory', {
                                    category: item.category,
                                    name:item.name
                                })}
                                style={styles.list}>
                                <Text style={styles.text}>{item.name}</Text>
                                <Icon name="arrow-right" style={styles.icon} />
                            </TouchableOpacity>
                            )
                        })}
                        <Text style={[styles.text, { fontSize: 30, marginTop: 10,alignSelf:'flex-end' }]}>Discounted</Text>

                        </View>


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
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        itemsInCart:state.itemsInCart
    }
}

export default connect(mapStateToProps)(Home)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5
    },
    logo: {
        height: Dimensions.get('window').width/1.7,
        width:  Dimensions.get('window').width/1.7,
        resizeMode: 'contain',
        marginBottom: 10,
        // marginTop: 20
    },
    text: {
        fontSize: 20,
        // textAlign: 'center',
        padding: 10,
        marginBottom: 10,
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
        borderWidth:2,
        borderColor:PrimayColor,
        backgroundColor: '#eee',
        marginBottom: 10,
        // marginHorizontal: '13%',
        elevation: 10,
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
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fd9a50',
    },
    count: { color: '#FFF' },
})
import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { PrimayColor } from './theme/Colors'
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import images from '../assets/images';

const data = [
    {
        id: 1,
        name: 'Liquors & wines',
        category: 'liquors'
    },
    {
        id: 2,
        name: 'Whiskey 12 Years',
        category: 'Whiskey12'
    },
    {
        id: 3,
        name: 'Whiskey 15 Years',
        category: 'Whiskey19'
    },
    {
        id: 4,
        name: 'Whiskey 18 Years',
        category: 'Whiskey18'
    },
    {
        id: 5,
        name: 'Champagne ',
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
        title:'',
        }
    }
    render() {
        return (
            <View style={styles.linearGradient}>
                <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',backgroundColor:PrimayColor,height:38 }}>
                    <Icon style={{ fontSize: 25, left: 5, }} name="menu" onPress={() => this.props.navigation.openDrawer()}  />
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
                        })} name="shopping-cart" style={{ fontSize: 25,marginRight:5 }} />

                    </View>

                </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                        <Image
                            source={images.logoBlack}
                            style={[styles.logo,{alignSelf:'center'}]}
                        />
                    <Text style={{ fontSize: Platform.OS==='android'?25:16,fontFamily:Platform.OS==='android'?'HT Gelateria W01 Regular':'ComicSansMS', textAlign: 'center',marginBottom:5 }}>
                    Vos besoins sont nos Services
                    </Text>
                        <View style={{marginHorizontal:'13%'}}>
                        <Text style={[styles.text, {alignSelf:'flex-end',
                        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
                        fontStyle:'italic',
                        fontWeight:'bold' 
                        }]}>
                            Our Selection
                            </Text>
                        {data.map(item => {
                            return(
                                <TouchableOpacity
                                key={item.id}
                                onPress={() => this.props.navigation.navigate('SelctedCategory', {
                                    category: item.category,
                                    name:item.name
                                })}
                                style={styles.list}>
                                <Text style={[styles.text,{padding:10}]}>{item.name}</Text>
                                <Icon name="arrow-right" style={styles.icon} />
                            </TouchableOpacity>
                            )
                        })}
                        <Text style={[styles.text, { fontStyle:'italic',
                        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
                        fontWeight:'bold',alignSelf:'flex-end' }]}>Discounted</Text>
<LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']}  style={{height:1.5,marginHorizontal:'2%'}}></LinearGradient>
                        </View>


                        <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                        <View style={{flex:1,justifyContent:'space-evenly',flexDirection:'row',alignItems:'flex-end',paddingTop:5}}>
                    <Image 
                    style={{height:100,width:Dimensions.get('screen').width/4,resizeMode:'contain'}}
                    source={images.seesha}
                    />
<LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']}  style={{height:100,width:1.5,marginTop:20,marginLeft:10,marginRight:10}}><Text> </Text></LinearGradient>
                     <Image 
                    style={{height:100,width:Dimensions.get('screen').width/4,resizeMode:'contain'}}
                    source={images.champagne}
                    />
                    <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']}  style={{height:100,width:1.5,marginTop:20,marginLeft:10,marginRight:10}}><Text> </Text></LinearGradient>

                     <Image 
                    style={{height:100,width:Dimensions.get('screen').width/3.5,resizeMode:'contain',top:'1%'}}
                    source={images.ludo}
                    />
                    <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']}  style={{height:100,width:1.5,marginTop:20,marginLeft:10,marginRight:10}}><Text> </Text></LinearGradient>

                                        <Image 
                    style={{height:100,width:Dimensions.get('screen').width/4,resizeMode:'contain'}}
                    source={images.seesha}
                    />
                    <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']}  style={{height:100,width:1.5,marginTop:20,marginLeft:10,marginRight:10}}><Text> </Text></LinearGradient>

                     <Image 
                    style={{height:100,width:Dimensions.get('screen').width/4,resizeMode:'contain'}}
                    source={images.champagne}
                    />
                    <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']}  style={{height:100,width:1.5,marginTop:20,marginLeft:10,marginRight:10}}><Text> </Text></LinearGradient>

                     <Image 
                    style={{height:100,width:Dimensions.get('screen').width/3.5,resizeMode:'contain',top:'1%'}}
                    source={images.ludo}
                    />
                </View>
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
        // paddingLeft: 5,
        // paddingRight: 5,
        borderRadius: 5
    },
    logo: {
        height: Dimensions.get('window').width/3.2,
        width:  Dimensions.get('window').width/3.2,
        resizeMode: 'contain',
        marginBottom: 10,
        // marginTop: 20
    },
    text: {
        fontSize: 20,
        // textAlign: 'center',
        padding: 5,
        // marginBottom: 10,
        fontFamily:Platform.OS==='android'?'COMIC':'ComicSansMS',
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth:2,
        borderColor:PrimayColor,
        backgroundColor: '#fafafa',
        marginBottom: 8,
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
        backgroundColor: '#fafafa',
    },
    count: { color: '#FFF' },
})
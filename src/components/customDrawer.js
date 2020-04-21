import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-navigation';

const MenuItems = [
    {
        id: 4,
        name: "Home",
        navigate: "",
        icon: "home"
    },
    {
        id: 1,
        name: "About",
        navigate: "",
        icon: "account"
    },
    {
        id: 2,
        name: "My Orders",
        navigate: "",
        icon: "calendar-month-outline"
    },
    {
        id: 3,
        name: "Reviews ",
        navigate: "",
        icon: "ballot-outline"
    },

    {
        id: 5,
        name: "Notifications",
        navigate: "",
        icon: "notification-clear-all"
    },
    {
        id: 6,
        name: "My Adresses",
        navigate: "",
        icon: "home-city-outline"
    },
    {
        id: 7,
        name: "Help",
        navigate: "",
        icon: "help-circle-outline"
    }

];

const CustomDrawer = ({ activeTintColor,navigation,backgroundTintColor }) => {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fafafa'}}>          
            <View style={{flex:0.7}}>
            </View>
            {MenuItems.map((e, i) => {
                return (
                    <View style={[styles.container,{backgroundColor:navigation.state.index===i? backgroundTintColor:null}]} key={e.id}>
                        <Icon style={[styles.icon,{ color: navigation.state.index === i ? activeTintColor : null }]} name={e.icon} />
                        <Text style={[styles.text, { color: navigation.state.index === i ? activeTintColor : null }]} >{e.name}</Text>
                        <Icon style={[styles.icon,{ color: navigation.state.index === i ? activeTintColor : null }]} name="arrow-right" />
                    </View>

                )
            })}

        </SafeAreaView>
    )
}

export default CustomDrawer
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10%',
        paddingLeft:10,
        paddingRight:10,
        height:50,
        alignItems:'center',

    },
    icon: {
        fontSize: 22
    },
    text: {
        fontSize: 20,
    }
})
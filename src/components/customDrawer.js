import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-navigation';
import Layout from './theme/Layout';

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

const CustomDrawer = ({ activeTintColor,navigation }) => {
    return (
        <Layout>
            <View style={{ marginTop: '30%' }}>
            </View>
            {MenuItems.map((e, i) => {
                return (
                    <View style={[styles.container]} key={e.id}>
                        <Icon style={[styles.icon,{ color: navigation.state.index === i ? activeTintColor : null }]} name={e.icon} />
                        <Text style={[styles.text, { color: navigation.state.index === i ? activeTintColor : null }]} >{e.name}</Text>
                        <Icon style={[styles.icon,{ color: navigation.state.index === i ? activeTintColor : null }]} name="arrow-right" />
                    </View>

                )
            })}

        </Layout>
    )
}

export default CustomDrawer
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '15%',
    },
    icon: {
        fontSize: 22
    },
    text: {
        fontSize: 20,
    }
})
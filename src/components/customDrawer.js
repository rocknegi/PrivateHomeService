import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-navigation';

const MenuItems = [
    {
        id: 1,
        name: "Home",
        navigate: "Home",
        icon: "home"
    },
    {
        id: 2,
        name: "Profil",
        navigate: "Profile",
        icon: "account"
    },
    {
        id: 3,
        name: "My Orders",
        navigate: "Orders",
        icon: "calendar-month-outline"
    },
    {
        id: 4,
        name: "Notifications",
        navigate: "Notifications",
        icon: "notification-clear-all"
    },
    {
        id: 5,
        name: "Video",
        navigate: "Video",
        icon: "home-city-outline"
    },
    {
        id: 6,
        name: "Contact Us",
        navigate: "ContactUs",
        icon: "ballot-outline"
    },

];

const CustomDrawer = ({ activeTintColor, navigation, backgroundTintColor }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
            <View style={{ flex: 0.3 }}>
            </View>
            {MenuItems.map((e, i) => {
                return (
                    <View style={[styles.container, { backgroundColor: navigation.state.index === i ? backgroundTintColor : null }]} key={e.id}>
                        <Icon style={[styles.icon, { color: navigation.state.index === i ? activeTintColor : null }]} name={e.icon} />
                        <Text onPress={() => navigation.navigate(e.navigate)} style={[styles.text, { color: navigation.state.index === i ? activeTintColor : null }]} >{e.name}</Text>
                        <Icon style={[styles.icon, { color: navigation.state.index === i ? activeTintColor : null }]} name="arrow-right" />
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
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        alignItems: 'center',

    },
    icon: {
        fontSize: 22
    },
    text: {
        fontSize: 20,
        flex: 0.7
    }
})
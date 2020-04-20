import React from 'react'
import { StyleSheet, SafeAreaView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
const Layout = (props) => {
    return (
        <LinearGradient colors={['#f3b771', '#f3a85f', '#f3974e', '#f38640', '#f37335']} style={styles.linearGradient}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.container}>
                        {props.children}
                    </SafeAreaView>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </LinearGradient>
    )
}

export default Layout
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
})

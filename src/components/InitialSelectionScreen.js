import React from 'react'
import { Text, View, SafeAreaView, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { PrimayColor } from './theme/Colors';
import images from '../assets/images';
import Icon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux';
import { clearState, setInitialSelection } from '../redux/actions'

class InitialSelectionScreen extends React.Component {

    handleSelection = (id) => {
        if (id === 'phs') {
            this.props.setInitialSelection('phs')
        }
        else {
            this.props.setInitialSelection('')
        }
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View style={styles.linearGradient}>
                <SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                        <Image
                            source={images.logoBlack}
                            style={[styles.logo, { alignSelf: 'center' }]}
                        />
                        <Text style={{ fontSize: Platform.OS === 'android' ? 25 : 16, fontFamily: Platform.OS === 'android' ? 'HT Gelateria W01 Regular' : 'ComicSansMS', textAlign: 'center', marginBottom: 5 }}>
                            Vos besoins sont nos Services
                    </Text>
                        <View style={{ marginTop: '5%', marginHorizontal: '13%', flex: 1, justifyContent: 'center' }}>
                            <Text style={[styles.text, {
                                alignSelf: 'center',
                                fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
                                fontStyle: 'italic',
                                fontWeight: 'bold'
                            }]}>
                                Select your service
                            </Text>
                            <TouchableOpacity
                                onPress={() => this.handleSelection('phs')}
                                style={styles.list}>
                                <Text style={[styles.text, { padding: 10 }]}>Home Services</Text>
                                <Icon name="arrow-right" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.handleSelection}
                                style={styles.list}>
                                <Text style={[styles.text, { padding: 10 }]}>Drink Delivery</Text>
                                <Icon name="arrow-right" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    linearGradient: {
        flex: 1,
        borderRadius: 5
    },
    logo: {
        height: Dimensions.get('window').width / 3.2,
        width: Dimensions.get('window').width / 3.2,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        padding: 5,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS',
    },
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: PrimayColor,
        backgroundColor: '#fafafa',
        marginTop: '5%',
        // marginHorizontal: '13%',
        elevation: 10,
    },
    icon: {
        fontSize: 25,
        right: 20,
        color: PrimayColor
    }
})

const mapStateToProps = (state) => {
    return {
        selection: state.selection
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setInitialSelection: (id) => { dispatch(setInitialSelection(id)) },
        clear: (id) => { dispatch(clearState(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InitialSelectionScreen)
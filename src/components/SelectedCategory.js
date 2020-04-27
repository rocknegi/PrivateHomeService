import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native'
import { BackgroundColor, PrimayColor, TextColorWhite } from './theme/Colors'
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Layout from './theme/Layout'
import { connect } from 'react-redux'
import { addToCart, addQuantity, subQuantity, removeFromCart, fetchData } from '../redux/actions';


class SelectedCategory extends Component {
    counter = () => <View style={styles.circle}>
        <View style={styles.count}>{this.state.count}</View>
    </View>
    static navigationOptions = ({ navigation }, props) => {
        return {
            headerShown: false,
            title: '',
        }
    }
    state = {
        count: 0,
        category: this.props.navigation.getParam('category'),
        selected: [],
        total: 0
    }
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ count: this.props.added.length })
        });
        if (this.state.category === 'seesha')
            this.props.fetchData('seesha')
        else this.props.fetchData('!seesha');

    }

    componentWillUnmount() {
        this.focusListener.remove();
    }
    calculate = (item) => {

    }
    handleRemove = (id) => {
        this.props.removeItem(id);
        this.setState({ count: this.state.count - 1 })
    }
    handleClick = (item, category) => {

        if (this.state.category !== 'seesha') {
              this.props.addToCart(item, category);
        }
        else {

            this.props.addToCart(this.state.selected, category);
        }
        this.setState({ count: this.props.added.length + 1 })
    }
    handleAddQuantity = (item) => {
        if (this.state.category !== 'seesha') {
            this.props.addQuantity(item);
        }
        else {
            if(this.state.selected.find(e=>e.id===item.id)){
                item.quantity ++;
                this.setState((state) => ({
                    selected: [...state.selected],
                    total: state.total+item.price
                }))
            }
            else{
                item.quantity ++;
                this.setState((state) => ({
                    selected: [...state.selected, item],
                    total: state.total+item.price
                }))
            }
        }
        // this.setState({selected:item})
        this.calculate(item)

    }
    handleSubtractQuantity = (item) => {
        if(item.quantity>0){
            item.quantity = item.quantity - 1
            this.setState((state) => ({
                selected: [...state.selected, item]
            }))
        }
        // this.props.subtractQuantity(id);
    }
    notiifcation = () => <View style={styles.circle}>
        <Text style={styles.count}>{this.props.items.length}</Text>
    </View>
    render() {
        return (
            <Layout>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                    <Icon style={{ fontSize: 25, left: 5 }} name="arrow-left" onPress={() => this.props.navigation.goBack()} />
                    <View style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                        {this.state.count > 0 && <View style={styles.circle}>
                            <View style={styles.count}>
                                <Text style={{ textAlign: 'center', }}>
                                    {this.state.count}
                                </Text>
                            </View>

                        </View>}
                        <MaterialIcon onPress={() => this.props.navigation.navigate('Cart', {
                            category: this.state.category
                        })} name="shopping-cart" style={{ fontSize: 25, }} />

                    </View>

                </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {this.props.items && <View style={{ flex: 1 }}>
                        {this.state.category !== 'seesha' ?
                            <View>
                                {this.props.items.filter(e => e.category === this.state.category).map(item => {
                                    return (
                                        <View key={item.id}>
                                            <View >
                                                <View style={styles.list} >
                                                    <Image
                                                        source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                                        style={styles.logo}
                                                    />
                                                    <Text style={styles.text}>{item.title}{"\n"}
                                Some Description loreum ipsom loreum ipsom loreum ipsom
                                </Text>

                                                </View>
                                                <View style={styles.option}>
                                                    <Text style={[styles.text, { padding: 0, fontSize: 22 }]}>€{item.price}/unit</Text>
                                                    <TouchableOpacity
                                                        onPress={() => this.handleClick(item, this.state.category)}
                                                        style={styles.button}
                                                        key={item.price}>
                                                        <Text style={styles.buttonText}>add to cart</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            : this.state.category === 'seesha' ? <View>
                                <View style={styles.container}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Image
                                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                                            style={{
                                                height: 150,
                                                width: 180,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                        <Text style={[styles.text, { flex: 1, }]}>Brand Name{"\n"}
                            Some Description loreum ipsom loreum ipsom loreum ipsom
                            </Text>

                                    </View>

                                    <View style={styles.options}>
                                        <Text style={[styles.text, { fontSize: 25, marginTop: '20%' }]}>Taste</Text>
                                    </View>
                                    {this.props.items.map(item => {
                                        return (
                                            <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 20 }}>{item.title}</Text>
                                                <Text style={{ fontSize: 20 }}>€{item.price}/Unit</Text>
                                                <Icon onPress={() => this.handleSubtractQuantity(item)} name="minus" style={styles.icon} />
                                                <Text style={{ fontSize: 20 }}>{item.quantity}</Text>
                                                <Icon onPress={() => this.handleAddQuantity(item)} name="plus" style={styles.icon} />
                                            </View>
                                        )
                                    })}
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.handleClick(this.props.items, this.state.category)}
                                    style={styles.button}><Text style={styles.buttonText}>add to cart</Text></TouchableOpacity>
                            </View> : null
                        }
                    </View>}

                </ScrollView>
                {this.state.category !== 'seesha' ? <View style={styles.footer}>
                    <Text style={[styles.text, { fontSize: 25 }]}>Total</Text>
                    <Text style={[styles.text, { textAlign: 'right', fontSize: 25, padding: 5, alignSelf: 'center' }]}>€ {this.props.total} </Text>
                </View> : <View style={styles.footer}>
                        <Text style={[styles.text, { fontSize: 25 }]}>Total</Text>
                        <Text style={[styles.text, { textAlign: 'right', fontSize: 25, padding: 5, alignSelf: 'center' }]}>€ {this.state.total} </Text>
                    </View>}
            </Layout>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        total: state.total,
        added: state.addedItems
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id, category) => { dispatch(addToCart(id, category)) },
        addQuantity: (item, ) => { dispatch(addQuantity(item)) },
        subtractQuantity: (id) => { dispatch(subQuantity(id)) },
        removeItem: (id) => { dispatch(removeFromCart(id)) },
        fetchData: (category) => { dispatch(fetchData(category)) }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCategory)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BackgroundColor
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20
    },
    logo: {
        height: 90,
        width: 90,
        resizeMode: 'contain',
    },
    text: {
        flex: 1,
        fontSize: 15,
        padding: 10,
        flexWrap: 'wrap',


    },
    icon: {
        fontSize: 25,
        // backgroundColor:'#fd8539',
        marginTop: -10,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#ff8a65',
        borderRadius: 6,
        height: 40,
        justifyContent: 'center',
        // marginHorizontal: '25%',
        margin: '5%'
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fd9a50',
    },
    count: { color: '#FFF' },
    option: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'

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


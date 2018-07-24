import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ListView, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getItemDetails } from './api';
import ItemImages from './item-images';

let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== 2});

class ItemDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            itemName: props.navigation.getParam('itemName', 'Alertium'),
            urlName: props.navigation.getParam('urlName', '-1'),
            results: null,
            iconResults: null,
        };
    }

    async componentDidMount() {
        let results = await getItemDetails(this.state.urlName);
        this.setState({ results, iconResults: results });
    }

    changeItem = async (item) => {

        if (!item) return;

        this.setState({itemName: item.en.item_name, urlName: item.url_name, results: null});

        let results = await getItemDetails(item.url_name);
        this.setState({ results, iconResults: results });
    }

    renderHeader = () => {

        if (!this.state.results)
            return <View/>

        return (
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                    <Text style={styles.headerText}>User</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerText}>Item Price</Text>
                </View>
                <View style={{ flex: 1 }} >
                    <Text style={styles.headerText}>Reputation</Text>
                </View>
            </View>
        )
    }

    keyExtractor = (item, index) => item.id;

    renderRow = ({item}) => {

        return (
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 2, alignSelf: 'stretch' }}>
                    <Text style={styles.rowTextLeft}>{item.user.ingame_name}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    <Text style={styles.rowText}>{item.platinum}p</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text style={styles.rowText}>{item.user.reputation}</Text>
                </View>
            </View>
        )
    }

    render() {

        let { results, iconResults } = this.state;

        let orders = results && results.payload.orders
            .filter(x => x.order_type == "sell" && x.user.status == 'ingame' && x.platform == 'pc')
            .sort((a, b) => {
                if (a.platinum < b.platinum) return -1;
                if (a.platinum > b.platinum) return 1;
                return 0;
            });

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>{this.state.itemName}</Text>
                <ItemImages 
                    results={iconResults} 
                    urlName={this.state.urlName}
                    onPress={(item) => this.changeItem(item)}/>

                {
                    !this.state.results ? 
                    (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#FFF"/>
                        </View>
                    ) : '' 
                }

                <FlatList
                    data={orders}
                    renderItem={this.renderRow}
                    keyExtractor={this.keyExtractor}
                    ListHeaderComponent={this.renderHeader}
                    style={styles.list}
                    />
            </SafeAreaView>
        );

    }
}

const styles = StyleSheet.create({
    border: {
      borderColor: '#FFFFFF',
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 0,
      padding: 10,
      margin: 10,
      backgroundColor: "#333",
    },
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#333',
    },
    list: {
        padding: 5,
    },
    header: {
        fontSize: 24,
        color: "#FFF",
        textAlign: "center",
        marginTop: 10,
    },
    rowText: {
        color: "#FFF",
        fontSize: 16,
        margin: 2,
        textAlign: 'center',
    },
    rowTextLeft: {
        color: "#FFF",
        fontSize: 16,
        margin: 2,
        textAlign: 'left',
    },
    headerText: {
        color: "#FFF",
        fontSize: 16,
        margin: 2,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    itemImage: {
        height: 90,
        width: 90,
        margin: 2,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: "#FFF",
    },
    itemSubImage: {
        height: 60,
        width: 60,
        margin: 2,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#FFF",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center'
    },
  });


  export default withNavigation(ItemDetails);
import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';

const ALL_ITEMS = require('../items.json');

class Search extends React.Component {
    static navigationOptions = {
        title: ({state}) => "Hello"
    };

    constructor(props) {
        super(props);

        this.state = {
            results: []
        };
    }

    searchItems = (name) => {

        if (name == '') {
            this.setState({results: []});
            return;
        }

        let items = ALL_ITEMS.items.en.filter((item) => {
            return item.item_name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        }).slice(0, 10).sort((a, b) => {
            if (a.item_name < b.item_name) return -1;
            if (a.item_name > b.item_name) return 1;
            return 0;
        });
        this.setState({results: items});
    }

    keyExtractor = (item, index) => index.toString();

    renderSearchResults = ({item}) => {

        return (
            <Text 
                onPress={() => this.props.navigation.navigate('Details', {
                                itemName: item.item_name,
                                urlName: item.url_name,
                            })}
                style={styles.text}>
                {item.item_name}
            </Text>
        )
    }

    renderHeader = () => {
        return (
            <View/>
        )
    }

    render() {
        return (
            <View style={styles.border}>
                <TextInput 
                    keyboardAppearance='dark'
                    placeholder='Search...'
                    placeholderTextColor='#AAA'
                    autoCorrect={false}
                    autoCapitalize='words'
                    clearButtonMode='while-editing'
                    onChangeText={this.searchItems}
                    style={styles.search}/>
                <FlatList
                    data={this.state.results}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderSearchResults}
                    keyExtractor={this.keyExtractor}
                    keyboardShouldPersistTaps={'always'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    search: {
      width: "100%",
      color: '#FFF',
      fontSize: 16,
      backgroundColor: '#333',
      padding: 10,
      borderBottomWidth: 2,
      borderBottomColor: "#FFF",
    },
    border: {
      borderColor: '#FFFFFF',
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 0,
      padding: 10,
      margin: 10,
    },
    text: {
        color: '#EEE',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#FFFFFF',
        fontSize: 16,
        padding: 10,
        marginTop: 10
    }
  });


  export default withNavigation(Search);
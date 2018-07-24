import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ListView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';

class ItemImages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: props.results,
            urlName: props.urlName
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.state.results !== nextProps.results) {
            this.setState({results: nextProps.results});
        }

        if (this.state.urlname !== nextProps.urlName){
            this.setState({urlName: nextProps.urlName});
        }
    }

    keyExtractor = (item, index) => item.id;

    renderItem = ({item}) => {
        let icon = item.sub_icon && this.state.results.include.item.items_in_set.length > 1 ? item.sub_icon : item.icon;
        return (
            <TouchableHighlight
                onPress={() => this.props.onPress(item)} >
                <Image 
                    source={{uri: `https://warframe.market/static/assets/${icon}`}} 
                    style={item.url_name == this.state.urlName ? styles.itemImage : styles.itemSubImage}/>
            </TouchableHighlight>
        )
    }

    render() {

        let { results } = this.state;
        //let results = null;

        if (results) {
            let items = results.include.item.items_in_set;    
            
            let firstItem = items.find(x => x.set_root);
            items = items.filter(x => x !== firstItem);
            items.unshift(firstItem);

            return (
                <View style={styles.container}>
                    <FlatList
                        data={items}
                        extraData={this.state}
                        renderItem={this.renderItem}
                        horizontal={true}
                        style={styles.list}
                        keyExtractor={this.keyExtractor}
                        contentContainerStyle={styles.contentContainer}
                        />
                </View>
            );
        } else {
            return (
                <View/>
            )
        }
    }
}

const styles = StyleSheet.create({
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
    container: { 
        height: 100, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row',
        margin: 5,
    },
    contentContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
    },
  });


  export default withNavigation(ItemImages);
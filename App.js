import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Search from './components/search';
import ItemDetails from './components/item-details';

const items = require('./items.json');

class App extends React.Component {

  render() {

    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content'/>
        <Search />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  html: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  search: {
    width: "100%",
    color: '#FFF',
    fontSize: 16,
    backgroundColor: '#333',
    padding: 10
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 24
  },
  border: {
    borderColor: '#FFFFFF',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 10,
    margin: 10,
  }
});


export default createStackNavigator({
  Home: {
    screen: App,
  },
  Details: {
    screen: ItemDetails
  }
}, {

  initialRouteName: 'Home',
  navigationOptions: {
    headerTitle: "Warframe Market",
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: '#333',
    }
  }
})
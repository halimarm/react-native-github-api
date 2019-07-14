/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  FlatList,
  ToolbarAndroid,
  Image,
  Dimensions,
  Alert,
  Text,
  StatusBar,
  Button
} from 'react-native';

const username = 'halimarm';
const numColumns = 3;
const data = [
  { key: 'A' },
  { key: 'B' },
  { key: 'C' },
  { key: 'D' },
  { key: 'E' },
  { key: 'F' },
  { key: 'G' },
  { key: 'H' },
]

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
      repos: []
    }
  }
  fetchUsers() {
    return fetch('https://api.github.com/users/'+username+'')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        users: responseJson,
        isLoading: false
      }, function() {})
    })
    .catch((error) => {
      console.error(error);
    })
  }
  fetchRepos() {
    return fetch('https://api.github.com/users/'+username+'/repos')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        repos: responseJson,
        isLoading: false
      }, function() {})
    })
    .catch((error) => {
      console.error(error)
    })
  }
  componentDidMount() {
    this.fetchUsers();
    this.fetchRepos();
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Text>{item.key}</Text>
      </View>
    );
  };
  render() {
    const user = this.state.users;
    const repos = this.state.repos;
    return (
      <React.Fragment>
        <ToolbarAndroid
          style={styles.Toolbar}
          // logo={require('./app_logo.png')}
          title="Github"
          titleColor={'#333'}
          // actions={[{title: 'Settings', show: 'always'}]}
        />
        <ScrollView style={styles.App}>
          
          <View style={styles.Container}>
            <View style={styles.MainHead}>
              <View style={styles.HeadTop}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 100, marginRight: 15 }}
                  source={{ uri: user.avatar_url }}
                />
                <View style={{ marginRight: 'auto' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.state.isLoading ? 'Name' : user.name }</Text>
                  <Text style={{ fontSize: 12 }}>{this.state.isLoading ? 'Bio' : user.bio }</Text>
                </View>
                {/* <Button title="Follow" /> */}
              </View>
              <View style={styles.HeadLeft}>
                <Text>Followers</Text>
                <Text>{this.state.isLoading ? '0' : user.followers }</Text>
              </View>
              <View style={styles.HeadRight}>
                <Text>Following</Text>
                <Text>{this.state.isLoading ? '0' : user.following }</Text>
              </View>
            </View>
          </View>

          <View style={styles.Container}>
            <Text style={{ width: '100%'}}>Repository</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={[styles.Info, {marginLeft: -8}, {marginRight: -8}]}>
              { this.state.isLoading ?
              <View style={styles.CardRepo}>
                <Text>Loading...</Text>
              </View> : 
              repos.map((repo, index) => {
                return <View style={styles.CardRepo} key={repo.id}>
                  <Text style={{ marginBottom: 16 }}>{repo.name}</Text>
                  <Text style={{ opacity: .6, fontSize: 12 }}>{repo.language}</Text>
                </View>
              }
              )} 
              
            </ScrollView>
          </View>

          {/* <View style={styles.Container}>
            <Text style={{ width: '100%'}}>Feature</Text>
              <FlatList
                style={{ marginLeft: -8, marginRight: -8 }}
                data={formatData(data, numColumns)}
                renderItem={this.renderItem}
                numColumns={numColumns}
              />
          </View> */}
        </ScrollView>
      </React.Fragment>
    )
  }
};

const styles = StyleSheet.create({
  App: {
    backgroundColor: '#eee'
  },
  CardRepo: {
    padding: 15,
    width: 200,
    margin: 8,
    height: 90,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  MainHead: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    flexWrap: 'wrap',
    // borderWidth: 1,
    // borderColor: '#ddd',
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  HeadTop: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    // borderTopLeftRadius: 6,
    // borderTopRightRadius: 6,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  HeadLeft: {
    width: "50%",
    padding: 15,
    borderBottomLeftRadius: 6,
    // borderLeftWidth: 1,
    // borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd'
  },
  HeadRight: {
    width: "50%",
    padding: 15,
    borderBottomRightRadius: 6,
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: '#ddd'
  },
  Info: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  Container: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 16,
    marginTop: 16
  },
  indicator: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  Toolbar: {
    backgroundColor: '#f1f1f1',
    height: 56,
  },
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 8,
    height: 100,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    // height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
})


import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList, 
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import {
    Controller
} from "../app/controllers/Controller";
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, ListItem, List } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class GrowthScreen extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          'data': '',
          refreshing: false,
          isLoading: true
      };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
    });
  }

  async componentDidMount(){
    let store_init = await Controller.asyncStorage.getValueOneKeyAsyncStorage({'key': 'store_init'});
    let url = 'https://test.yogyagroup.com/json/minusgrowth_'+store_init.value+'.json';
    console.log(store_init.value);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
          this.sliceRow();
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  sliceRow(){
    let data = this.state.dataSource;
    let ret = data.slice(0, 20);
    this.setState({
      dataSource: ret
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <Container>
        <ScrollView
          refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>

          <Content>
              <View style={{flex: 1}}>
                <FlatList
                  data={this.state.dataSource}
                  renderItem={
                    ({item}) => 
                      <View style={styles.contentContainer}>
                        <View><Text style={styles.value}>{item.growth}%</Text></View>
                        <View><Text style={styles.subtitle}>{item.sku_desc}</Text></View>
                      </View>
                    }
                  keyExtractor={({sku}, index) => sku}
                />
              </View>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 5,
    marginBottom: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red'
  },
  subtitle: {
    
  },
  buttonContainerParent: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    height: 120
  },

  btn: {
    height: 120
  },
});

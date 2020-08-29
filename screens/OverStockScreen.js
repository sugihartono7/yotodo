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
import { Col, Row, Grid } from "react-native-easy-grid";
import { SearchBar, CheckBox } from 'react-native-elements';
import {
    APIController
} from "../app/controllers/APIController";

export default class OverStockScreen extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          'data': '',
          'ip': '',
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
    try {
        const store_init = await Controller.asyncStorage.getValueOneKeyAsyncStorage({ key: 'store_init' });
        const token_user_id = await Controller.asyncStorage.getValueOneKeyAsyncStorage({ key: 'token_user_id' });
        const url = `http://172.16.10.54:40002/api/v1/skp/${store_init.value}`;
        const method = 'POST';
        let formData = new FormData();
                formData.append("user_id", token_user_id.value);
        let responseJson = await APIController.request_API.requestAPIWithToken('127.0.0.1', url, formData, method);
        this.setState({
          isLoading: false,
          dataSource: responseJson.data.slice(0,20),
        });
    } catch (err) {
        console.log(JSON.stringify(err));
    }
  }

  goToScreen = async (sku) => {
    this.props.navigation.navigate('ProductDetail' , { 'sku': sku, 'screen': 'over_stock'});
  };  

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    var i=0;
    contents = this.state.dataSource.map((item) => {
      i++;

      return (
            <Row key={item.sku}>
              <Col style={styles.column} >
                <TouchableOpacity onPress={() => this.goToScreen(item.sku) }>
                  <Text style={styles.value}>SKP : {Math.round(item.skp)} days</Text>
                  <Text style={styles.title}>{item.sku_desc}</Text>
                  <Text style={styles.artcode}>Article Code : {item.sku}</Text>
                  <Text style={styles.artcode}>Division : {item.divdesc}</Text>
                  <Text style={styles.artcode}>Category : {item.catdesc}</Text>
                </TouchableOpacity>
              </Col>
            </Row>
        );
      
     });

    return (
      <Container style={styles.container}>
        <Content>
          <Grid>
            {contents}
          </Grid>
        </Content>
      </Container>
    );

    // return (
    //   <Container>
    //     <ScrollView
    //       refreshControl={
    //           <RefreshControl
    //             refreshing={this.state.refreshing}
    //             onRefresh={this._onRefresh}
    //           />
    //         }>

    //       <Content>
    //           <View style={{flex: 1}}>
    //             <FlatList
    //               data={this.state.dataSource}
    //               renderItem={
    //                 ({item}) => 
    //                   <View style={styles.contentContainer}>
    //                     <View><Text style={styles.value}>{item.skp}</Text></View>
    //                     <View><Text style={styles.subtitle}>{item.sku_desc}</Text></View>
    //                   </View>
    //                 }
    //               keyExtractor={({sku}, index) => sku}
    //             />
    //           </View>
    //       </Content>
    //     </ScrollView> 
    //   </Container>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5'
  },
  contentContainer: {
    flex: 1,
    padding: 5,
    marginBottom: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  value: {
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 4,
    paddingTop: 10,
    color: '#6d6e71'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 4
  },
  artcode: {
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 4
  },
  column: {
    backgroundColor: '#fff', 
    flex:1,
    margin:15,
    borderRadius: 10,
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

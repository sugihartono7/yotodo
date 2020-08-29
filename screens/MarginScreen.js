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
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, List, Toast, Body} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { SearchBar, CheckBox } from 'react-native-elements';
import {
    APIController
} from "../app/controllers/APIController";

export default class HomeScreen extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          refreshing: false,
          isLoading: true,
          chooseAll: false,
          ip: 'test_ip_ga_usah_dipake',
          dataSource: [],
          check:false,
      };
      //this.arrayholder = [];
  }

  checkBox_Test = (item, index) => {
      let { check } = this.state;
      check[index] = !check[index];
      this.setState({ check: check })

      alert("now the value is " + !this.state.check);
      alert("now the value is " + item.sku);
      console.log(item.sku)
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
        const url = `http://172.16.10.54:40002/api/v1/minusmargin/${store_init.value}`;
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

  // searchFilterFunction = text => {
  //   this.setState({
  //     value: text,
  //   });

  //   const newData = this.arrayholder.filter(item => {
  //     const itemData = `${item.sku_desc.toUpperCase()}`;
  //     const textData = text.toUpperCase();

  //     return itemData.indexOf(textData) > -1;
  //   });
  //   this.setState({
  //     data: newData,
  //   });
  // };

  // renderHeader = () => {
  //   return (
  //     <SearchBar
  //       placeholder="Type Here..."
  //       lightTheme
  //       onChangeText={text => this.searchFilterFunction(text)}
  //       autoCorrect={false}
  //       value={this.state.value}
  //     />
  //   );
  // };

  goToScreen = async (sku) => {
    this.props.navigation.navigate('ProductDetail' , { 'sku': sku, 'screen': 'margin'});
  };  
  
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }


    // <View style={styles.viewLeft}>
    //     <CheckBox 
    //         value = { this.state.check }
    //         onValueChange = { this.handleClick}
    //     />
    // </View>

    var i=0;
    contents = this.state.dataSource.map((item) => {
		i++;
		var minusmargin = Math.round(item.minusmargin * 100) / 100;

		if (minusmargin != 0){
			return (
				<Row key={item.sku} >
					<Col style={styles.column} >
						<TouchableOpacity onPress={() => this.goToScreen(item.sku) }>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={styles.viewRight} >
									<Text style={styles.value}>{minusmargin} %</Text>
									<Text style={styles.title}>{item.sku_desc}</Text>
									<Text style={styles.artcode}>Article Code : {item.sku}</Text>
									<Text style={styles.artcode}>Division : {item.divdesc}</Text>
									<Text style={styles.artcode}>Category : {item.catdesc}</Text>
								</View>
							</View>
						</TouchableOpacity>
					</Col>
				</Row>
			);
		}
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


  }
}

const styles = StyleSheet.create({
  viewLeft: {
    marginTop:15,
    flexDirection: 'column',
    flex:1
  },
  viewRight: {
    flexDirection: 'column',
    flex:9
  },
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
    margin:15,
    borderRadius: 10,
    flex:1
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

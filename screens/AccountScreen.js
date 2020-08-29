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
  Alert
} from 'react-native';
import {
    Controller
} from "../app/controllers/Controller";
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Right } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class AccountScreen extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          'data': '',
          'store_init': '',
          'username': '',
          'full_name': ''
      };
      
  }

  signOutAsync = ()=> {
          Alert.alert(
              '',
              Controller.string().logout.confirm,
              [
                  {text: 'No', style: 'cancel'},
                  {text: 'Yes', onPress: () => this.logout()},
              ]
          );
      };

  logout = async () => {
        await Controller.asyncStorage.removeAllAsyncStorage();
        this.props.navigation.navigate('Authenticate');
  };

  goToChangePasswordScreen = async () => {
    this.props.navigation.navigate('ChangePassword');
  }

  async componentDidMount(){
    let store_init = await Controller.asyncStorage.getValueOneKeyAsyncStorage({'key': 'store_init'});
    let username = await Controller.asyncStorage.getValueOneKeyAsyncStorage({'key': 'username'});
    let full_name = await Controller.asyncStorage.getValueOneKeyAsyncStorage({'key': 'full_name'});
    this.setState({
      'store_init': store_init.value.toUpperCase(),
      'username': username.value.toUpperCase(),
      'full_name': full_name.value.toUpperCase()
    })
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
      <Container style={styles.container}>
          <Content>
            <View style={{flex: 1}}>
                <View style={styles.header}></View>
                <Image source={require('../assets/images/user.png')} style={styles.profileImg} />
                <View style={styles.content}>
                    <View style={styles.info}>
                        <Text style={{fontWeight: 'bold', fontFamily: 'TitilliumWeb_Regular'}}>{this.state.store_init}</Text>
                        <Text style={{fontFamily: 'TitilliumWeb_Regular'}}>{this.state.full_name}</Text>
                    </View>
                </View>
            </View>

            <Card style={{ flex: 0 }}>
                  <CardItem> 
                      <Text style={{fontFamily: 'TitilliumWeb_Regular'}}>Application Version : {Controller.versionApp()}</Text>
                  </CardItem>
            </Card>
            
            <Card style={styles.logoutButton}>
                  <CardItem button onPress={()=>this.signOutAsync()} style={{ backgroundColor: '#808080' }}> 
                      <Text style={{ color: 'white', fontFamily: 'TitilliumWeb_Regular', fontWeight: 'bold' }}>LOG OUT</Text>
                  </CardItem>
            </Card>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5'
  },
  header: {
      alignItems: 'center',
      backgroundColor:'#e9e9ef',
      flex:0.1,
      justifyContent: 'center',
      zIndex:0
  },
  profileImg: {
      height: 120,
      width: 120,
      borderRadius: 50,
      bottom:-50, 
      zIndex:1,
      alignSelf: 'center',
  },
  info: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:52,
      marginBottom:20
  },
  h1: {
      fontWeight: 'bold',
  },
  logoutButton: {
    flex:0,
    marginTop: 100
  }
});

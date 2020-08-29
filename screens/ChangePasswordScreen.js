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

export default class ChangePasswordScreen extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          'data': '',
          'store_init': '',
          'username': ''
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

  goToMarginScreen = async () => {
    this.props.navigation.navigate('Margin');
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
            <View style={styles.containerForm} >
                <View style={styles.iconSection}>
                    <Item rounded>
                        <Input 
                            value={this.state.username}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            placeholder={Controller.string().login.inputUsername}
                            placeholderTextColor={Controller.color().login.inputBox}
                            onChangeText={(username) => this.setState({username})}
                            style={styles.inputText}
                        />
                    </Item>
                </View>
                <View style={styles.iconSection}>
                    <Item rounded>
                        <Input 
                            value={this.state.password}
                            placeholder={Controller.string().login.inputPassword}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            placeholderTextColor={Controller.color().login.inputBox}
                            onChangeText={(password) => this.setState({password})}
                            style={styles.inputText}
                        />
                    </Item>
                </View>
                <View style={styles.buttonView} >
                    <Button rounded hitSlop={{top: 40, bottom: 40, left: 200, right: 200}}
                        onPress={()=>this.onClickButtonLogin()} 
                        style={styles.btnLogin}>
                        <Text style={styles.btnLoginText}>LOG IN</Text>
                    </Button>
                </View>
            </View>
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

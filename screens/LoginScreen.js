import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    StatusBar,
    AsyncStorage
} from 'react-native';
import {
    Content,
    Toast,
    Root,
    Button,
    Input,
    Item
} from 'native-base';
import {
    Icon
} from 'react-native-elements';
import {
    Loader
} from './Loader/Loader';
import {
    Controller
} from "../app/controllers/Controller";
import {
    APIController
} from "../app/controllers/APIController";

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default class LoginScreen extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            'username': '',
            'password': '',
            'ip': 'test_ip_ga_usah_dipake',
            'store_code': '',
            'loading': false,
            'token': null,
            'notification': null,
            'title': 'Notification',
            'body': 'Data berhasil diproses',
            'is_send': false
        };
    }

    sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body) {
        var hours = new Date().getHours();
        if (hours == 8){
            this.setState({is_send: true});
            return fetch('https://exp.host/--/api/v2/push/send', {
                body: JSON.stringify({
                    to: token,
                    body: body,
                    data: { message: `${title} - ${body}` },
                    android: 
                    {
                        sound: true, 
                        priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
                        vibrate: true 
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                    method: 'POST',
            });    
        }
    }

    handleNotification = notification => {
        this.setState({
            notification,
        });
    }

    componentWillMount(){
        // get expo push token
        //this.state.token = await Notifications.getExpoPushTokenAsync();
        //let that = this;
        //console.log(this.state.token);
        //setInterval(function(){that.sendPushNotification()} , 3000);
    };

    async componentWillUnmount(){
        this._isMounted = false;
    };

    // Function Button Login
    onClickButtonLogin = async ()=>{
        let username = this.state.username;
        let password = this.state.password;
        Keyboard.dismiss();

        if(username.length === 0 || password.length === 0) {
            Toast.show({
                text: "Please Fill Username / Password",
                buttonText: "Okay",
                type: "error"
            });
        } 
        else {
            let self = this;
            self.setState({
                loading: true
            });

            let ip = this.state.ip;
            let url = APIController.url_API.login();
            let method = 'POST';
            let formData = new FormData();
                formData.append("username", username);
                formData.append("password", password);
            
            let responseData = await APIController.request_API.requestAPIWithoutToken(ip, url, formData, method);

            //cek login berhasil atau ga
            if(responseData.status.id == 1){
                try{
                    let method = 'POST';
                    let token_user_id = responseData.data.id;
                    let token_password = password;
                    let responseToken = await APIController.request_API.requestToken(token_user_id, token_password, ip);
                    
                    if(responseToken.status.id == 1){
                        self.setState({
                            loading: false,
                        });

                        let store_init = responseData.data.store_init;
                        let initialAsyncStorage = [
                            {
                                'key': 'username',
                                'value': responseData.data.username,
                            },
                            {
                                'key': 'role',
                                'value': responseData.data.role.toString(),
                            },
                            {
                                'key': 'store_init',
                                'value': store_init.toLowerCase(),
                            },
                            {
                                'key': 'token_user_id',
                                'value': responseData.data.id.toString(),
                            },
                            {
                                'key': 'token_password',
                                'value': token_password,
                            },
                            {
                                'key': 'token_user',
                                'value': responseToken.data.token.toString(),
                            },
                            {
                                'key': 'full_name',
                                'value': responseData.data.full_name,
                            }
                        ];
                        await Controller.asyncStorage.setAsyncStorage(initialAsyncStorage);
                        this.props.navigation.navigate('Home');
                    }
                    else {
                        self.setState({
                            loading: false,
                        });
                        console.log('request token error');
                    }
                }catch (error) {
                    self.setState({
                        loading: false,
                    });
                    console.log(error);
                }
            }
            else{
                self.setState({
                    loading: false,
                });
                Toast.show({
                    text: "Wrong Username / Password",
                    buttonText: "Okay",
                    type: "error"
                });
            }

            
        } 

        // fetch('https://test.yogyagroup.com/login.php', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // })
        // .then((response) => response.json())
        // .then((response) => {
        //     this.setState({
        //         loading: false
        //     }, () => {
        //         if (response.token != undefined) {     
        //             
        //         } else{
                  
                       
        //         }

        //         console.log(response);

        //       }
        //     );

        // }).done();

    };

    // View Login
    render() {
        this._isMounted = true;

        return (
            <Root>    
                <StatusBar
                    barStyle="dark-content" />

                <KeyboardAvoidingView behavior="padding" style={styles.form}>
                    <Content>
                        <Loader loading={this.state.loading} />

                        <View style={styles.imageTop}>
                            <Image
                                style={{width: 220, height: 40, resizeMode: 'contain'}}
                                source={require('../assets/images/logoyogya.png')} />
                        </View>
                        
                        <View style={styles.viewMessage}>
                            <Text style={styles.textMessage}>Selamat Datang</Text>
                            <Text style={styles.textMessage}>Kembali</Text>
                        </View>
                        
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

                        <View style={styles.imageBottom}>
                            <Image
                                style={{resizeMode: 'contain', width: 200, height: 350 }}
                                source={require('../assets/images/02_Login_page.png')}
                            />
                        </View>
                    </Content>
                </KeyboardAvoidingView>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    inputText:{
        backgroundColor: '#fff',
        borderRadius: 30,
        width: 300,
        height: 60,
    },
    containerImg: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor:'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    imageTop: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        marginTop: 40,
        marginRight: -25
    },
    imageBottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
        // borderColor: '#000000',
        // borderWidth: 1
    },
    containerForm: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: 25,
        height: 280,
        marginTop: 30
    },
    containerVersion: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 16
    },
    inputBox: {
        flex:1,
        height: 70,
        borderRadius: 3,
        fontSize: 20,
        color: Controller.color().login.text,
        borderWidth: 1,
        borderColor: '#000000',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        marginLeft:5
    },
    buttonView: {
        width: 300,
        height: 50,
        flex: 1,
        marginTop: 40,
        marginHorizontal: 20,
    },
    btnLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fbb040'
    },
    btnLoginText: {
        fontFamily: 'TitilliumWeb_Regular',
        fontWeight: '500',
        color: '#fff',
        fontSize: 18
    },
    viewMessage:{
        marginLeft: 20
    },
    textMessage: {
        fontFamily: 'TitilliumWeb_Regular',
        fontWeight: '400',
        color: '#fff',
        fontSize: 45
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#0ec4e2'
    },
    iconSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingLeft: 0
    },
    iconTextView: {
        padding: 10,
    }
});

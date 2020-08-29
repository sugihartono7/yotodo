/*
    README Route.js
    Date : 27-07-2018
    Develop by :

    1. const Navigation kumpulan navigation yang bakal diguna salah satu nya, pilih salah satu untuk menggunakan stack atau drawer atau tab navigation
    2. MainNavigation kumpulan navigation sebelum login atau sebelum login
        2.1 AuthenticateLoadingScreen berguna untuk screen-screen yang ditampilkan sebelum login
        2.2 AppNavigatorLoggedStackNavigation berguna untuk screen-screen yang ditampilkan setelah login
        2.3 AppNavigatorLoggedWithDrawerNavigation berguna untuk screen-screen yang ditampilkan setelah login, bila menggunakan ini dapat mengakses drawer navigation
        2.4 AppNavigatorLoggedWithDrawerNavigation berguna untuk screen-screen yang ditampilkan setelah login, bila menggunakan ini dapat mengakses tab navigation
    3. const SwitchNavigator ini berguna untuk perpindahan dari sebelum login ke sesudah login
        3.1 IsAuthenticateLoading ini akan mengecek terlebih dahulu, jika sudah login maka akan redirect ke Application, jika belum maka akan redirect ke Authenticate
        3.2 diakses setelah user sudah login, Application -> variable : MainNavigator. akan memanggil stack atau drawer atau tab navigation pilih salah satu configurasi nya
        3.3 diakses sebelum user login, Authenticate -> variable : MainNavigator. AuthenticateLoadingScreen, AuthenticateLoadingScreen ini akan menampilkan screen-screen yang akan ditampilkan sebelum login
    4. initialRoute yaitu muncul pertama adalah IsAuthenticateLoading akan mengecek login atau belum login
*/

import React from 'react';
import {
    createStackNavigator,
    createDrawerNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation';
import {
    Button,
    Icon
} from 'native-base';
import {
    Controller
} from "./controllers/Controller";

import AuthLoadingScreen from '../resources/screens/Auth/AuthLoading';
import MenuDrawerScreen from '../resources/screens/CustomDrawer/CustomDrawer';

import HomeScreen from '../resources/screens/Home';
import LoginScreen from '../resources/screens/Login';
import ConfigScreen from '../resources/screens/ConfigStore';
import MoveInScreen from '../resources/screens/MoveIn';
import MoveOutScreen from '../resources/screens/MoveOut';
import StockOpnameScreen from '../resources/screens/StockOpname';
import TransactionStockOpnameScreen from '../resources/screens/Transaction_StockOpname';
import ConfirmMovementScreen from '../resources/screens/ConfirmMovement';
import SettingScreen from '../resources/screens/Setting';

export const Navigation = {
    //setting screens saat menggunakan stack navigation
    StackNavigation: createStackNavigator({
        //variable didepan, contoh Home itu mendeskripsikan variable untuk memanggil sesuai dengan screen yang di import
        Home: {
            screen: HomeScreen,
            navigationOptions: ({navigation}) => ({
                headerTitle: Controller.string().home.headerTitle,
                headerStyle: {
                    backgroundColor: Controller.color().app.header,
                    borderWidth: 0,
                    borderBottomColor: Controller.color().color_default.white,
                },
                headerTitleStyle: {
                    color: Controller.color().app.textHeader,
                    //fontFamily: Controller.style().montserrat.montserrat_medium,
                    fontWeight: '200'
                },
                headerRight:
                    <Button
                        transparent
                        style={{marginTop: 5}}
                        onPress={() => this.signOutAsync()}>
                        <Icon name='logout' type='MaterialCommunityIcons'
                              style={{color: Controller.color().app.headerRight}}/>
                    </Button>
            })
        },
        Setting: {
            screen: SettingScreen,
        },
    }, {
        headerLayoutPreset: 'center',
    }),
    //setting screens saat menggunakan drawer navigation
    DrawerNavigation: createDrawerNavigator({
        DrawerStack: {
            screen: createStackNavigator({
                //screens yang dapat mengakses menu drawer
                Home: {
                    screen: HomeScreen,
                    navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().home.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: 'white'
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            //fontFamily: Controller.style().montserrat.montserrat_bold,
                            fontWeight: '200'
                        },
                        headerLeft:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => navigation.toggleDrawer()}>
                                <Icon name='md-menu' type='Ionicons'
                                      style={{color: Controller.color().app.headerRight}}/>
                            </Button>,
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this.signOutAsync()}>
                                <Icon name='logout' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().app.headerRight}}/>
                            </Button>
                    })
                },
            },{
                headerLayoutPreset: 'center',
            })
        }
    }, {
        drawerWidth: Controller.style().size_screens.customDrawer.width,
        contentComponent: MenuDrawerScreen
    }),
    //setting screens saat menggunakan tab navigation
    TabNavigation: createBottomTabNavigator({
        //variable didepan, contoh Home itu mendeskripsikan variable untuk memanggil sesuai dengan screen yang di import
        Home: {
            //maksud menambahkan createStackNavigator berguna untuk tab navigation dapat mempunyai header
            screen: createStackNavigator({
                view: {
                    screen: HomeScreen,
                    //setting navigation option untuk pada screen yang di import
                    navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().home.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().color_default.white,
                            //fontFamily: Controller.style().montserrat.montserrat_medium,
                            fontWeight: '200'
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this.signOutAsync()}>
                                <Icon name='logout' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.white}}/>
                            </Button>
                    })
                },
            }, {
                headerLayoutPreset: 'center',
            }),
            //setting navigation option untuk tab navigation
            navigationOptions: ({navigation}) => ({
                tabBarLabel: Controller.string().home.tabBarLabel,
                tabBarTextStyle: {
                    color: Controller.color().color_default.white,
                    //fontFamily: Controller.style().montserrat.montserrat_medium,
                    fontWeight: '200'
                },
                tabBarIcon: <Icon name='home' type='Entypo'
                                  style={{color: Controller.color().color_default.black}}/>,
            })
        },
        Setting: {
            screen: createStackNavigator({
                view: {
                    screen: SettingScreen,
                    navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().setting.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().home.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().color_default.white,
                            //fontFamily: Controller.style().montserrat.montserrat_medium,
                            fontWeight: '200'
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this.signOutAsync()}>
                                <Icon name='logout' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.white}}/>
                            </Button>
                    })
                },
            }, {
                headerLayoutPreset: 'center',
            }),
            navigationOptions: ({navigation}) => ({
                tabBarLabel: Controller.string().setting.tabBarLabel,
                tabBarTextStyle: {
                    color: Controller.color().color_default.white,
                    //fontFamily: Controller.style().montserrat.montserrat_medium,
                    fontWeight: '200'
                },
                tabBarIcon: <Icon name='settings' type='Feather'
                                  style={{color: Controller.color().color_default.black}}/>,
            })
        },
    }, {
        tabBarOptions: {
            activeTintColor: Controller.color().color_default.skyblue,
            inactiveTintColor: Controller.color().color_default.gray,
        },
    }),
};

export const MainNavigation = {
    AuthenticateLoadingScreen: createStackNavigator({
        Login: {
            screen: LoginScreen,
        },
        ConfigStore: {
            screen: ConfigScreen,
        },
    }, {
        headerMode: 'none'
    }),
    AppNavigatorLoggedStackNavigation: Navigation.StackNavigation,
    AppNavigatorLoggedWithDrawerNavigation: createStackNavigator({
        DrawerView: {
            screen: Navigation.DrawerNavigation,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        },
        MoveIn: {
            screen: MoveInScreen,
            navigationOptions: ({navigation}) => ({
                headerTitle: Controller.string().movein.headerTitle,
                headerStyle: {
                    backgroundColor: Controller.color().app.header,
                    borderWidth: 0,
                    borderBottomColor: Controller.color().color_default.white,
                },
                headerTitleStyle: {
                    color: Controller.color().movein.theme,
                    //fontFamily: Controller.style().montserrat.montserrat_medium,
                    fontWeight: '200',
                },
                headerLeft: null,
                headerTintColor: Controller.color().app.headerRight,
            })
        },
        MoveOut: {
            screen: MoveOutScreen,
            navigationOptions: ({navigation}) => ({
                headerTitle: Controller.string().moveout.headerTitle,
                headerStyle: {
                    backgroundColor: Controller.color().app.header,
                    borderWidth: 0,
                    borderBottomColor: Controller.color().color_default.white,
                },
                headerTitleStyle: {
                    color: Controller.color().moveout.theme,
                    //fontFamily: Controller.style().montserrat.montserrat_medium,
                    fontWeight: '200',
                },
                headerLeft: null,
                headerTintColor: Controller.color().app.headerRight,
            })
        },
        StockOpname: {
            screen: StockOpnameScreen,
            navigationOptions: ({navigation}) => ({
                headerTitle: Controller.string().stockOpname.headerTitle,
                headerStyle: {
                    backgroundColor: Controller.color().app.header,
                    borderWidth: 0,
                    borderBottomColor: Controller.color().color_default.white,
                },
                headerTitleStyle: {
                    color: Controller.color().stockOpname.theme,
                    //fontFamily: Controller.style().montserrat.montserrat_medium,
                    fontWeight: '200',
                },
                headerLeft: null,
                headerTintColor: Controller.color().app.headerRight,
            })
        },
        TransactionStockOpname: {
            screen: TransactionStockOpnameScreen,
            navigationOptions: ({navigation}) => ({
                headerTitle: Controller.string().transaction_stock_opname.headerTitle,
                headerStyle: {
                    backgroundColor: Controller.color().app.header,
                    borderWidth: 0,
                    borderBottomColor: Controller.color().color_default.white,
                },
                headerTitleStyle: {
                    color: Controller.color().stockOpname.theme,
                    //fontFamily: Controller.style().montserrat.montserrat_medium,
                    fontWeight: '200',
                },
                headerLeft: null,
                headerTintColor: Controller.color().app.headerRight,
            })
        },
        ConfirmMovement: {
            screen: ConfirmMovementScreen,
            navigationOptions: ({navigation}) => ({
                headerTitle: Controller.string().confirmMovement.headerTitle,
                headerStyle: {
                    backgroundColor: Controller.color().app.header,
                    borderWidth: 0,
                    borderBottomColor: Controller.color().color_default.white,
                },
                headerTitleStyle: {
                    color: Controller.color().app.headerRight,
                    //fontFamily: Controller.style().montserrat.montserrat_medium,
                    fontWeight: '200',
                },
                headerTintColor: Controller.color().app.headerRight,
            })
        },
        //contoh: Profile: {screen: BlaScreen}, ...
        //bisa di import screen lain di sini, note: tidak dapat mengakses menu drawer
    }, {
        headerLayoutPreset: 'center',
    }),
    AppNavigatorLoggedWithTabNavigation: createStackNavigator({
        TabView: {
            screen: Navigation.TabNavigation,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        }
        //contoh: Profile: {screen: BlaScreen}, ...
        //bisa di import screen lain di sini, note: tidak dapat mengakses tab drawer
    }, {
        headerLayoutPreset: 'center',
    }),
};

export const SwitchNavigation = createSwitchNavigator({
    IsAuthenticateLoading: AuthLoadingScreen,
    Application: MainNavigation.AppNavigatorLoggedWithDrawerNavigation,
    Authenticate: MainNavigation.AuthenticateLoadingScreen,
}, {
    initialRouteName: 'IsAuthenticateLoading',
});
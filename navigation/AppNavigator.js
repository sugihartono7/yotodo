import React from 'react';
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MarginScreen from '../screens/MarginScreen';
import GrowthScreen from '../screens/GrowthScreen';
import MinusStockScreen from '../screens/MinusStockScreen';
import EmptyStockScreen from '../screens/EmptyStockScreen';
import ScannerScreen from '../screens/ScannerScreen';
import AccountScreen from '../screens/AccountScreen';
import OverStockScreen from '../screens/OverStockScreen';
import DeadStockScreen from '../screens/DeadStockScreen';
import FiveDaysBeforeOosScreen from '../screens/FiveDaysBeforeOosScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import TabBarIcon from '../components/TabBarIcon';
import {
    Button,
    Icon
} from 'native-base';

import {
    Controller
} from "../app/controllers/Controller";
import {
    APIController
} from "../app/controllers/APIController";

// general screen
export const AppNavigatorLoggedStackNavigation = createBottomTabNavigator({
    Home: {
        screen: createStackNavigator({
                view: {
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
                            textAlign: 'left',
                            fontSize: 19,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500"
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    })
                },
            }, {
                headerLayoutPreset: 'left',
            }),
            navigationOptions: ({navigation}) => ({
                tabBarLabel: Controller.string().home.tabBarLabel,
                tabBarTextStyle: {
                    color: Controller.color().color_default.white,
                    fontWeight: '200',
                    fontFamily: 'TitilliumWeb_Regular',
                },
                tabBarStyle: {
                	backgroundColor: '#414042',
                },
                tabBarIcon:<TabBarIcon name='md-home'/>
            })
    },

    Scanner: {
        screen: createStackNavigator({
                view: {
                    screen: ScannerScreen,
                    navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().scanners.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            textAlign: 'left',
                            fontSize: 19,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500"
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    })
                },
            }, {
                headerLayoutPreset: 'center',
            }),
            navigationOptions: ({navigation}) => ({
                tabBarLabel: Controller.string().scanners.tabBarLabel,
                tabBarTextStyle: {
                    color: Controller.color().color_default.white,
                    fontWeight: '200',
                    fontFamily: 'TitilliumWeb_Regular',
                },
                tabBarIcon: <TabBarIcon name='md-barcode' />
            })
    },

    // Settings: {
    //     screen: createStackNavigator({
    //             view: {
    //                 screen: SettingsScreen,
    //                 navigationOptions: ({navigation}) => ({
    //                     headerTitle: Controller.string().settings.headerTitle,
    //                     headerStyle: {
    //                         backgroundColor: Controller.color().app.header,
    //                         borderWidth: 0,
    //                         borderBottomColor: Controller.color().color_default.white,
    //                     },
    //                     headerTitleStyle: {
    //                         color: Controller.color().color_default.white,
    //                         fontWeight: '200'
    //                     },
    //                     headerRight:
    //                         <Button
    //                             transparent
    //                             style={{marginTop: 5}}
    //                             onPress={() => this.signOutAsync()}>
    //                             <Icon name='logout' type='MaterialCommunityIcons'
    //                                   style={{color: Controller.color().color_default.black}}/>
    //                         </Button>
    //                 })
    //             },
    //         }, {
    //             headerLayoutPreset: 'center',
    //         }),
    //         navigationOptions: ({navigation}) => ({
    //             tabBarLabel: Controller.string().settings.tabBarLabel,
    //             tabBarTextStyle: {
    //                 color: Controller.color().color_default.white,
    //                 fontWeight: '200'
    //             },
    //             tabBarIcon: <TabBarIcon name='md-settings' />
    //         })
    // },

}, {
    headerLayoutPreset: 'center',
});

export const AppNavigatorLoggedWithTabNavigation = createStackNavigator({
    TabView: {
        screen: AppNavigatorLoggedStackNavigation,
        navigationOptions: ({navigation}) => ({
            header: null
        })
    },
    Margin: {
    	screen: MarginScreen,
    	navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().margin.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500",
                            textAlign: 'left',
                            fontSize: 19
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    })
    },
    Growth: {
    	screen: GrowthScreen,
    	navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().grotwh.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500",
                            textAlign: 'left',
                            fontSize: 19
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    })
    },
    MinusStock: {
    	screen: MinusStockScreen,
    	navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().minusStock.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500",
                            textAlign: 'left',
                            fontSize: 19
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    })
    },
    EmptyStock: {
    	screen: EmptyStockScreen,
    	navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().emptyStock.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500",
                            textAlign: 'left',
                            fontSize: 19
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    })
    },
    Account: {
    	screen: AccountScreen,
    	navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().account.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500",
                            textAlign: 'left',
                            fontSize: 19
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    }),headerLayoutPreset: 'center',
    },
    OverStock: {
    	screen: OverStockScreen,
    	navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().overStock.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500",
                            textAlign: 'left',
                            fontSize: 19
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    }),headerLayoutPreset: 'center',
    },
    FiveDaysBeforeOos: {
    	screen: FiveDaysBeforeOosScreen,
    	navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().fiveDaysBeforeOos.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500",
                            textAlign: 'left',
                            fontSize: 19
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    }),headerLayoutPreset: 'center',
    },
    DeadStock: {
    	screen: DeadStockScreen,
    	navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().deadStock.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500",
                            textAlign: 'left',
                            fontSize: 19
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    }),headerLayoutPreset: 'center',
    },
    ChangePassword: {
        screen: ChangePasswordScreen,
        navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().changePassword.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500",
                            textAlign: 'left',
                            fontSize: 19
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    }),headerLayoutPreset: 'center',
    },
    ProductDetail: {
        screen: ProductDetailScreen,
        navigationOptions: ({navigation}) => ({
                        headerTitle: Controller.string().productDetail.headerTitle,
                        headerStyle: {
                            backgroundColor: Controller.color().app.header,
                            borderWidth: 0,
                            borderBottomColor: Controller.color().color_default.white,
                        },
                        headerTitleStyle: {
                            color: Controller.color().app.textHeader,
                            fontFamily: 'TitilliumWeb_Regular',
                            fontWeight: "500",
                            textAlign: 'left',
                            fontSize: 19
                        },
                        headerRight:
                            <Button
                                transparent
                                style={{marginTop: 5}}
                                onPress={() => this._goToAccountScreen()}>
                                <Icon name='account-circle' type='MaterialCommunityIcons'
                                      style={{color: Controller.color().color_default.black}}/>
                            </Button>
                    }),headerLayoutPreset: 'center',
    }
}, {
    headerLayoutPreset: 'center',
});

// login sceeen
export const AuthenticateLoadingScreen = createStackNavigator({
    Login: {
        screen: LoginScreen,
    },
}, {
    headerMode: 'none'
});

// navigation dari login ke setelahnya
export const SwitchNavigation = createSwitchNavigator({
    IsAuthenticateLoading: AuthLoadingScreen,
    Application: AppNavigatorLoggedWithTabNavigation,
    Authenticate: AuthenticateLoadingScreen,//AuthenticateLoadingScreen
}, {
    initialRouteName: 'IsAuthenticateLoading',
});

export const AppContainer = createAppContainer(SwitchNavigation);

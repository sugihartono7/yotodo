/*
    README Controller.js
    Date : 27-07-2018
    Develop by :

    1. Controller ini berguna untuk melakukan setting default pada app ini
    2. seperti env nya menggunakan apa, string menggunakan bahasa apa
    3. bisa melakukan import ke file js lain untuk mengambil get function yang sudah di setting terlebih dahulu di Controller.js ini
    4. ada beberapa contoh function yang bisa digunakan secara default bisa dipakai di semua screen, contoh function goToScreen untuk pindah-pindah screen lain
    5. cara import nya tinggal "import {Controller} from 'path/to/Contoller.js'"

    #Penjelasan

    ##goToScreen
    1. function ini berguna untuk sebagai navigation navigate ke screen lain nya,
    2. saat pemanggilan function ini, parameter yang harus diisi
    2.1 parameter "screen" diisi dengan nama screen yang menjadi tujuan navigate contoh "Home", "Home" ini harus sudah ada di Route.js
    2.2 parameter "navigation" diisi HARUS diisi dengan "this.props.navigation"

    ##setAsyncStorage:
    1. saat memanggil function ini, parameters "initialAsyncStorage" bentuknya "array object" seperti ini
    1.1 initialAsyncStorage = [
            {
                'key': 'example_1',
                'value': 'example_value_1',
            },
            {
                'key': 'example_2',
                'value': 'example_value_2',
            }
        ];

     ##getAllAsyncStorage:
     1. return dari function ini yaitu semua Asyncstorage yang telah di tambahkan pada "setAsyncStorage", return nya "array object"
     1.1 [{
                'key': 'nama_key_asyncstorage_1',
                'value': 'value_key_asyncstorage_1',
            },
            {
                'key': 'nama_key_asyncstorage_2',
                'value': 'value_key_asyncstorage_2',
            }];

     ##getValueOneKeyAsyncStorage:
     1. saat memanggil function ini, parameters "key" bentuknya "string" seperti ini: "nama_key_asyncstorage"
     1.1 akan me-return value dari nama_key_asyncstorage tersebut, return nya "object" seperti ini
     1.2 {
            'key': 'nama_key_asyncstorage_1',
            'value': 'value_key_asyncstorage_1',
         }

     ##getMoreThanOneAsyncStorage
     1. saat memanggil function ini, parameters "initialAsyncStorage" bentuknya "array object" seperti ini
     1.1 [{
                'key': 'nama_key_asyncstorage_1',
            },
            {
                'key': 'nama_key_asyncstorage_2',
            }];
     1.2 akan me-return array object dari array tersebut, contoh return nya
     1.2.1 [{
                'key': 'nama_key_asyncstorage_1',
                'value': 'value_key_asyncstorage_1',
            },
            {
                'key': 'nama_key_asyncstorage_2',
                'value': 'value_key_asyncstorage_2',
            }];

     ##removeMoreThanOneAsyncStorage
     1. saat memanggil function ini, parameters "initialAsyncStorage" bentuknya "array object" seperti ini
     1.1 [{
                'key': 'nama_key_asyncstorage_1',
            },
            {
                'key': 'nama_key_asyncstorage_2',
            }];

     ###Note:
     1. untuk pemanggilan function di Controller.js yang ada "async" maka pemanggilan function contoh nya seperti ini
     1.1 await Controller.function/object
*/

import {
    AsyncStorage,
} from 'react-native';
import {
    env
} from '../.env';

import {
    Strings
} from '../values/Strings';
import {
    Colors
} from '../values/Colors';
import {
    Styles
} from '../values/Styles';
import {
    version
} from '../../package';
import {
    Toast
} from "native-base";

/* Bagian const yang dipakai*/
const envConfig = env.production;
const stringConfig = Strings.default;
const colorConfig = Colors.default;
const styleConfig = Styles.default;
let initialAsyncstorage = [];
export const Controller = {
    env: () => {
        return envConfig;
    },

    versionApp: () => {
        return version;
    },

    string: () => {
        return stringConfig;
    },

    color: () => {
        return colorConfig;
    },

    style: () => {
        return styleConfig;
    },

    goToScreen: (screen, navigation, parameter) => {
        let parameter_object;
        if (parameter !== null && parameter !== undefined) {
            parameter_object = {
                datas: parameter
            };

            navigation.navigate(screen, parameter_object);
        }
        else {
            navigation.navigate(screen);
        }
    },

    navigation: {
        getParameters: (navigation) => {
            return navigation.getParam('datas', 'No Parameters');
        },
    },

    showToast: (text, type_toast, text_font_family, button_text_font_family) => {
        if (text !== undefined && text_font_family !== undefined && button_text_font_family !== undefined &&
            text !== '' && text_font_family !== '' && button_text_font_family !== '' &&
            (type_toast === 'success' || type_toast === 'danger' || type_toast === 'warning')) {
            return Toast.show({
                text: text,
                type: type_toast,
                textStyle: {
                    fontFamily: text_font_family,
                    fontSize: 13
                },
                buttonTextStyle: {
                    fontFamily: button_text_font_family,
                    fontSize: 13
                }
            });
        }
        else {
            return Toast.show({
                text: "All parameters toast must be required!",
                type: "danger",
                textStyle: {
                    fontSize: 13
                },
                buttonTextStyle: {
                    fontSize: 13
                }
            });
        }
    },

    asyncStorage: {
        setAsyncStorage: async (array_object) => {
            try {
                for (let result of array_object) {
                    if (result.key !== '' && result.value !== '' && result.key != null && result.value != null) {
                        let isSet = await AsyncStorage.setItem(result.key, result.value);
                    }
                }

                return true;
            } catch (e) {
                return false;
            }
        },

        getValueOneKeyAsyncStorage: async (object) => {
            try {
                let value = '';
                let resultValueAsync = {};
                if (!Array.isArray(object) && typeof object === "object") {
                    value = await AsyncStorage.getItem(object.key);
                    resultValueAsync = {
                        'key': object.key,
                        'value': value,
                    };

                    return resultValueAsync;
                }
                else {
                    return resultValueAsync;
                }
            } catch (e) {
                return false;
            }
        },

        getMoreThanOneAsyncStorage: async (array_object) => {
            try {
                let resultValueAsync = [];
                for (let result of array_object) {
                    if (result.key != null && result.key !== '') {
                        let value = await AsyncStorage.getItem(result.key);
                        let mapping = {
                            'key': result.key,
                            'value': value,
                        };

                        resultValueAsync.push(mapping);
                    }
                }

                return resultValueAsync;
            } catch (e) {
                return false;
            }
        },

        getAllAsyncStorage: async () => {
            let keysAsyncStorage = await AsyncStorage.getAllKeys();

            try {
                if (keysAsyncStorage.length !== 0) {
                    initialAsyncstorage = [];
                    for (let result of keysAsyncStorage) {
                        let value = await AsyncStorage.getItem(result);

                        let mapping = {
                            'key': result,
                            'value': value,
                        };

                        initialAsyncstorage.push(mapping);
                    }

                    return initialAsyncstorage;
                }
                else {
                    return initialAsyncstorage;
                }
            } catch (e) {
                return false;
            }
        },

        removeMoreThanOneAsyncStorage: async (array_object) => {
            try {
                for (let result of array_object) {
                    if (result.key != null && result.key !== '') {
                        await AsyncStorage.removeItem(result.key);
                    }
                }

                initialAsyncstorage = [];

                return true;
            } catch (e) {
                return false;
            }
        },

        removeAllAsyncStorage: async () => {
            let keysRemove = await Controller.asyncStorage.getAllAsyncStorage();

            try {
                for (let result of keysRemove) {
                    AsyncStorage.removeItem(result.key);
                }

                initialAsyncstorage = [];

                return true;
            } catch (e) {
                return false;
            }
        },

        removeAllAsyncStorageExcept: async (array_object) => {
            let keysRemoves = await Controller.asyncStorage.getAllAsyncStorage();

            try {
                let i = 0;
                let is_match;

                for (let result of keysRemoves) {
                    is_match = array_object.find(value => {
                        return value.key === result.key;
                    });

                    if(is_match === undefined){
                        AsyncStorage.removeItem(result.key);
                    }
                }

                initialAsyncstorage = [];

                return true;
            } catch (e) {
                return false;
            }
        },
    },
};
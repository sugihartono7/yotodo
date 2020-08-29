/*
    README Styles.js
    Date : 27-07-2018
    Develop by :

    1. Styles.js ini berguna untuk type font family text yang ada di app dapat diubah berdasarkan sesuai keinginan
    2. secara default Controller.js akan memanggil Styles "default" yang tertera dibawah
    3. bila ingin mengganti nya default ke yang lain, tinggal tambahkan aja dibawah default
    4. INGAT mengganti nya juga di Controller.js
    5. variable didepan, contoh app itu mendeskripsikan di screen apa
    6. tulis nama screen yang akan dipanggil di screen tersebut
    7. tuliskan style font family apa, untuk ditampilkan di screen tersebut
    8. catatan font family tersebut harus Font.loadSync di app.js
*/

import {
    Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export const Styles = {
    default: {
        worksans: {
            ws_regular: 'ws-regular',
            ws_medium: 'ws-medium',
            ws_semibold: 'ws-semibold',
        },
        size_screens: {
            customDrawer: {
                width: (width / 2) + 70,
                height: '',
            },
            home: {
                width: (width / 2) - 7,
                height: '',
            },
            confirmMovement: {
                width: (width / 2) + 55,
                height: '',
            },
            homeButton: {
                width: width,
                height: (481 / 1081) * width,
            },
            inputBox: {
                width: width - 40,
                height: '',
            },
        },
    },
};
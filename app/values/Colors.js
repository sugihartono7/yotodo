/*
    README Colors.js
    Date : 27-07-2018
    Develop by :

    1. Colors.jss ini berguna untuk color yang ada di app
    2. secara default Controller.js akan memanggil Colors ini "default" yang tertera dibawah
    3. bila ini menganti nya default ke yang lain, tinggal tambahkan aja dibawah default
    5. INGAT mengganti nya juga di Controller.js
    6. variable didepan, contoh app itu mendeskripsikan di screen apa
    7. tulis nama screen yang akan dipanggil di screen tersebut
    8. tuliskan nama component apa yang diberikan warna yang telah ditentukan
    9. untuk list_color_default dapat ditambahkan sesuai dengan keinginan
*/

export const Colors = {
    default: {
        app: {
            statusBar: '#58595b',
            header: '#e5e5e5',
            textHeader: '#4c4c4c',
            headerRight: '#58595b',
            tabBar: 'e5e5e5'
        },
        customDrawer: {
            appColor: '#414043',
            version: '#a7a9ac'
        },
        confirmMovement: {
            inputBox: '#58595b',
            placeholder: '#a7a9ac',
            confirmMovementQty: '#ededed',
        },
        login: {
            text: '#58595b',
            inputBox: '#7d8283',
            btnLogin: '#000000',
        },
        movein: {
            theme: '#36c5bd',
            icon: '#6d6e71',
            text: '#58595b',
            subtitle: '#a7a9ac',
            bgInput: '#dbdbdb'
        },
        moveout: {
            theme: '#f26651',
            icon: '#6d6e71',
            text: '#58595b',
            subtitle: '#a7a9ac',
            bgInput: '#dbdbdb'
        },
        stockOpname: {
            theme: '#845fc1',
            icon: '#6d6e71',
            text: '#58595b',
            subtitle: '#a7a9ac',
            bgInput: '#dbdbdb',

            inputBox: '#546e7a',
            placeholder: '#9cb6c1',
            btnNext: '#4299fa',
        },
        color_default: {
            white: '#ffffff',
            black: '#000000',
            blue: '#0000ff',
            red: '#ff0000',
            green: '#008000',
            gray: '#808080',
            lightgray: '#d3d3d3',
            skyblue: '#7CA6DA',
            bismark: '#546e7a',
        },
    },
};
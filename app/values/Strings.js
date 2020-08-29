/*
    README Strings.js
    Date : 27-07-2018
    Develop by :

    1. Strings.js ini berguna untuk title atau text yang ada di app dapat diubah berdasarkan language nya
    2. secara default Controller.js akan memanggil Strings "default" yang tertera dibawah
    3. bila ingin mengganti nya default ke yang lain, tinggal tambahkan aja dibawah default
    4. secara default mengunakan bahasa inggris. dapat menambahkan bahasa lain nya, seperti contoh dibawah ini "Indonesia"
    5. INGAT mengganti nya juga di Controller.js
    6. variable didepan, contoh app itu mendeskripsikan di screen apa
    7. tulis nama screen yang akan dipanggil di screen tersebut
    8. tuliskan string apa, untuk ditampilkan di screen tersebut
*/

export const Strings = {
    default: {
        app: {
            app_name: 'Yogya Dashboard',
        },
        authLoading: {
            tokenNotValid: 'Token is not valid!'
        },
        customDrawer: {
            hi: 'Hi,',
            home: 'Home',
            logout: 'Logout',
            version: 'Version',
        },
        home: {
            headerTitle: 'Yesterday Data',
            tabBarLabel: 'Home',
        },
        scanners: {
            headerTitle: 'Scanner',
            tabBarLabel: 'Scanner',
        },settings: {
            headerTitle: 'Settings',
            tabBarLabel: 'Settings',
        },
        margin: {
            headerTitle: 'Minus Margin',
            tabBarLabel: 'Minus Margin',
        },
        minusStock: {
            headerTitle: 'Minus Stock',
            tabBarLabel: 'Minus Stock',
        },
        grotwh: {
            headerTitle: 'Minus Growth',
            tabBarLabel: 'Minus Growth',
        },
        emptyStock: {
            headerTitle: 'Out of Stock',
            tabBarLabel: 'Out of Stock',
        },
        loader: {
            loading: 'Loading, please wait...',
        },
        login: {
            welcome: 'Welcome, ',

            inputUsername: 'Input Your Username',
            inputPassword: 'Input Password',
            btnLogin: 'LOG IN',
            emptyUsername: 'Please enter username and passsword.',
            emptyConfig: 'Please configure Store and IP first.',

            success: 'Welcome, Hi ',
            error: 'username or password not valid',

            loading: 'Loading, please wait...',
            networkError: 'Network error. Please check your connection.',

            version: 'Version',
        },
        config: {
            emptyInput: 'Please input all fields.',
            inputIP: 'IP Address',
            btnSave: 'Save',
            success: 'Configuration successfully saved.'
        },
        logout: {
            confirm: 'Are you sure want to logout?',
            success: '',
            error: '',
        },
        setting: {
            headerTitle: 'Setting',
            tabBarLabel: 'Setting',
        },
        account: {
            headerTitle: 'Account',
            tabBarLabel: 'Account',
        },
        overStock: {
            headerTitle: 'Over Stock',
            tabBarLabel: 'Over Stock',
        },
        deadStock: {
            headerTitle: 'Dead Stock',
            tabBarLabel: 'Dead Stock',
        },
        fiveDaysBeforeOos: {
            headerTitle: '5 Days Before OOS',
            tabBarLabel: '5 Days Before OOS',
        },
        changePassword: {
            headerTitle: 'Change Password',
            tabBarLabel: 'Change Password',
        },
        productDetail: {
            headerTitle: 'Product Detail', 
            tabBarLabel: 'Product Detail',
        },
    },
    languageIndonesia: {

    },
};
/*
    README .env.js
    Date : 27-07-2018
    Develop by :

    1. .env.js ini berguna untuk menyimpan setting yang utama
    2. secara default Controller.js akan memanggil .env ini "default" yang tertera dibawah
    3. .env.js disedikan beberapa setting staging dan production selain default
    4. INGAT jika mengganti misal "staging" yang digunakan maka ganti juga di Controller.js
    5. bagian default untuk API_URL
    5.1 testing di local harus menggunakan ip ya, cek ip di komputer anda, PERHATIKAN port yang digunakan saat service API running
    6. bagian staging dan production untuk API_URL
    6.1 harus sesuai dengan ip server atau dns, PERHATIKAN port yang digunakan saat service API running
*/

export const env = {
    production: {
        API_URL: 'http://172.16.10.54:40002/',
        API_AUTH: {
            USERNAME_JWT: 'sails',
            PASSWORD_JWT: 'sails123'
        },
        ORIGIN: 'yogyagroup.com',
        SOURCE: 'sails-api',
        TIMER: {
            //set timeout 5 second
            FETCH_TIMEOUT: 5000
        }
    },
};
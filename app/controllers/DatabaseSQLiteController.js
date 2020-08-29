import {
    SQLite
} from "expo";
import {
    Controller
} from "./Controller";

const initialTableDatabase = [];
export const DatabaseSQLiteController = {
    openDatabaseSqlLite: () => {
        const db = SQLite.openDatabase(Controller.env().DB.NAME);

        return db;
    },

    getAllTableDatabase: () => {
        return initialTableDatabase;
    },

    createTableDatabase: (table_name, column_table_with_tipe_data) => {
        if(table_name != '' && table_name != null && column_table_with_tipe_data != '' && column_table_with_tipe_data != null){
            let mapping = {
                'table_name': table_name,
                'initial': column_table_with_tipe_data
            };

            DatabaseSQLiteController.openDatabaseSqlLite().transaction(
                tx => {
                    tx.executeSql(
                        'create table if not exists ' + table_name + ' (' + column_table_with_tipe_data + ');'
                    );
                },
                //error
                () => {
                    console.log('Error create table');
                },
                //success
                () => {
                    console.log('Success create table');
                }
            );

            initialTableDatabase.push(mapping);
        }
        else {
            console.log('Table name or column table is empty');
        }
    },

    insertValueInTableDatabase: (table_name, insert_column, value_array, custom_text_toast_success, custom_text_toast_error) => {
        if(table_name != '' && insert_column != '' && Array.isArray(value_array) && custom_text_toast_success != '' && custom_text_toast_error != ''){

            let array = insert_column.split(', ');
            let count_array = array.length;
            let values = '';

            if(value_array.length == count_array){
                let i = 1;
                while(i<=count_array){
                    if(i == count_array){
                        values = values+'?';
                    }
                    else {
                        values = values+'?,';
                    }

                    i++;
                }

                DatabaseSQLiteController.openDatabaseSqlLite().transaction(
                    tx => {
                        tx.executeSql(
                            'insert into '+table_name+' ('+insert_column+') values ('+values+')',
                            value_array
                        );
                    },
                    //error
                    () => {
                        Controller.showToast(custom_text_toast_error, 'danger', Controller.style().montserrat.montserrat_medium, Controller.style().montserrat.montserrat_bold);

                        console.log('Error insert table');
                    },
                    //success
                    () => {
                        Controller.showToast(custom_text_toast_success, 'success', Controller.style().montserrat.montserrat_medium, Controller.style().montserrat.montserrat_bold);

                        console.log('Success insert table');
                    }
                );

                // return values;
            }
            else {
                Controller.showToast('Count column and value not same (or Table not created)', 'danger', Controller.style().montserrat.montserrat_medium, Controller.style().montserrat.montserrat_bold);

                console.log('Count column and value not same (or Table not created)');
            }
        }
        else {
            Controller.showToast('Requirement not correct', 'warning', Controller.style().montserrat.montserrat_medium, Controller.style().montserrat.montserrat_bold);

            console.log('Requirement not correct');
        }
    },

    deleteTable: (table_name) => {
        if(table_name != '' && table_name != null){
            DatabaseSQLiteController.openDatabaseSqlLite().transaction(
                tx => {
                    tx.executeSql('delete from '+table_name+';');
                },
                //error
                () => {
                    console.log('Error delete table');
                },
                //success
                () => {
                    console.log('Success delete table');
                }
            );
        }
        else {
            console.log('Table name is empty');
        }
    },

    dropOneTableDatabase: (table_name) => {
        if (table_name!= '' && table_name!= undefined) {
            DatabaseSQLiteController.openDatabaseSqlLite().transaction(
                tx => {
                    tx.executeSql(
                        'drop table if exists ' + table_name + ';'
                    );
                },
                //error
                () => {
                    console.log('Error drop table '+table_name);
                },
                //success
                () => {
                    console.log('Success drop table '+table_name);
                }
            );
        }
        else {
            console.log('Table in database not yet');
        }
    },
};
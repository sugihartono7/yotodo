import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Image
} from 'react-native';

export const Dialog = props => {
    const {
        show,
        sourceDialog,
        ...attributes
    } = props;

    let asset = require('../../assets/images/pop_up_move_in.png');

    if(sourceDialog === "move-in") {
        asset = require('../../assets/images/pop_up_move_in.png')
    } else if(sourceDialog === "move-out") {
        asset = require('../../assets/images/pop_up_move_out.png')
    } else if(sourceDialog === "stock-opname") {
        asset = require('../../assets/images/pop_up_stock_opname.png')
    }

    return (
        <Modal
            transparent={true}
            animationType={'fade'}
            visible={show}
            onRequestClose={() => {console.log('close modal')}}>

            <View style={styles.modalBackground}>
                <Image
                    style={{width: 300, height: 103, resizeMode: 'contain'}}
                    source={asset}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    }
});
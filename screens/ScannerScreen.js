import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList, 
    ActivityIndicator,
    Alert,
    Modal,
    TouchableHighlight
} from 'react-native';
import {
    Controller
} from "../app/controllers/Controller";
import { Container, Content, Thumbnail, Text, Button, Icon } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            'data': '',
            'hasCameraPermission': null,
            'scanned':false,
            'modalVisible': false,
            'dataSource': []
        };

        _goToAccountScreen = ()=> {
            this.goToAccountScreen();
        }
    }
    
    goToAccountScreen = async () => {
        this.props.navigation.navigate('Account');
    }

    goToScannedScreen = async (sku) => {
		this.props.navigation.navigate('ScannedScreen' , { 'sku': sku, 'screen': 'five_days_before_oos'});
	};  
    
    componentDidMount() {
        this._requestCameraPermission();
    }
    
    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = async data => {
        if (this.state.scanned == false){
            // Alert.alert('Scan successful!', JSON.stringify(data));
            this.setState({scanned: true,});
            this.setModalVisible(true);

            let store_init = await Controller.asyncStorage.getValueOneKeyAsyncStorage({'key': 'store_init'});
            let url = 'http://monitore.yogya.com/getDetailData.php?branch='+store_init.value+'&sku=92002333';
            
            return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                });
            })
            .catch((error) =>{
                console.error(error);
            });
        } else {
            return undefined;
        }
    };
    
    setModalVisible(visible) {
        this.setState({
            modalVisible: visible,
            scanned: false
        });
    }

    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
            const negativeSign = amount < 0 ? "-" : "";
            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;
            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    };
    
    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        contents = this.state.dataSource.map((item) => {
            return (
                    <View key={item.sku} style={styles.viewRight} >
                        <Text style={styles.artcode_title}>{item.sku}</Text>
                        <Text style={styles.artcode}>{item.last_stock}</Text>
                        <Text style={styles.artcode}>Rp. {this.formatMoney(item.avg_cost_price, decimalCount=0)}</Text>
                        <Text style={styles.artcode}>{item.last_rec_date}</Text>
                        <Text style={styles.artcode}>{item.last_rec_qty}</Text>
                        <Text style={styles.artcode}>{item.qty_on_order}</Text>
                        <Text style={styles.artcode}>Rp. {this.formatMoney(item.avg_sales_day, decimalCount=0)}</Text>
                        <Text style={styles.artcode}>Rp. {item.last_selling_date}</Text>
                        <Text style={styles.artcode}>Rp. {this.formatMoney(item.selling_price, decimalCount=0)}</Text>
                    </View>
                );
        });

        return (
            <Container style={styles.container}>
                <Content style={{ flex:1}}>
                    <View style={styles.container}>
                        {
                            this.state.hasCameraPermission === null ? 
                                <Text>Requesting for camera permission</Text> : 
                                    this.state.hasCameraPermission === false ?
                                        <Text>Camera permission is not granted</Text> :
                                            <BarCodeScanner onBarCodeScanned={this._handleBarCodeRead} style={{  height:700 }} /> 
                        }
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                            
                        <Container style={styles.container}>
                            <Content>
                                <Grid>
                                    <Row>
                                        <Col style={styles.column}>
                                            <View style={{flex: 1, flexDirection: 'row', paddingBottom:10}}>
                                                <View style={styles.viewLeft}>
                                                    <Text style={styles.title}>SKU</Text>
                                                    <Text style={styles.title}>Last Stock</Text>
                                                    <Text style={styles.title}>AVG Cost Price</Text>
                                                    <Text style={styles.title}>Last Rec Date</Text>
                                                    <Text style={styles.title}>Last Rec Qty</Text>
                                                    <Text style={styles.title}>Qty On Order</Text>
                                                    <Text style={styles.title}>AVG Sales/day</Text>
                                                    <Text style={styles.title}>Last Selling Date</Text>
                                                    <Text style={styles.title}>Selling Price</Text>
                                                </View>
                                                {contents}
                                            </View>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Content>
                        </Container>
                    </Modal>
                    
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5'
    },
    buttonContainerParent: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1,
        height: 120
    },
    btn: {
        height: 120
    },
    textMenu: {
        fontFamily: 'TitilliumWeb_Regular',
        fontWeight: '500' 
    },
    column: {
        backgroundColor: '#fff', 
        margin:15,
        borderRadius: 10,
        flex:1
    },
    viewLeft: {
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        flexDirection: 'column',
        flex:5
    },
    viewRight: {
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        flexDirection: 'column',
        flex:5
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 4
    },
    artcode: {
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 4
    },
    artcode_title: {
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 4,
        fontWeight: 'bold'
    },
});

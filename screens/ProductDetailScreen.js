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
    RefreshControl,
    Picker,
    TextInput
} from 'react-native';
import {
    Controller
} from "../app/controllers/Controller";
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, List, Toast, Body, Input} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { SearchBar } from 'react-native-elements';
import {
    APIController
} from "../app/controllers/APIController";

export default class ProductDetailScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
                refreshing: false,
                isLoading: false,
                sku:'',
                last_stock:'',
                avg_cost_price:'',
                last_rec_date:'',
                last_rec_qty:'',
                qty_on_order:'',
                avg_sales_day:'',
                last_selling_date:'',
                selling_price:'',
                description:'',
                reason:'',
                other_reason:'',
                item: [],
                screen:'',
                dataSource: [],
        };
    }

    async componentDidMount(){
        try {
            let sku = await this.props.navigation.state.params.sku;
            var screen = await this.props.navigation.state.params.screen;
            var item = this.state.item;

            if (screen == 'margin') {
                var item = [
                            "Promo Serba Hemat",
                            "Promo Harga Heran",
                            "Anniversary Discount",
                            "In Store Promo",
                            "Minus Inventory",
                            "Supplier Promo Support By Rafaksi",
                            "Salah Input Harga Pada Saat Receiving",
                            "Proses Receiving Belum Selesai",
                            "Penyesuaian Harga Kompetitior", 
                            "Belum Order Harga Promo",
                            "Price Over Write (P.O.W)"
                        ];
            }else if (screen == 'minus_stock'){
                var item = [
                            "Salah input dari stock opname sebelumnya",
                            "Salah input Quantity pada saat transaksi di kassa",
                            "Pencurian",
                            "Proses receiving belum selesai, namun sudah terjadi penjualan di kassa",
                            "Salah input Quantity pada saat receiving"
                        ];
            }else if (screen == 'oos'){
                var item = [
                            "Service level supplier < 70%",
                            "Service level DC < 70%",
                            "Inventory produk tidak sesuai",
                            "Kosong dari supplier / DC",
                            "Supplier / DC terlambat kirim"
                        ];
            }else if (screen == 'over_stock'){
                var item = [
                            "Estimasi pusat untuk persiapan promo",
                            "Invest Buying menghadapi kenaikan harga",
                            "Inventory produk tidak sesuai",
                            "Salah input stock opname sebelumnya",
                            "Salah input Quantity saat receiving"
                        ];
            }else if (screen == 'dead_stock'){
                var item = [
                            "Retur ke supplier belum diproses",
                            "Proses pemusnahan belum dilakukan(tdk bisa retur)",
                            "Inventory produk tidak sesuai",
                            "Salah input stock opname sebelumnya",
                            "Stock tersembunyi dan tidak terpajang"
                        ];
            }

            this.setState({sku : sku});
            this.setState({item : item});
            this.setState({screen : screen});

            let store_init = await Controller.asyncStorage.getValueOneKeyAsyncStorage({'key': 'store_init'});
            let url = 'http://monitore.yogya.com/getDetailData.php?branch='+store_init.value+'&sku=92002333';
            
            return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                });

                this.state.dataSource.map((item) => {        
                    this.setState({
                        last_stock      : item.last_stock,
                        avg_cost_price  : item.avg_cost_price,
                        last_rec_date   : item.last_rec_date,
                        last_rec_qty    : item.last_rec_qty,
                        qty_on_order    : item.qty_on_order,
                        avg_sales_day   : item.avg_sales_day,
                        last_selling_date  : item.last_selling_date,
                        selling_price      : item.selling_price,
                        store_desc         : store_init.value
                    })
                });

            })
            .catch((error) =>{
                console.error(error);
            });
        } catch (err) {
            console.log('err = '+JSON.stringify(err));
        }
    }

    goToHomeScreen = async () => {
        this.props.navigation.navigate('Home' , { 'state': 'success_insert_task'});
    };  

    onClickButtonSubmit = async ()=>{
        let self = this;
        self.setState({
            loading: true
        });
        
        // call insert API
        let param = 'sku='+this.state.sku+'&last_stock='+this.state.last_stock;
            param += '&avg_cost_price='+this.state.avg_cost_price;
            param += '&last_rec_date='+this.state.last_rec_date;
            param += '&last_rec_qty='+this.state.last_rec_qty;
            param += '&qty_on_order='+this.state.qty_on_order;
            param += '&avg_sales_day='+this.state.avg_sales_day;
            param += '&last_selling_date='+this.state.last_selling_date;
            param += '&selling_price='+this.state.selling_price;
            param += '&description='+this.state.description;
            param += '&store_code='+this.state.store_code;
            param += '&store_desc='+this.state.store_desc;
            param += '&reason='+this.state.reason;
            param += '&other_reason='+this.state.other_reason;
        
        let url = 'http://monitore.yogya.com/insertTask.php?'+param;
            
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.map((item) => {        
                console.log(item.status);
            });

            this.goToHomeScreen();
            
        })
        .catch((error) =>{
            console.error(error);
        });

    };

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
            );
        }

        screen = this.state.item.map((value) =>{
            return (
                <Picker.Item label={value} value={value} style={{ fontSize: 18 }} key={value} />
            );
        });
        
        var i=0;
        contents = this.state.dataSource.map((item) => {
            i++;

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
        
        if (this.state.screen != 'five_days_before_oos') {
            return (
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
    
                            <Row>
                                <Col style={styles.column} >
                                    <View style={{flex: 1,  paddingBottom:10}}>
                                        <View style={{marginLeft:10, marginTop:10, marginRight:10}}>
                                            <Text style={{fontSize: 12, color: '#6d6e71'}}>Reason</Text>
                                        </View>
                                        <Picker
                                            selectedValue={this.state.reason}
                                            style={{height: 20, flex:1, marginTop:0,marginLeft:10, paddingTop:0}}
                                            onValueChange={(itemValue, itemIndex) => this.setState({reason: itemValue})} 
                                        >
                                            {screen}
                                        </Picker>
                                        <View style={{marginLeft:10, marginTop:10, marginRight:10}}>
                                            <Text style={{fontSize: 12, color: '#6d6e71'}}>Other Reason</Text>
                                        </View>
                                        <TextInput
                                            style={{flex:1, marginTop:0, marginRight:10, marginLeft:10, borderWidth:1, borderRadius: 5, borderColor:'#4c4c4c', textAlignVertical: 'top', padding:4, fontSize:18 }}
                                            multiline
                                            numberOfLines={10}
                                            onChangeText={(other_reason) => this.setState({other_reason})}
                                            value={this.state.other_reason}/>
                                        
                                        <View style={styles.buttonView} >
                                            <Button
                                                onPress={()=>this.onClickButtonSubmit()} 
                                                style={styles.btnSubmit}>
                                                <Text style={styles.btnSubmitText}>Submit</Text>
                                            </Button>
                                        </View>
                                        
                                    </View>
                                </Col>
                            </Row>
                        </Grid>
                    </Content>
                </Container>
            );
        } else {
            return (
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
            );
        }
        

  }
}

const styles = StyleSheet.create({
    buttonView: {
        height: 50,
        flex: 1,
        marginTop: 40,
        marginHorizontal: 20,
    },
    btnSubmit: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#808080'
    },
    btnSubmitText: {
        fontFamily: 'TitilliumWeb_Regular',
        fontWeight: '500',
        color: '#fff',
        fontSize: 18
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
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5'
    },
    contentContainer: { 
        flex: 1,
        padding: 5,
        marginBottom: 2,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },
    value: {
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 4,
        paddingTop: 10,
        color: '#6d6e71'
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
    column: {
        backgroundColor: '#fff', 
        margin:15,
        borderRadius: 10,
        flex:1
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
});

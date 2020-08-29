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
  Alert
} from 'react-native';
import {
    Controller
} from "../app/controllers/Controller";
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon } from 'native-base';

export default class HomeScreen extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			'data': ''
		};
		
		signOutAsync = ()=> {
			Alert.alert(
				'',
				Controller.string().logout.confirm,
				[
					{text: 'No', style: 'cancel'},
					{text: 'Yes', onPress: () => this.logout()},
				]
			);
		};

		_goToAccountScreen = ()=> {
			this.goToAccountScreen();
		}
	}
	
	logout = async () => {
		await Controller.asyncStorage.removeAllAsyncStorage();
		this.props.navigation.navigate('Authenticate');
	};
		
	goToMarginScreen = async () => {
		this.props.navigation.navigate('Margin');
	}
	
	goToAccountScreen = async () => {
		this.props.navigation.navigate('Account');
	}

	goToGrowthScreen = async () => {
		this.props.navigation.navigate('Growth');
	}

	goToMinusStockScreen = async () => {
		this.props.navigation.navigate('MinusStock');
	}

	goToEmptyStockScreen = async () => {
		this.props.navigation.navigate('EmptyStock');
	}

	goToOverStockScreen = async () => {
		this.props.navigation.navigate('OverStock');
	}

	goToDeadStockScreen = async () => {
		this.props.navigation.navigate('DeadStock');
	}

	goToFiveDaysBeforeOosScreen = async () => {
		this.props.navigation.navigate('FiveDaysBeforeOos');
	}

	render() {
		if(this.state.isLoading){
			return(
				<View style={{flex: 1, padding: 20}}>
				<ActivityIndicator/>
				</View>
			)
		}

    return (
      <Container style={styles.container}>
          <Content>
              <Card style={{ flex: 0 }}>
                  <CardItem button onPress={()=>this.goToMarginScreen()}>
                      <Text style={styles.textMenu}>Minus Margin</Text>
                  </CardItem>
             </Card>
             <Card style={{ flex: 0 }}>
                  <CardItem button onPress={()=>this.goToMinusStockScreen()}> 
                      <Text style={styles.textMenu}>Minus Stock</Text>
                  </CardItem>
             </Card>
             <Card style={{ flex: 0 }}>
                  <CardItem button onPress={()=>this.goToEmptyStockScreen()}>
                      <Text style={styles.textMenu}>Out of Stock</Text>
                  </CardItem>
             </Card>
             <Card style={{ flex: 0 }}>
                  <CardItem button onPress={()=>this.goToFiveDaysBeforeOosScreen()}>
                      <Text style={styles.textMenu}>5 Days Before OOS</Text>
                  </CardItem>
             </Card>
             <Card style={{ flex: 0 }}>
                  <CardItem button onPress={()=>this.goToOverStockScreen()}>
                      <Text style={styles.textMenu}>Over Stock</Text>
                  </CardItem>
             </Card>
             <Card style={{ flex: 0 }}>
                  <CardItem button onPress={()=>this.goToDeadStockScreen()}>
                      <Text style={styles.textMenu}>Dead Stock</Text>
                  </CardItem>
             </Card>
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
  }
});

import React from 'react';
import { ScrollView, StyleSheet, View,Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function LinksScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Button 1"/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Button 2"/>
      </View>
    </View>
  );
}

LinksScreen.navigationOptions = {
  title: 'Data',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
  }
});

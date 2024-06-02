import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform, Alert } from 'react-native';
import Navigations from './navigation/Navigations';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { firebase, messaging } from './firebase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        style="auto"
        backgroundColor="white"
        barStyle="light-content"
        translucent={false}
      />
      <Navigations />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
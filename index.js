/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';

AppRegistry.registerComponent(appName, () => App);

// Background message handler (for use in service worker)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const New = () => {
  useEffect(() => {
    // Request user permission
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }

    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('Token =', token);
    };

    requestUserPermission();
    getToken();

    // Listen for messages in the foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return null;
};

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Button,
  Alert,
} from 'react-native';

import {
  PUNNotification,
  PUNContainer,
  PUNContentText,
  PUNProvider,
  PUNContext,
  NOTIFICATIONS_POSITION,
} from 'react-native-popup-notifications';

function showDeclarativeNotification(showFunction) {
  const notification = (
    <PUNNotification disappearAutomaticallyAfter={0}>
      <PUNContentText>
        {'Click on this notification to remove it'}
        {'\n'}
        {
          'And this is the second line, showing you how you can do multi line messages with this control'
        }
      </PUNContentText>
    </PUNNotification>
  );
  showFunction(notification);
}

function showAutoDisappearNotification(showFunction) {
  const notification = (
    <PUNNotification disappearAutomaticallyAfter={2000}>
      <PUNContentText>
        {'This notification will disappear automatially after 2 seconds'}
      </PUNContentText>
    </PUNNotification>
  );
  showFunction(notification);
}

function showNotificationWhileOverridingStyle(showFunction) {
  const notification = (
    <PUNNotification
      disappearAutomaticallyAfter={0}
      containerWidth="100%"
      style={{
        backgroundColor: 'pink',
        borderRadius: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <PUNContentText style={{color: '#000', textAlign: 'center'}}>
        {
          'You can completley override the style of any element of the notifications'
        }
      </PUNContentText>
    </PUNNotification>
  );
  showFunction(notification);
}

function showFadeInNotification(showFunction) {
  const notification = (
    <PUNNotification disappearAutomaticallyAfter={0}>
      <PUNContentText>
        {'Click on this notification to remove it'}
        {'\n'}
        {
          'And this is the second line, showing you how you can do multi line messages with this control'
        }
      </PUNContentText>
    </PUNNotification>
  );
  showFunction(notification);
}

const App = () => {
  const {
    showNotificationElement,
    showRoundedTextNotification,
    showMaterialStyleTextNotification,
    showNotification,
  } = useContext(PUNContext);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PUNContainer position={NOTIFICATIONS_POSITION.TOP} />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}>
          <Button
            title="Show Declarative Notification"
            onPress={() => {
              showDeclarativeNotification(showNotificationElement);
            }}
          />
          <Button
            title="Show Auto-Disappear Notification"
            onPress={() => {
              showAutoDisappearNotification(showNotificationElement);
            }}
          />
          <Button
            title="Show Notification Overriding Style"
            onPress={() => {
              showNotificationWhileOverridingStyle(showNotificationElement);
            }}
          />

          <Button
            title="Show Rounded Notification Method"
            onPress={() => {
              showRoundedTextNotification({
                text:
                  'Use a helper method to show a notification with default style',
              });
            }}
          />

          <Button
            title="Show Material Style Notification Method"
            onPress={() => {
              showMaterialStyleTextNotification({
                text:
                  'Use a helper method to show a material style notification',
              });
            }}
          />

          <Button
            title="Show Different Animation Notification"
            onPress={() => {
              showFadeInNotification(showNotificationElement);
            }}
          />

          <Button
            title="Using generic showNotification method"
            onPress={() => {
              showNotification({
                text: 'This is a customized text notification',
                autoDisappearTime: 2000,
                entranceAnimationType: 'bounceInDown',
                entranceAnimationDuration: 1300,
                exitAnimationType: 'bounceOutUp',
                exitAnimationDuration: 800,
                width: '90%',
                style: {backgroundColor: 'red'},
                textStyle: {color: '#000'},
              });
            }}
          />
          <Button
            title="Custom notification UI"
            onPress={() => {
              const customUI = (
                <Button
                  title="Example button inside notifcation"
                  onPress={() => Alert.alert('Button is working')}
                />
              );
              showNotification({
                autoDisappearTime: 5000,
                width: '90%',
                notificationUI: customUI,
              });
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    justifyContent: 'flex-end',
  },
});

export default () => (
  <PUNProvider>
    <App />
  </PUNProvider>
);

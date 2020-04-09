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
} from 'react-native';

import {
  PUNNotification,
  PUNContainer,
  PUNContext,
  PUNProvider,
  PUNContentText,
  NOTIFICATIONS_POSITION,
  ANIMATION_TYPES,
} from 'react-native-popup-notifications';

function showDeclarativeNotification(showFunction) {
  const notification = (
    <PUNNotification
      disappearAutomaticallyAfter={0}
      animationType={ANIMATION_TYPES.STRECH_IN}>
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
    <PUNNotification
      disappearAutomaticallyAfter={2000}
      animationType={ANIMATION_TYPES.STRECH_IN}>
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
      animationType={ANIMATION_TYPES.STRECH_IN}
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
    <PUNNotification
      disappearAutomaticallyAfter={0}
      animationType={ANIMATION_TYPES.FADE_IN}>
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
              showRoundedTextNotification(
                'Use a helper method to show a notification with default style',
              );
            }}
          />

          <Button
            title="Show Material Style Notification Method"
            onPress={() => {
              showMaterialStyleTextNotification(
                'Use a helper method to show a material style notification',
              );
            }}
          />

          <Button
            title="Show Fade In Notification"
            onPress={() => {
              showFadeInNotification(showNotificationElement);
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

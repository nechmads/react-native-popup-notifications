import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

const DEFAULT_NOTIFICATION_WIDTH = Dimensions.get('window').width * 0.9;

/**
 * Calculates the notification width based on default or user provided style prop
 * @param {object} containerWidth The width was passed to the notification or null
 */
function calculateNotificationWidth(containerWidth) {
  let notificationWidth = DEFAULT_NOTIFICATION_WIDTH;

  // If we were provided a style prop and a width style in it
  if (containerWidth) {
    // If the provided value is in percantage
    if (isNaN(containerWidth) && containerWidth.includes('%')) {
      notificationWidth =
        (Dimensions.get('window').width *
          parseInt(containerWidth.replace('%', ''), 10)) /
        100;
    } else {
      // Provided value was as a number
      notificationWidth = containerWidth;
    }
  }

  return notificationWidth;
}

/**
 * Represent a popup notification object
 * @param {object} props
 * @param {JSX.Element} [props.children]
 * @param {string} [props.entranceAnimationType] The type of animation to be used when showing the notification. Default to fadeIn animation
 * @param {number} [props.entranceAnimationDuration] the duration of the entrance animation. Default to 1 seocnd
 * @param {string} [props.exitAnimationType] The type of animation to be used when hiding the notification. Defaults to fadeOut animation.
 * @param {number} [props.exitAnimationDuration] The duration of the exit animation. Default to 1 second.
 * @param {number} [props.disappearAutomaticallyAfter] The number of milliseconds after which the notification will auto disappear. 0 means it will stay until the user press it. Default to 0.
 * @param {number|string} [props.containerWidth] The width of the notification. You can pass a number or a percantage string like '80%
 * @param {object} [props.style] Additional style allowing you to override or modify current notification style
 * @param {function} [props.onDisappear] For internal use only. Do not set this parameter.
 */
const PUNNotification = ({
  children,
  entranceAnimationType = 'fadeIn',
  entranceAnimationDuration = 1000,
  exitAnimationType = 'fadeOut',
  exitAnimationDuration = 1000,
  disappearAutomaticallyAfter = 0,
  containerWidth,
  style,
  onDisappear,
  ...rest
}) => {
  const [
    shouldDissapearAutoamtically,
    setShouldDissapearAutomatically,
  ] = useState(disappearAutomaticallyAfter > 0);

  const viewRef = useRef(null);
  const notificationWidth = calculateNotificationWidth(containerWidth);

  // This effect controls the start of the animations
  useEffect(() => {
    viewRef.current.animate(entranceAnimationType, entranceAnimationDuration);

    return () => {};
  }, [entranceAnimationType, entranceAnimationDuration]);

  // This effect controls the end of the animations
  useEffect(() => {
    let timer = null;

    if (shouldDissapearAutoamtically) {
      const delay =
        disappearAutomaticallyAfter === 0 ? 1 : disappearAutomaticallyAfter;

      timer = setTimeout(() => {
        viewRef.current
          .animate(exitAnimationType, exitAnimationDuration)
          .then(() => onDisappear());
      }, delay);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [
    disappearAutomaticallyAfter,
    exitAnimationDuration,
    exitAnimationType,
    onDisappear,
    shouldDissapearAutoamtically,
  ]);

  const onPress = () => {
    setShouldDissapearAutomatically(true);
  };

  return (
    <Animatable.View
      ref={viewRef}
      style={[styles.container, {width: notificationWidth}, style]}
      {...rest}>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={styles.touchContainer}>{children}</View>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    paddingRight: 10,
  },

  touchContainer: {
    width: '100%',
  },
});

export default PUNNotification;

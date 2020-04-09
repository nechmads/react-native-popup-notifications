import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import PUNContext from './PUNDataSource';

export const NOTIFICATIONS_POSITION = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

/**
 * The container element for all notifications. Add this element to the top of your app once
 * compose it in your render method
 * @param {string} position Decide where to show notifications on the screen (top or bottom)
 * @param {object} style Used to add or change any styles for this container
 */
const PUNContainer = ({
  children,
  style,
  position = NOTIFICATIONS_POSITION.TOP,
  ...rest
}) => {
  const {notifications} = useContext(PUNContext);

  if (notifications.length === 0) {
    return null;
  }

  // Decide if we should be displayed based on wether we have any notifications or not
  const shouldDisplay = notifications.length > 0 ? 'flex' : 'none';
  const paddingVertical = DeviceInfo.hasNotch() ? 50 : 20;

  // Manage the style for showing notifications from the top ot bottom of the screen
  const direction =
    position === NOTIFICATIONS_POSITION.TOP
      ? {justifyContent: 'flex-start', flexDirection: 'column'}
      : {justifyContent: 'flex-start', flexDirection: 'column-reverse'};

  return (
    <View
      pointerEvents="box-none"
      display={shouldDisplay}
      style={[
        styles.container,
        {
          paddingVertical: paddingVertical,
        },
        style,
        direction,
      ]}
      {...rest}>
      {notifications}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
  },
});

export default PUNContainer;

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
 * @param {object} props
 * @param {JSX.Element} [props.children]
 * @param {object} [props.style] Additional styles to override or modify the container style
 * @param {string} [props.position] Determine where in the screen the notification will be displayed. Possible values are top or bottom
 **/
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

  const paddingVertical = DeviceInfo.hasNotch() ? 50 : 20;

  // Manage the style for showing notifications from the top ot bottom of the screen
  const direction =
    position === NOTIFICATIONS_POSITION.TOP
      ? {justifyContent: 'flex-start', flexDirection: 'column'}
      : {justifyContent: 'flex-start', flexDirection: 'column-reverse'};

  return (
    <View
      pointerEvents="box-none"
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

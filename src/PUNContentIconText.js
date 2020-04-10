import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PUNIcon from './PUNIcon';

/**
 * Component to display a simple text notification in a notification
 * @param {object} props
 * @param {string} props.iconType The name of the icons package we want to get the icon from (See react-native-vector-icons for options)
 * @param {string} props.iconName The name of the icon we want to display
 * @param {object} [props.textStyle] Additional styles to apply to the text portion of the notification
 * @param {object} [props.iconStyle] Additional styles to apply to the icon
 * @param {number} [props.iconSize] The icon size. Default to 36
 * @param {JSX.Element} [props.children] Pass the actual text you want to display as the children of this component
 */
const PUNContentIconText = ({
  iconType,
  iconName,
  textStyle,
  iconStyle,
  iconSize = 36,
  children,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <PUNIcon
        type={iconType}
        name={iconName}
        size={iconSize}
        style={iconStyle}
      />
      <Text style={[styles.text, textStyle]} {...rest}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    width: '93%',
  },
});
export default PUNContentIconText;

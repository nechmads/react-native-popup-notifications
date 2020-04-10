import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PUNIcon from './PUNIcon';

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

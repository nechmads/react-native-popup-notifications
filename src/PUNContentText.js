import React from 'react';
import {Text, StyleSheet} from 'react-native';

const PUNContentText = ({text, style, children, ...rest}) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
    fontSize: 18,
  },
});
export default PUNContentText;

import React from 'react';
import {Text, StyleSheet} from 'react-native';

/**
 * Component to display a simple text notification in a notification
 * @param {object} props
 * @param {JSX.Element} [props.children] Pass the actual text you want to display as the children of this component
 * @param {object} [props.style] Additional style that will override or modify the text style
 */
const PUNContentText = ({style, children, ...rest}) => {
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

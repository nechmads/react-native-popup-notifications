import React from 'react';

import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';

const getIconType = type => {
  switch (type) {
    case 'zocial':
      return ZocialIcon;
    case 'octicon':
      return OcticonIcon;
    case 'material':
      return MaterialIcon;
    case 'material-community':
      return MaterialCommunityIcon;
    case 'ionicon':
      return Ionicon;
    case 'foundation':
      return FoundationIcon;
    case 'evilicon':
      return EvilIcon;
    case 'entypo':
      return EntypoIcon;
    case 'font-awesome':
      return FAIcon;
    case 'font-awesome-5':
      return FA5Icon;
    case 'simple-line-icon':
      return SimpleLineIcon;
    case 'feather':
      return FeatherIcon;
    case 'antdesign':
      return AntIcon;
    default:
      return MaterialIcon;
  }
};

/**
 * An Icon to display inside a notification. This compoenent is using icons from the react-native-vector-icons package
 * @param {object} props
 * @param {string} [props.type] The icon pack to get the icon from
 * @param {string} [props.name] The name of the icon to display
 * @param {number} [props.size] The size of the icon
 * @param {string} [props.color] The color of the icon
 * @param {object} [props.style] Additional styles to attach to the icon
 **/
const Icon = ({type, name, size, color, style, ...rest}) => {
  const IconComponent = getIconType(type);

  return (
    <IconComponent
      name={name}
      size={size}
      color={color}
      style={style}
      {...rest}
    />
  );
};

export default Icon;

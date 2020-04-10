# React Native PopupNotifications

Highly customizable UI library to show toast style notifications in React Native.

#### Note: V2 and above is using react-native-animatable for all animations. If you want a version that has no dependencies checkout V1 tag.

## Installation

V2 has a two dependencies, make sure you install them first:
https://github.com/react-native-community/react-native-device-info

https://github.com/oblador/react-native-vector-icons#installation

```bash
yarn add react-native-popup-notifications
```

## Just show me how to use it

```JSX
import { PUNProvider } from "react-native-popup-notifications"
import { PUNContainer } from "react-native-popup-notifications"


export default () => (
    const App = () => {
        // Get access to the component API
        const {
		showRoundedTextNotification,
		showMaterialStyleTextNotification,
    } = useContext(PUNContext)

	return (
        // Add the container that will appear above all of your app UI
		<PUNContainer position={NOTIFICATIONS_POSITION.TOP} />

        // Call one of the show methods in the API
        <Button
            title="Show Material Style Notification Method"
            onPress={() => {
              showMaterialStyleTextNotification(
                'Use a helper method to show a material style notification',
              );
            }
          />
	)
}

    // Wrap your app or screens with the provider
	<PUNProvider>
		<App />
	</PUNProvider>
)
```

## Architecture and design choices

Althoug some packages out there allows you to show notifications with just one line of code, with this package I decided to take a different approach. Yes, it requires you to also add a component to your DOM tree, but this approach allows you to fully customize the UI in many different ways as described below.

### The components

The architecture of this component isbased on the composed component pattern. You basically compose a notification using multiple components. This allows you to easily replace one of them with your own component.

You can show notifications using two ways:

- Use helper methods that accept some parameters but mostly use default styles for the notifications. Example methods: showMaterialStyleTextNotification, showRoundedTextNotification
- Compose your own notification and show it using the showNotificationElement

You can easily customize notifications in 2 ways:

- Replace specific component with your own implementation
- Pass your own style prop and override default styles

#### PUNDaatSource and PUNContext

Behind hte scenes the PUNDataSource is the one managing the actual data - the notifications. You as a user don't really need to know about it.
The way you interact with it (add or remove notifications) is through an API exposed to use through the PUNContext object.
For example:

```javascript
import { PUNContext } from "react-native-popup-notifications"

const App = () => {
	const {
		showNotificationElement,
		showRoundedTextNotification,
		showMaterialStyleTextNotification,
	} = useContext(PUNContext)
}
```

#### PUNProvider

To be able to access this context you should wrape your app or screens with a PUNProvider

```javascript
import { PUNProvider } from "react-native-popup-notifications"

export default () => (
	<PUNProvider>
		<App />
	</PUNProvider>
)
```

#### PUNContainer

The PUNContainer is responsible for the layout of notifications on the screen. You should add it once to the top of your DOM tree. The component will hide itself when there are no notifications to display.
By default it supports showing notifications from the top or the bottom of the screen. You can easily replace it with your own component if you want to provide different layouts.

```javascript
import { PUNContainer } from "react-native-popup-notifications"

const App = () => {
	return (
		<PUNContainer position={NOTIFICATIONS_POSITION.TOP} />
		// Rest of your UI
	)
}
```

#### PUNNotification

This compoenent represrnt the container of one notification. It manages the style of the container as well as the enter and exit animations. You can override it's styles or replace it with your own component

#### PUNContentText

This compoenent manages the actual content that will be displayed in the notification. It's a simple text compoenent, but you can easily create your own content compoenents.

#### PUNContentIconText

This compoenent manages the actual content that will be displayed in the notification. It's a simple compoenent to display a notification that is composed from an icon and text, but you can easily create your own content compoenents.

## Animations

V2 is using react-native-animatable to control all animations.
PUNNotification as well as the helper methods in the api receive 4 properties you can control animation type and duration with:

- entranceAnimationType
- entranceAnimationDuration
- exitAnimationType
- exitAnimationDuration

If you don't specify any or some of them, the notification will use the default animations of fade in and fade out with duration of 1000 miliseconds.

To see which animations you can use and what type you need to pass in, check out the react-native-animatable project at: https://github.com/oblador/react-native-animatable

## API and Helper methods

The API exposes a few methods for you to use. Each methos accepts an object with multiple parameters. Most of them have some default values, allowing you to customize the result of the method call.

```javascript
// Use this method to show a PUNNotification or your own custom notification element
addNotificationElement(notificationElement)
```

```javascript
// Use this method to show a notification with rounded edges and some default styles
showRoundedTextNotification({
    text,
    backgroundColor = '#000',
    color = '#FFF',
    autoDisappearTime = 3000,
    ...rest
  })
```

```javascript
// Use this method to show a flat Material style notification
showMaterialStyleTextNotification({
    text,
    backgroundColor = '#000',
    color = '#FFF',
    autoDisappearTime = 3000,
    ...rest
  })
```

```javascript
// Use this method to show a styled information message
showInfoNotification = ({
    text,
    backgroundColor = '#38908F',
    color = '#fff',
    autoDisappearTime = 3000,
    entranceAnimationType = 'bounceInDown',
    exitAnimationType = 'bounceOutUp',
  }
```

```javascript
// Use this method to show a styled error message
showErrorNotification = ({
    text,
    backgroundColor = '#c70039',
    color = '#fff',
    autoDisappearTime = 3000,
    entranceAnimationType = 'bounceInDown',
    exitAnimationType = 'bounceOutUp',
  })
```

```javascript
// Use this method to show a styled warning message
showWarningNotification = ({
    text,
    backgroundColor = '#ffcc00',
    color = '#fff',
    autoDisappearTime = 3000,
    entranceAnimationType = 'bounceInDown',
    exitAnimationType = 'bounceOutUp',
  }
```

```javascript
// Use this method to show your own customized text based notification
showNotification = ({
    text,
    style = {},
    width = '100%',
    autoDisappearTime = 3000,
    entranceAnimationType = 'fadeIn',
    entranceAnimationDuration = 1000,
    exitAnimationType = 'fadeOut',
    exitAnimationDuration = 1000,
    notificationUI,
    textStyle = {},
    ...rest
  }
```

```javascript
// Use this method to show your own customized text and icon based notification
showIconNotification = ({
		text,
		style = {},
		width = "100%",
		autoDisappearTime = 3000,
		entranceAnimationType = "fadeIn",
		entranceAnimationDuration = 1000,
		exitAnimationType = "fadeOut",
		exitAnimationDuration = 1000,
		color = "#fff",
		textStyle = {},
		...rest
	})
```

## Example project

Check out the example project for multiple examples on how to show notifications in different ways including fully customizing their look and feel.

## Contact me

Feel free to contact me with questions at shahar@farfarawaylabs.com

## License

[MIT](https://choosealicense.com/licenses/mit/)

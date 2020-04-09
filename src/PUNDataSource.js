import React, { useState, useRef } from "react"
import PUNNotification from "./PUNNotification"
import PUNContentText from "./PUNContentText"

const PUNContext = React.createContext([])

function generateKey() {
	return `${Date.now()}`
}

/**
 * The notifications provider. Wrap your app or screens with this provider to get access to the notifications API
 */
export function PUNProvider({ children }) {
	const [notifications, setNotifications] = useState([])
	const notificationsRef = useRef()
	notificationsRef.current = notifications

	/**
	 * Show a notification over the current screen
	 * @param {element} notification The react element representing the notification we want to display
	 */
	const addNotificationElement = (notification) => {
		const key = generateKey()
		const clonedNotification = React.cloneElement(notification, {
			key: key,
			onDisappear: () => {
				removeNotification(key)
			},
		})

		setNotifications([...notifications, clonedNotification])
	}

	/**
	 * Hide a notification from the screen
	 * @param {string} key The id of the notificaiton we want to remove
	 */
	const removeNotification = (key) => {
		const filteredNotifications = notificationsRef.current.filter(
			(currNotification) => currNotification.key !== key
		)
		setNotifications(filteredNotifications)
	}

	const showRoundedTextNotification = ({
		text,
		backgroundColor = "#000",
		color = "#FFF",
		autoDisappearTime = 3000,
		...rest
	}) => {
		const notification = (
			<PUNNotification
				disappearAutomaticallyAfter={autoDisappearTime}
				style={{ backgroundColor: backgroundColor, color: color }}
				{...rest}
			>
				<PUNContentText>{text}</PUNContentText>
			</PUNNotification>
		)

		addNotificationElement(notification)
	}

	const showMaterialStyleTextNotification = ({
		text,
		backgroundColor = "#000",
		color = "#FFF",
		autoDisappearTime = 3000,
		...rest
	}) => {
		const notification = (
			<PUNNotification
				disappearAutomaticallyAfter={autoDisappearTime}
				containerWidth="100%"
				style={{
					borderRadius: 0,
					backgroundColor: backgroundColor,
					color: color,
				}}
				{...rest}
			>
				<PUNContentText>{text}</PUNContentText>
			</PUNNotification>
		)

		addNotificationElement(notification)
	}

	const showNotification = ({
		text,
		style = {},
		width = "100%",
		autoDisappearTime = 3000,
		entranceAnimationType = "fadeIn",
		entranceAnimationDuration = 1000,
		exitAnimationType = "fadeOut",
		exitAnimationDuration = 1000,
		notificationUI,
		textStyle = {},
		...rest
	}) => {
		const notification = (
			<PUNNotification
				containerWidth={width}
				style={style}
				entranceAnimationType={entranceAnimationType}
				entranceAnimationDuration={entranceAnimationDuration}
				exitAnimationType={exitAnimationType}
				exitAnimationDuration={exitAnimationDuration}
				disappearAutomaticallyAfter={autoDisappearTime}
				{...rest}
			>
				{text ? <PUNContentText style={textStyle}>{text}</PUNContentText> : notificationUI}
			</PUNNotification>
		)

		addNotificationElement(notification)
	}

	return (
		<PUNContext.Provider
			value={{
				notifications: notifications,
				showNotificationElement: addNotificationElement,
				hideNotification: removeNotification,
				showRoundedTextNotification: showRoundedTextNotification,
				showMaterialStyleTextNotification: showMaterialStyleTextNotification,
				showNotification: showNotification,
			}}
			children={children}
		/>
	)
}

export default PUNContext

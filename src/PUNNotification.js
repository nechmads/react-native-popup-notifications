import React, { useEffect, useRef, useState } from "react"
import { Dimensions, Animated, StyleSheet, TouchableHighlight } from "react-native"

const DEFAULT_NOTIFICATION_WIDTH = Dimensions.get("window").width * 0.9

/**
 * List of all animation types we support
 */
export const ANIMATION_TYPES = {
	STRECH_IN: "STRECH_IN",
	FADE_IN: "FADE_IN",
}

/**
 * Calculates the notification width based on default or user provided style prop
 * @param {object} containerWidth The width was passed to the notification or null
 */
function calculateNotificationWidth(containerWidth) {
	let notificationWidth = DEFAULT_NOTIFICATION_WIDTH

	// If we were provided a style prop and a width style in it
	if (containerWidth) {
		// If the provided value is in percantage
		if (isNaN(containerWidth) && containerWidth.includes("%")) {
			notificationWidth = (Dimensions.get("window").width * parseInt(containerWidth.replace("%", ""))) / 100
		} else {
			// Provided value was as a number
			notificationWidth = containerWidth
		}
	}

	return notificationWidth
}
/**
 * Represent a popup notification object
 * @param {boolean} display Dictates if the notification should be displayed. Default to true
 * @param {string} animationType The type of animation we want to use for this notification
 * @param {integer} disappearAutomaticallyAfter Dictates after how many miliseconds the notification will automatically disappear. Default is 0 which means the notification will not disappear automatically
 * @param {object} style Add or modify styles for this notification
 */
const PUNNotification = ({
	children,
	display = true,
	animationType = ANIMATION_TYPES.STRECH_IN,
	disappearAutomaticallyAfter = 0,
	containerWidth,
	style,
	onDisappear,
	...rest
}) => {
	const [shouldDissapearAutoamtically, setShouldDissapearAutomatically] = useState(
		disappearAutomaticallyAfter > 0
	)

	const width = useRef(new Animated.Value(0)).current
	const opacity = useRef(new Animated.Value(0)).current

	// This effect controls the start of the animations
	useEffect(() => {
		if (display) {
			const notificationWidth = calculateNotificationWidth(containerWidth)

			switch (animationType) {
				case ANIMATION_TYPES.STRECH_IN:
					Animated.parallel([
						Animated.spring(width, {
							toValue: notificationWidth,
							tension: 80,
							useNativeDriver: false,
						}),
						Animated.timing(opacity, {
							toValue: 0.7,
							duration: 1000,
							useNativeDriver: false,
						}),
					]).start()

					break

				case ANIMATION_TYPES.FADE_IN:
					Animated.parallel([
						Animated.timing(width, {
							toValue: notificationWidth,
							duration: 1,
							useNativeDriver: false,
						}),
						Animated.timing(opacity, {
							toValue: 0.7,
							duration: 1000,
							useNativeDriver: false,
						}),
					]).start()

					break
			}
		}
		return () => {}
	}, [animationType, containerWidth, display, opacity, style, width])

	// This effect controls the end of the animations
	useEffect(() => {
		let timer = null

		if (shouldDissapearAutoamtically) {
			const delay = disappearAutomaticallyAfter === 0 ? 1 : disappearAutomaticallyAfter

			switch (animationType) {
				case ANIMATION_TYPES.STRECH_IN:
					timer = setTimeout(() => {
						Animated.timing(opacity, {
							toValue: 0.0,
							duration: 700,
							useNativeDriver: false,
						}).start(() => onDisappear())
					}, delay)
					break

				case ANIMATION_TYPES.FADE_IN:
					timer = setTimeout(() => {
						Animated.timing(opacity, {
							toValue: 0.0,
							duration: 700,
							useNativeDriver: false,
						}).start(() => onDisappear())
					}, delay)
					break
			}
		}
		return () => {
			if (timer) {
				clearTimeout(timer)
			}
		}
	}, [animationType, disappearAutomaticallyAfter, onDisappear, opacity, shouldDissapearAutoamtically])

	const buildAnimationStyle = () => {
		return {
			width: width,
			opacity: opacity,
			display: display ? "flex" : "none",
		}
	}

	const onPress = () => {
		setShouldDissapearAutomatically(true)
	}

	return (
		<Animated.View style={[styles.container, buildAnimationStyle(), style]} {...rest}>
			<TouchableHighlight onPress={() => onPress()} style={styles.touchContainer}>
				{children}
			</TouchableHighlight>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000",
		borderRadius: 5,
		padding: 10,
		marginVertical: 5,
	},

	touchContainer: {
		width: "100%",
		minHeight: 50,
	},
})

export default PUNNotification

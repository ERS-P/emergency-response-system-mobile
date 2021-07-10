import React, { memo, useEffect, useState } from "react";
import { Animated, TouchableOpacity, View, StyleSheet } from "react-native";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const defaultSpringConfig = {
  damping: 30,
  mass: 0.7,
  stiffness: 250,
};

export const BarButton = memo(
  ({
    isFocused,
    options,
    onPress,
    onLongPress,
    inactiveTintColor,
    springConfig,
  }) => {
    const [animationValueThreshold] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.spring(animationValueThreshold, {
        toValue: isFocused ? 0 : 1,
        ...(springConfig || defaultSpringConfig),
        useNativeDriver: true,
      }).start();
    }, [isFocused, animationValueThreshold]);

    return (
      <View style={style.wrapper}>
        <AnimatedTouchable
          accessibilityRole="button"
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          style={[
            style.unfocusedButton,
            { opacity: animationValueThreshold },
            {
              transform: [
                {
                  scale: animationValueThreshold.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
          onLongPress={onLongPress}
        >
          <View style={{ zIndex: 12 }}>
            {options.tabBarIcon && !isFocused ? (
              options.tabBarIcon({
                focused: isFocused,
                color: inactiveTintColor || "white",
                size: 28,
              })
            ) : (
              <View />
            )}
          </View>
        </AnimatedTouchable>
      </View>
    );
  }
);

export const TabBarButton = memo(
  ({
    isFocused,
    options,
    onPress,
    onLongPress,
    activeTintColor,
    springConfig,
  }) => {
    const [animationValueThreshold] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.spring(animationValueThreshold, {
        toValue: isFocused ? 0 : 1,
        ...(springConfig || defaultSpringConfig),
        useNativeDriver: true,
      }).start();
    }, [isFocused, animationValueThreshold]);

    return (
      <View style={style.wrapper}>
        <AnimatedTouchable
          accessibilityRole="button"
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          style={[
            {
              ...style.focusedButton,
              backgroundColor: activeTintColor || "white",
              transform: [
                {
                  translateY: animationValueThreshold.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-18, 100],
                  }),
                },
              ],
            },
          ]}
          onLongPress={onLongPress}
        >
          {options.tabBarIcon
            ? options.tabBarIcon({
                focused: isFocused,
                color: "white",
                size: 28,
              })
            : null}
        </AnimatedTouchable>
      </View>
    );
  }
);

export default TabBarButton;

const style = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: 1,
    elevation: 12,
  },
  focusedButton: {
    position: "absolute",
    height: 60,
    width: 60,
    zIndex: -1,
    borderRadius: 32,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  unfocusedButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    elevation: 12,
    zIndex: 12,
  },
});

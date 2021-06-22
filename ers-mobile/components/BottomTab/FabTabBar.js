import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Path, Svg } from "react-native-svg";

import FabBarButton, { BarButton } from "./tabBarButton";
import { getTabShape } from "./tabBarShape";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const TAB_BAR_HEIGHT = 64;
const tabWidth = 110;

export const defaultSpringConfig = {
  damping: 30,
  mass: 0.7,
  stiffness: 250,
};

export const FabTabBar = ({
  state,
  descriptors,
  navigation,
  color,
  activeTintColor,
  inactiveTintColor,
  springConfig,
  bottomBarContainerStyle,
}) => {
  const [{ width, height }, setDimensions] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });
  const { bottom } = useSafeAreaInsets();
  const d = getTabShape(width, height, tabWidth, TAB_BAR_HEIGHT);

  const tabsWidthValue = React.useMemo(() => width / state.routes.length, [
    width,
    state.routes,
  ]);
  const tabsRealWidth = width / state.routes.length;

  const [animatedValueLength] = useState(
    new Animated.Value(-width + tabsWidthValue * state.index)
  );

  const offset =
    tabsRealWidth < tabWidth
      ? tabWidth - tabsRealWidth
      : (tabsRealWidth - tabWidth) * -1;

  useEffect(() => {
    const newValue = -width + tabsWidthValue * state.index;

    Animated.spring(animatedValueLength, {
      toValue: newValue - offset / 2,
      ...(springConfig || defaultSpringConfig),
      useNativeDriver: true,
    }).start();
  }, [width, height, state, tabsWidthValue, offset, animatedValueLength]);

  const [animationValueThreshold] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(animationValueThreshold, {
      toValue: state.index,
      ...(springConfig || defaultSpringConfig),
      useNativeDriver: true,
    }).start();
  }, [animationValueThreshold, state.index]);

  return (
    <View
      onLayout={({
        nativeEvent: {
          layout: { height: lHeight, width: lWidth },
        },
      }) => {
        setDimensions({ width: lWidth, height: lHeight });
      }}
      style={[
        styles.container,
        {
          marginBottom: bottom,
          height: TAB_BAR_HEIGHT,
        },
        bottomBarContainerStyle,
      ]}
    >
      {bottom > 0 && (
        <View
          style={[
            {
              height: bottom,
              backgroundColor: color,
              bottom: bottom * -1,
            },
            styles.bottomFill,
          ]}
        />
      )}
      <View style={styles.fabButtonsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <FabBarButton
              key={route.key}
              options={options}
              onPress={onPress}
              onLongPress={onLongPress}
              index={index}
              isFocused={isFocused}
              activeTintColor={activeTintColor}
              inactiveTintColor={inactiveTintColor}
            />
          );
        })}
      </View>
      <View
        style={[
          StyleSheet.absoluteFill,
          { elevation: 11, zIndex: 0, backgroundColor: "transparent" },
        ]}
      >
        <AnimatedSvg
          width={width * 2.5}
          height={height + bottom}
          style={{
            width: "100%",
            backgroundColor: "transparent",
            color: "transparent",
            transform: [{ translateX: animatedValueLength }],
          }}
        >
          <Path d={d} fill={color || "#FF5252"} />
        </AnimatedSvg>
      </View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <BarButton
            key={route.key}
            options={options}
            onPress={onPress}
            onLongPress={onLongPress}
            index={index}
            isFocused={isFocused}
            activeTintColor={activeTintColor}
            inactiveTintColor={inactiveTintColor}
          />
        );
      })}
    </View>
  );
};

export default FabTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: TAB_BAR_HEIGHT,
    backgroundColor: "transparent",
  },
  bottomFill: {
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
  },
  fabButtonsContainer: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    width: "100%",
    zIndex: -1,
    height: TAB_BAR_HEIGHT,
  },
});

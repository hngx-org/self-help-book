import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const CustomBottomNavigation = ({ state, descriptors, navigation }) => {
  // Icons
  const historyActive =
    "https://img.icons8.com/ios-filled/C67C4E/50/activity-history.png";
  const profileActive =
    "https://img.icons8.com/ios-filled/C67C4E/50/gender-neutral-user.png";
  const homeActive =
    "https://img.icons8.com/fluency-systems-filled/C67C4E/48/home.png";
  const homeInactive =
    "https://img.icons8.com/fluency-systems-filled/2F2D2C/48/home.png";
  const historyInactive =
    "https://img.icons8.com/ios-filled/2F2D2C/50/activity-history.png";
  const profileInactive =
    "https://img.icons8.com/ios-filled/2F2D2C/50/gender-neutral-user.png";

  const iconState = (focused, active, inactive) => {
    if (focused) {
      return <Image source={{ uri: active }} style={styles.icon} />;
    } else {
      return <Image source={{ uri: inactive }} style={styles.icon} />;
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
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
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.navTextContainer}
            key={index}
          >
            {route.name === "Home" &&
              iconState(isFocused, homeActive, homeInactive)}
            {route.name === "History" &&
              iconState(isFocused, historyActive, historyInactive)}
            {route.name === "Profile" &&
              iconState(isFocused, profileActive, profileInactive)}
            
            <Text
              style={[
                styles.navText,
                { color: isFocused ? "#C67C4E" : "#2F2D2C" },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // zIndex: 1,
    // bottom: 0,
    // left: 0,
    // backgroundColor: 'white',
    elevation: 1,
    shadowColor: '#bababa',
    shadowOffset: 2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: 80,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  navTextContainer: {
    alignItems: "center",
    padding: 10,
    height: "100%",
  },
  icon: {
    width: 24,
    // borderWidth: 1,
    height: 24,
  },
  navText: {
    fontSize: 12,
  },
});

export default CustomBottomNavigation;

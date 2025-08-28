import { View, Text, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
const TabIcon = ({ focused, iconName, label, iconType = 'Ionicons' }: any) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  const iconProps = {
    size: 26,
    color: focused ? '#7c3aed' : '#9ca3af',
  };

  const renderIcon = () => {
    switch (iconType) {
      case 'MaterialIcons':
        return <MaterialIcons name={iconName} {...iconProps} />;
      case 'FontAwesome':
        return <FontAwesome name={iconName} {...iconProps} />;
      case 'Feather':
        return <Feather name={iconName} {...iconProps} />;
      default:
        return <Ionicons name={iconName} {...iconProps} />;
    }
  };

  return (
    <Animated.View
      className="items-center"
      style={{ transform: [{ scale: scaleAnim }] }}
    >
      {renderIcon()}
      <Text
        className={`mt-1 text-xs ${
          focused ? 'text-indigo-600 font-semibold' : 'text-gray-400'
        }`}
      >
        {label}
      </Text>
    </Animated.View>
  );
};

// Layout with Tabs
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          display:'flex',
          paddingTop:20,
          height: 65,
          
          backgroundColor: 'primary',
          borderTopWidth: 1,
          borderTopColor: 'primary-100',
          elevation: 4,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: '#4f46e5',
        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown:false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home-outline"   />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
         headerShown:false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="search"  />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown:false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName="bookmark-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown:false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName="person-outline"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

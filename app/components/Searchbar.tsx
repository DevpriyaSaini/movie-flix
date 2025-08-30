import { View, TextInput } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  placeholder: string;
  value: string;
  onchangeText: (text: string) => void;
}

const Searchbar = ({ placeholder, value, onchangeText }: Props) => {
  return (
 <View className="mx-4 mt-3 rounded-full border border-purple-500/40 bg-dark-200/90 px-5 py-3 flex-row items-center shadow-lg shadow-purple-900/40">
  <MaterialIcons name="search" size={22} color="#a78bfa" />

  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onchangeText}
    placeholderTextColor="#9ca3af"
    className="flex-1 text-white ml-3 text-base "
    autoCorrect={false}
    autoCapitalize="none"
  />
</View>

  );
};

export default Searchbar;

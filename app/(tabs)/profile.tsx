import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";

const url = "http://localhost:8000";

const Profile = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  async function saveToStorage(data: any) {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(data));
      console.log("User data stored in AsyncStorage ✅");
    } catch (error) {
      console.log("Error storing data:", error);
    }
  }

  async function login() {
    try {
      const res = await axios.post(`${url}/user/login`, credentials);
      console.log("Login Response:", res.data);

      await saveToStorage(res.data);
      setCredentials({ email: "", password: "" });
      router.push("/");
    } catch (error: any) {
      console.log("Login Error:", error.response?.data || error.message);
    }
  }

  return (
    <View className="flex-1 justify-center items-center px-6 bg-black">
      {/* Glass-like card */}
      <View className="w-full max-w-md p-6 rounded-2xl bg-white/90 dark:bg-black/30 backdrop-blur-md shadow-lg">
        <Text className="text-3xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">
          Login
        </Text>

        {/* Email */}
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 mb-4 text-base text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70"
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={credentials.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) =>
            setCredentials({ ...credentials, email: text })
          }
        />

        {/* Password */}
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 mb-6 text-base text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={credentials.password}
          onChangeText={(text) =>
            setCredentials({ ...credentials, password: text })
          }
        />

        {/* Button */}
        <TouchableOpacity
          className="bg-purple-600 py-3 rounded-xl shadow-md active:bg-purple-700 dark:bg-purple-500 dark:active:bg-purple-600"
          onPress={login}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Login
          </Text>
        </TouchableOpacity>

        {/* Register link */}
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text className="text-blue-600 dark:text-blue-400 mt-6 text-center">
              Don’t have an account?{" "}
              <Text className="font-semibold">Register</Text>
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Profile;

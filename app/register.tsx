import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

const url = "http://localhost:8000";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function register() {
    if (!user.username || !user.email || !user.password) {
      setMessage("⚠️ All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(`${url}/user/register`, user);
      console.log("Register Response:", res.data);

      setMessage("✅ Registered successfully!");
      setUser({ username: "", email: "", password: "" });
      router.push("/profile");
    } catch (error: any) {
      console.log("Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.error || "❌ Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="  h-full  bg-black">
      <View className="absolute top-10 left-4">
        <TouchableOpacity onPress={() => router.push("/")} className="p-2">
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>
    
        <Image
                    source={{
                      uri: "https://imgs.search.brave.com/2YMVNmZsOSn3cRjBSOPC6aLtAAM73wegfawU-rN11s4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzk5LzkwLzM1/LzM2MF9GXzEyOTk5/MDM1NTJfY2ZnaHls/Sm5rNkdjMWkyOXl0/alFRc05TT2p6eVB0/VTkuanBn",
                    }}
                    className="mx-auto my-5 rounded-lg"
                    style={{ width: 250, height: 80, marginTop: 20, marginLeft: 50 }}
                  />
    <View className="flex-1 justify-center items-center px-6 bg-black ">
      {/* Header hidden */}
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      {/* Back button */}
      

      {/* Glass-like card */}
      <View className="w-full max-w-md p-6 rounded-2xl bg-white/90 dark:bg-black/30 backdrop-blur-md shadow-lg">
        <Text className="text-3xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">
          Register
        </Text>

        {/* Username */}
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 mb-4 text-base text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70"
          placeholder="Name"
          placeholderTextColor="#9CA3AF"
          value={user.username}
          onChangeText={(text) => setUser({ ...user, username: text })}
        />

        {/* Email */}
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 mb-4 text-base text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70"
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={user.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setUser({ ...user, email: text })}
        />

        {/* Password */}
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 mb-6 text-base text-gray-900 dark:text-white bg-white/70 dark:bg-gray-800/70"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={user.password}
          onChangeText={(text) => setUser({ ...user, password: text })}
        />

        {/* Button */}
        <TouchableOpacity
          disabled={loading}
          className={`${
            loading ? "bg-purple-400" : "bg-purple-600 active:bg-purple-700"
          } py-3 rounded-xl shadow-md`}
          onPress={register}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">
              Register
            </Text>
          )}
        </TouchableOpacity>

        {/* Message */}
        {message ? (
          <Text
            className={`text-center mt-4 ${
              message.includes("✅")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {message}
          </Text>
        ) : null}
      </View>
    </View>
    </View>
  );
};

export default Profile;

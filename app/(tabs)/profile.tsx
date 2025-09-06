import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const url = "https://movie-flix-bd25.onrender.com";

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
                    style={{ width: 250, height: 120, marginTop: 20, marginLeft: 50 }}
                  />
    <View className="flex-1 justify-center items-center px-6 -mt-10 bg-black">
      
      
      
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
    </View>
  );
};

export default Profile;

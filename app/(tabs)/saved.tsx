import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Moviecart from "../components/Moviecart"; // Ensure path is correct
import { Image } from "expo-image";

interface SavedMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const Saved = () => {
  const [saved, setSaved] = useState<SavedMovie[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch from AsyncStorage
  async function fetchoffline() {
    try {
      setLoading(true);
      const value = await AsyncStorage.getItem("@MySuperStore:key");

      if (value !== null) {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            setSaved(parsed);
          } else if (typeof parsed === "object" && parsed !== null) {
            setSaved([parsed]);
          } else {
            setSaved([]);
          }
        } catch (parseError) {
          console.log("JSON parse error:", parseError);
          await AsyncStorage.removeItem("@MySuperStore:key");
          setSaved([]);
        }
      } else {
        setSaved([]);
      }
    } catch (error) {
      console.log("AsyncStorage error:", error);
    } finally {
      setLoading(false);
    }
  }

  // Confirmation for clearing all movies
  const confirmClearAll = () => {
    if (saved.length === 0) return;
    
    Alert.alert(
      "Clear All Movies",
      "Are you sure you want to remove all saved movies? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Clear All", 
          onPress: () => clearAllSaved(),
          style: "destructive"
        }
      ]
    );
  };

  // Clear all saved movies
  const clearAllSaved = async () => {
    try {
      await AsyncStorage.removeItem("@MySuperStore:key");
      setSaved([]);
      Alert.alert("Success", "All saved movies have been cleared");
    } catch (error) {
      console.log("Error clearing data:", error);
      Alert.alert("Error", "Failed to clear saved movies");
    }
  };

  // Confirmation for removing a single movie
  const confirmRemoveMovie = (movieId: number, movieTitle: string) => {
    Alert.alert(
      "Remove Movie",
      `Are you sure you want to remove "${movieTitle}" from your saved movies?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => removeMovie(movieId),
          style: "destructive"
        }
      ]
    );
  };

  // Remove single movie
  const removeMovie = async (movieId: number) => {
    try {
      const updatedSaved = saved.filter((movie) => movie.id !== movieId);
      setSaved(updatedSaved);
      await AsyncStorage.setItem(
        "@MySuperStore:key",
        JSON.stringify(updatedSaved)
      );
      Alert.alert("Removed", "Movie has been removed from your saved list");
    } catch (error) {
      console.log("Error removing movie:", error);
      Alert.alert("Error", "Failed to remove movie");
    }
  };

  useEffect(() => {
    fetchoffline();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-[#121212] justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
        <Text className="text-white text-lg mt-2">
          Loading saved movies...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#121212] p-4">
      <View>
        <Image
          source={{
            uri: "https://imgs.search.brave.com/2YMVNmZsOSn3cRjBSOPC6aLtAAM73wegfawU-rN11s4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzk5LzkwLzM1/LzM2MF9GXzEyOTk5/MDM1NTJfY2ZnaHls/Sm5rNkdjMWkyOXl0/alFRc05TT2p6eVB0/VTkuanBn",
          }}
          className="mx-auto my-5 rounded-lg"
          style={{ width: "90%", height: 60, marginTop: 40, marginLeft: 20 }}
        />
      </View>
      
      {/* Header */}
      <View className="flex-row justify-between items-center mt-4 mb-5">
        <Text className="text-white text-2xl ml-2 mt-2 font-bold">Saved Movies</Text>
        {saved.length > 0 && (
          <TouchableOpacity onPress={confirmClearAll} className="p-2">
            <Ionicons name="trash-outline" size={24} color="#ff4444" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Empty state */}
      {saved.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Ionicons name="film-outline" size={64} color="#555" />
          <Text className="text-white text-xl mt-4 mb-2">No saved movies yet</Text>
          <Text className="text-gray-400 text-base">
            Movies you save will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View className="flex-1 -ml-1">
              {/* Movie card */}
              <Moviecart
                id={item.id}
                title={item.title}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                release_date={item.release_date}
              />
              {/* Remove button */}
              <TouchableOpacity
                onPress={() => confirmRemoveMovie(item.id, item.title)}
                className="absolute left-[135px] top-[5px]  bg-black rounded-full "
              >
                <Ionicons name="close-circle" size={24} color="#ff4444" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Saved;
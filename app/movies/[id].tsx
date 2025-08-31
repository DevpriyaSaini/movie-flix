import { View, Text, ScrollView, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<any>(null);

  // Fetch movie details
  async function fetchData(movieId: string) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.EXPO_PUBLIC_MOVIE_API_KEY}&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchData(id as string);
    }
  }, [id]);

  // ✅ Store movie in AsyncStorage
  const addMovieToStorage = async () => {
    if (!movie) return;
    
    try {
      // Get existing movies
      const existingData = await AsyncStorage.getItem("@MySuperStore:key");
      let movies = [];
      
      if (existingData !== null) {
        movies = JSON.parse(existingData);
        // Ensure we always have an array
        if (!Array.isArray(movies)) {
          movies = [movies];
        }
      }
      
      // Check if movie already exists
      const exists = movies.some((m: any) => m.id === movie.id);
      if (!exists) {
        movies.push(movie);
        await AsyncStorage.setItem("@MySuperStore:key", JSON.stringify(movies));
        Alert.alert("Success", "Movie saved!");
      } else {
        Alert.alert("Info", "Movie already saved");
      }
    } catch (error) {
      console.log("Error saving data:", error);
      Alert.alert("Error", "Failed to save movie");
    }
  };

  if (!movie) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-black">
      <View className="flex-1 p-4 items-center">
        {/* Poster */}
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `https://via.placeholder.com/500x750?text=No+Image`,
          }}
          style={{ width: 300, height: 450, marginTop: 20, borderRadius: 12 }}
          contentFit="cover"
        />

        {/* Info */}
        <Text className="text-white text-2xl font-bold mt-4">
          {movie.title}
        </Text>
        <Text className="text-gray-400 mt-1">⭐ {movie.vote_average}</Text>
        <Text className="text-gray-400">📅 {movie.release_date}</Text>
        <Text className="text-white mt-3 text-center px-2">
          {movie.overview}
        </Text>

        {/* Button */}
        <View style={{ marginTop: 20 }}>
          <Button title="Save to Storage" onPress={addMovieToStorage} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;
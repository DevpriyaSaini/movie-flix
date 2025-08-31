import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

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

  // ✅ Fixed: Fetch from AsyncStorage with proper error handling
  async function fetchoffline() {
    try {
      setLoading(true);
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      console.log("Fetching saved movies...");

      if (value !== null) {
        try {
          const parsed = JSON.parse(value);
          console.log("Parsed saved data:", parsed);

          if (Array.isArray(parsed)) {
            setSaved(parsed);
          } else if (typeof parsed === 'object' && parsed !== null) {
            // Handle case where stored data is a single object
            setSaved([parsed]);
          } else {
            console.log("Unexpected data format");
            setSaved([]);
          }
        } catch (parseError) {
          console.log("JSON parse error:", parseError);
          // If JSON is invalid, clear the corrupted data
          await AsyncStorage.removeItem("@MySuperStore:key");
          setSaved([]);
          Alert.alert("Error", "Corrupted data found and cleared");
        }
      } else {
        console.log("No saved movies found in storage.");
        setSaved([]);
      }
    } catch (error) {
      console.log("AsyncStorage error:", error);
      Alert.alert("Error", "Failed to load saved movies");
    } finally {
      setLoading(false);
    }
  }

  // Clear all saved movies
  const clearAllSaved = async () => {
    try {
      await AsyncStorage.removeItem("@MySuperStore:key");
      setSaved([]);
      Alert.alert("Success", "All saved movies cleared");
    } catch (error) {
      console.log("Error clearing data:", error);
      Alert.alert("Error", "Failed to clear saved movies");
    }
  };

  // Remove a single movie
  const removeMovie = async (movieId: number) => {
    try {
      const updatedSaved = saved.filter(movie => movie.id !== movieId);
      setSaved(updatedSaved);
      await AsyncStorage.setItem("@MySuperStore:key", JSON.stringify(updatedSaved));
      Alert.alert("Success", "Movie removed from saved");
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
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading saved movies...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Movies</Text>
        {saved.length > 0 && (
          <TouchableOpacity onPress={clearAllSaved} style={styles.clearButton}>
            <Ionicons name="trash-outline" size={24} color="#ff4444" />
          </TouchableOpacity>
        )}
      </View>

      {saved.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="film-outline" size={64} color="#555" />
          <Text style={styles.emptyText}>No saved movies yet</Text>
          <Text style={styles.emptySubtext}>Movies you save will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieDetails}>
                  {item.release_date} • Rating: {item.vote_average}/10
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => removeMovie(item.id)}
                style={styles.removeButton}
              >
                <Ionicons name="close-circle" size={24} color="#ff4444" />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  clearButton: {
    padding: 8,
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    color: "#888",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  movieItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  movieDetails: {
    color: "#888",
    fontSize: 14,
  },
  removeButton: {
    padding: 4,
  },
});

export default Saved;
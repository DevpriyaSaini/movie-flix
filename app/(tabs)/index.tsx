import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import "@/app/global.css";
import { Image } from "expo-image";
import Searchbar from "../components/Searchbar";
import { useRouter } from "expo-router";
import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import Moviecart from "../components/Moviecart";
import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://movie-flix-bd25.onrender.com";

export default function Index() {
  const router = useRouter();
  const [trending, setTrending] = useState<any[]>([]);

  const {
    data: movies,
    loading: movieloading,
    error: movieerror,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  // Fetch trending movies once
  useEffect(() => {
    async function trendmovie() {
      try {
        const result = await axios.get(`${url}/gettop`);
        console.log("Trending movies data:", result.data); // Debugging log
        setTrending(result.data.data); // ✅ correct
      } catch (error) {
        console.log("error", error);
      }
    }
    trendmovie();
  }, []);

  if (movieloading)
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  if (movieerror)
    return (
      <Text className="mt-20 text-white bg-primary">
        Error: {movieerror.message}
      </Text>
    );

  if (!movies || movies.length === 0)
    return (
      <Text className="mt-20 text-white bg-primary">No movies found</Text>
    );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={require("../../assets/images/blue-watercolor-background.webp")}
        className="absolute w-full z-0"
      />

      <ScrollView
        className="flex-1 bg-transparent z-10"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
      >
        <Image
          source={{
            uri: "https://imgs.search.brave.com/2YMVNmZsOSn3cRjBSOPC6aLtAAM73wegfawU-rN11s4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzk5LzkwLzM1/LzM2MF9GXzEyOTk5/MDM1NTJfY2ZnaHls/Sm5rNkdjMWkyOXl0/alFRc05TT2p6eVB0/VTkuanBn",
          }}
          className="mx-auto my-5 rounded-lg"
          style={{ width: 250, height: 50, marginTop: 40, marginLeft: 40 }}
        />

        <View>
          <Searchbar
            onPress={() => {
              router.push("/search");
            }}
            placeholder="Search for a movie"
          />

          {/* Trending movies from gettop */}
          <View className="mt-5">
            <Text className="text-white ml-5 text-lg font-semibold">
              Top Trending Movies
            </Text>
           <FlatList
  data={trending}
  keyExtractor={(item) => item._id} // ✅ use MongoDB _id
  renderItem={({ item }) => (
    <Moviecart 
      id={item.movie_id}         // or _id depending on Moviecart
      title={item.searchterm}     // if you want to show title
      poster_path={item.poster_url} // pass correct prop name expected by Moviecart
      vote_average={item.vote_average} // optional
      release_date={item.release_date}        // optional
    />
  )}
  horizontal
  showsHorizontalScrollIndicator={false}
  className="px-5 mt-3"
  contentContainerStyle={{ paddingRight: 20}}
  ItemSeparatorComponent={() => <View className="w-4" />}
/>
          </View>

          {/* Latest movies */}
          <Text className="text-lg font-bold text-white ml-5 mt-5 mb-3">
            Latest Movies
          </Text>

          <FlatList
            data={movies}
            renderItem={({ item }) => <Moviecart {...item} />}
            keyExtractor={(item) => String(item.id)}
               numColumns={2}
          columnWrapperStyle={{ justifyContent: "center", gap:25, marginVertical: 10 }}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
            className="mt-2 pb-32"
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

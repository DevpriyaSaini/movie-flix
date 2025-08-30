import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import "@/app/global.css";  
import { Image } from "expo-image";
import Searchbar from "../components/Searchbar";
import { useRouter } from "expo-router";
import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import Moviecart from "../components/Moviecart";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: movieloading,
    error: movieerror
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  if (movieloading) return <ActivityIndicator size="large" color="blue" />;
if (movieerror) return <Text>Error: {movieerror.message}</Text>;
if (!movies) return <Text>No movies found</Text>;

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
          className="mx-auto my-5 rounded-lg mt-10"
          style={{ width: "90%", height: 50 ,marginTop:40, marginLeft:20 }}
        />

       <View>
            <Searchbar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
              
            />

            <Text className="text-lg font-bold text-white font-bold ml-5 mt-2 mb-3">
              Latest movies
            </Text>

            <FlatList 
            data={movies}
            renderItem={({item})=>(
              <Moviecart
                 {...item}
                    
              />
              
            )}
            keyExtractor={(item)=>item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{justifyContent:'flex-start',gap:20,paddingRight:5,marginBottom:10}} 
            className="mt-2 pb-32"
            scrollEnabled={false}
            />
          </View>
      </ScrollView>
    </View>
  );
}

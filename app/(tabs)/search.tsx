import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { Image } from 'expo-image';
import Moviecart from '../components/Moviecart';
import useFetch from '@/services/usefetch';
import { fetchMovies } from '@/services/api';
import Searchbar from '../components/Searchbar';
import axios from 'axios';


const url="https://movie-flix-bd25.onrender.com"
const Search = () => {
  const [Query, setQuery] = React.useState('');  

  const {
    data: movies,
    loading: movieloading,
    refetch: reloadmovie,
    reset,
    error: movieerror
  } = useFetch(() =>
    fetchMovies({
      query: Query,
    }), false
  );

 
  
 
  async function topmovie(movies: any) {
  try {
    const result = await axios.post(`${url}/movies`, {
       searchterm:movies.original_title,
      movie_id: movies.id,
      poster_url: movies.poster_path,
       vote_average: movies.vote_average,
      release_date: movies.release_date

    });
    console.log("Saved:", result.data);
    return result.data;
  } catch (err) {
    console.error("Error saving movie:", err);
  }
}

 useEffect(() => {
  console.log("use")
  if (movies && movies.length > 0) {
    topmovie(movies[0]);
  }
}, [movies]);
  useEffect(() => {
    const timeoutId =setTimeout( async () => {
      if (Query.trim()) {
        await reloadmovie();
      } else {
        reset();
      }
    },1000);
    return ()=>clearTimeout(timeoutId);
    
  }, [Query]);


  return (
    <View className="flex-1 bg-primary">


      <Image
        source={{
          uri: "https://imgs.search.brave.com/b6Xftw9K_igq5YJBGbGAt4ZquFP2cFRXhlJt5sbeuHo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp..."
        }}
        className="flex-1 absolute w-full z-0"
      />
            <Image
          source={{
            uri: "https://imgs.search.brave.com/2YMVNmZsOSn3cRjBSOPC6aLtAAM73wegfawU-rN11s4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzk5LzkwLzM1/LzM2MF9GXzEyOTk5/MDM1NTJfY2ZnaHls/Sm5rNkdjMWkyOXl0/alFRc05TT2p6eVB0/VTkuanBn",
          }}
          className="mx-auto  rounded-lg "
          style={{ width: "90%", height: 50 ,marginTop:40, marginLeft:20 }}
        />
      {movieloading && (
        <ActivityIndicator size="large" color="blue" className="mt-50" />
      )}

      {movieerror && (
        <Text className="text-red-500 text-center mt-4">
          Error: {movieerror.message}
        </Text>
      )}

      
      

      {!movieloading && !movieerror && (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Moviecart {...item} />}
          className="px-5"
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "center", gap: 16, marginVertical: 10 }}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
          ListHeaderComponent={
            <>
            
              <View className="my-2 text-white">
                <Searchbar
                  placeholder="Search movie..."
                  value={Query}
                  onchangeText={(text: string) => setQuery(text)}
                />
              </View>
              <Text className="text-white ml-5 mb-5 font-bold mt-3">Result for : {Query}</Text>
               {!movies && (
        <Text className='text-white ml-[100px] mt-10'>
          No movie fonud 
        </Text>
      )}
            </>
          }
        />
      )}
    </View>
  );
};


export default Search;

import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { Image } from 'expo-image';
import Moviecart from '../components/Moviecart';
import useFetch from '@/services/usefetch';
import { fetchMovies } from '@/services/api';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-screens';
import Searchbar from '../components/Searchbar';



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
      <Text className="text-white text-xl p-4">Search</Text>

      <Image
        source={{
          uri: "https://imgs.search.brave.com/b6Xftw9K_igq5YJBGbGAt4ZquFP2cFRXhlJt5sbeuHo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp..."
        }}
        className="flex-1 absolute w-full z-0"
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
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "center", gap: 16, marginVertical: 10 }}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
          ListHeaderComponent={
            <>
            
              <View className="my-5 text-white">
                <Searchbar
                  placeholder="Search movie..."
                  value={Query}
                  onchangeText={(text: string) => setQuery(text)}
                />
              </View>
              <Text className="text-white ml-5 mb-5">Result for : {Query}</Text>
               {!movies && (
        <Text className='text-white ml-20'>
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

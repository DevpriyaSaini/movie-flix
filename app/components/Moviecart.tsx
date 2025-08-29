import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";


const Moviecart = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity
        className="bg-white rounded-lg ml-1 mr-1 mb-3 shadow-md overflow-hidden"
        style={{ width: 160 }}
      >
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://via.placeholder.com/500x750?text=No+Image`,
          }}
          style={{ width: 160, height: 225 }}
          resizeMode="cover"
        />

        <View className="p-2">
          <Text className="text-2sm font-semibold" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-xs text-gray-500">{release_date}</Text>
          <Text className="text-xs text-yellow-500">⭐ {vote_average}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default Moviecart;

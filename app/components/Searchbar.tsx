import { View, Text, TextInput } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
interface Props{
  placeholder:string; 
  onPress:()=>void;
}
const Searchbar = ({placeholder,onPress}:Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 mx-4 p-3 rounded-full px-5 py-2 mt-2'>
      <MaterialIcons name="search" size={26} color={"white"}/>
      <TextInput 
      onPress={onPress}
      placeholder={placeholder}
      value=''
      onChangeText={()=>{}}
      placeholderTextColor={"white"}
      className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default Searchbar
import { ScrollView, Text, View } from "react-native";
import "@/app/global.css";  
import { Image } from "expo-image";
import Searchbar from "../components/Searchbar";
import { useRouter } from "expo-router";


export default function Index() {
  const router=useRouter();
  return (
    <View className="flex-1 bg-primary">
      <Image source={require('../../assets/images/blue-watercolor-background.webp')} className=" absolute w-full z-0"/>
      <ScrollView className="flex-1 bg-transparent z-10" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:10,minHeight:'100%'}}>
     <Image
    
  source={{ uri: "https://imgs.search.brave.com/2YMVNmZsOSn3cRjBSOPC6aLtAAM73wegfawU-rN11s4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzk5LzkwLzM1/LzM2MF9GXzEyOTk5/MDM1NTJfY2ZnaHls/Sm5rNkdjMWkyOXl0/alFRc05TT2p6eVB0/VTkuanBn" }}
 
  className="mx-auto my-5 rounded-lg mt-70"
  style={{ width: "90%", height: 50 }}
 
/>

   <Searchbar 
   onPress={()=>{
    router.push('/search');
   }}
   placeholder="Search for a movie"
   />


      </ScrollView>
    </View>
  );
}

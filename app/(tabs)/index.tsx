import { Text, View } from "react-native";
import "@/app/global.css";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white"
    >
      <Text className="text-5xl text-dark font-bold">welcome! hey</Text>
      <Link href="/onboarding" className="mt-10 px-5 py-3 bg-dark rounded-full">
        get start hey i am here
      </Link>
      <Link href="/movies/avenger">Avenger movie</Link>
    </View>
  );
}

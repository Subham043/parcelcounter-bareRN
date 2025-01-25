import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomPageCategories from "@/components/HomPageCategories";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View className="flex-1 bg-white">
        <HomPageCategories />
      </View>
    </SafeAreaView>
  );
}
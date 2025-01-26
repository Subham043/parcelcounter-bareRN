import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomPageCategories from "@/components/HomPageCategories";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.wrapper}>
        <HomPageCategories />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
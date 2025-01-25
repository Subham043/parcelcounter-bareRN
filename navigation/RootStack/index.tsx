import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabStack from '../TabStack';
import SearchScreen from '@/screens/Search';
import { Image, TouchableOpacity } from 'react-native';
import { Heading } from '@/components/ui/heading';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function RootStack() {
    const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerLeft: () => <Image
            source={require("@/assets/images/small-logo.png")}
            alt="Logo"
            className="object-contain"
            style={{ width: 40, height: 40, marginRight: 5 }}
        />,
        headerTitle: () => <Heading size="xl" bold={false} className="font-medium">Parcel Counter</Heading>,
        headerRight: () => <TouchableOpacity onPressIn={() => { navigation.navigate('Search'); }}>
            <Icon name="search1" size={24} color="black" />
        </TouchableOpacity>,
      }}     
    >
      <Stack.Screen name="Tab" component={TabStack} options={{ title: 'Overview' }} />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
            presentation: 'fullScreenModal',
            animation: 'fade_from_bottom',
            headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
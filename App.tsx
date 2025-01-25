import "./global.css";
import * as React from 'react';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { NavigationContainer } from '@react-navigation/native';
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { useAppState } from "@/hooks/useAppState";
import { onAppStateChange, queryClient } from "@/constants/QueryClientOptions";
import RootStack from "./navigation/RootStack";

export default function App() {
  
  useAppState(onAppStateChange)

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
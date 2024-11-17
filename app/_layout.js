import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack 
        screenOptions={{
            headerStyle: {
                backgroundColor: '#0096FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
    />
    );  
}
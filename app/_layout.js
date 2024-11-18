import { Stack } from 'expo-router/stack';


export default function Layout() {
  return (
    <Stack 
        screenOptions={{
            headerStyle: {
                backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: 'Transactions',
            headerTitleAlign: 'center',
        }}
    />
    );  
}
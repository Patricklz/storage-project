import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainView from './pages/Main/mainView';
import UserView from './pages/User/userView';

const Stack = createStackNavigator();

const StackNavigation = () => (
    <Stack.Navigator
        screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#7159c1',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
    >
        <Stack.Screen name="Usuários" component={MainView} />
        <Stack.Screen name="User" component={UserView} options={({ route }) => ({ title: route.params.name })} />
    </Stack.Navigator >
);

export default function Routes(route) {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <NavigationContainer>
                <StackNavigation />
            </NavigationContainer>
        </>
    );
}

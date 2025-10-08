import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoadingScreen from "../ui/LoadingScreen";

import MainStack from "./tabNavigation";

const Stack = createStackNavigator();

const StackNavigator = () => {
    
    return(
        <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
                {/* On Boarding */}
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                {/* Main App with Tab Navigation */}
                <Stack.Screen name="MainApp" component={MainStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;
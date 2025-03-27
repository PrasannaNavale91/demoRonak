import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import About from "./screens/About";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import Payments from "./screens/Payments";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Account from "./screens/Account/Account";
import Profile from "./screens/Account/Profile";
import MyOrders from "./screens/Account/MyOrders";
import Dashboard from "./screens/Admin/Dashboard";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from "./components/Layout/Header";
import Categories from "./components/category/Categories";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => (
  <View style={styles.screen}>
    <Header navigation={navigation} />
    <Home />
  </View>
);

export default function Main() {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const getUserLocalData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      setIsAuth(data);
      console.log("user login data ==>", data);
    };
    getUserLocalData();
  }, []);
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="home"
          screenOptions={{
            drawerStyle: {
              backgroundColor: "#f0f0f0",
              width: 240,
            },
            headerShown: false,
          }}
        >
          <Drawer.Screen
            name="home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="productDetails" component={ProductDetails} />
          <Stack.Screen name="checkout" component={Checkout} />
          <Stack.Screen name="myorders" component={MyOrders} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="categories" component={Categories} />
          <Stack.Screen name="adminPanel" component={Dashboard} />
          <Stack.Screen name="payment" component={Payments} />
          <Stack.Screen name="account" component={Account} />
          <Stack.Screen name="cart" component={Cart} />
          <Stack.Screen name="mobile" component={About} />

          {!isAuth && (
            <>
              <Stack.Screen
                name="login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="register"
                component={Register}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
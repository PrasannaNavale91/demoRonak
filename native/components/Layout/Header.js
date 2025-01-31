import {
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
  } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    console.log(searchText);
    setSearchText("");
  };

  return (
    <View style={{
      height: 90,
      backgroundColor: "lightgray",
      }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburger} onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={require('./../../assets/logo.png')} style={{width: 36, height: 36, marginTop: 5}} />
        </View>

        <View style={styles.iconGroup}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={22} color="#000" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="cart-outline" size={22} color="#000" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <FontAwesome name="search" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  hamburger: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    width: 50,
  },
  icon: {
    padding: 5,
    color: "#000000",
    fontSize: 18,
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  inputBox: {
    borderWidth: 0.3,
    width: "100%",
    position: "absolute",
    left: 15,
    height: 40,
    color: "#000000",
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  searchBtn: {
    position: "absolute",
    left: "95%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sideMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    width: 200,
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    elevation: 10,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    fontSize: 16,
    marginVertical: 10,
    color: "#6200ee",
  },
});

export default Header;
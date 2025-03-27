import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";

const { width } = Dimensions.get("window");

const Banner = () => {
  const banners = [
    {
      _id: 1,
      image: require("../../assets/banner_1.png"),
      cornerLabelColor: "#FFD300",
    },
    {
      _id: 2,
      image: require("../../assets/banner_2.png"),
      cornerLabelColor: "#0080ff",
    },
    {
      _id: 3,
      image: require("../../assets/banner_3.png"),
      cornerLabelColor: "#2ECC40",
    },
  ];

  const renderItem = (data) => (
    <View key={data._id} style={styles.cardContainer}>
      <Pressable onPress={() => alert(data._id)}>
        <View style={styles.cardWrapper}>
          <Image style={styles.card} source={data.image} resizeMode="cover" />
          <View
            style={[styles.cornerLabel, { backgroundColor: data.cornerLabelColor }]}
          >
            <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={banners}
        loop
        autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  cardWrapper: {
    overflow: "hidden",
  },
  card: {
    width: width * 1,
    height: width * 0.4,
  },
  cornerLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default Banner;
import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

const ListItem = ({ video }) => {
  const url = `https://www.youtube.com/watch?v=${video.id.videoId}`;

  return (
    <View style={styles.parentStyle}>
      <Text style={styles.titleStyle}>{video.snippet.title}</Text>
      <Text style={styles.descStyle}>{video.snippet.description}</Text>
      <Text style={styles.linkStyle} onPress={() => Linking.openURL(url)}>
        Go to video
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  parentStyle: {
    margin: 8,
    padding: 8,
  },
  titleStyle: {
    fontStyle: "italic",
    color:"white",
    fontSize: 24,
    fontWeight: "bold",
  },

  descStyle: {
    fontSize: 18,
    color: "white",
  },

  linkStyle: {
    fontSize:20,
    color: "red"
  },
});

export default ListItem;

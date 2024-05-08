import { View, Animated, Dimensions } from "react-native";
import React from "react";

const {width} = Dimensions.get('screen');

const CarouselPagination = ({ data, scrollX, index }) => {
  return (
    <View className="flex-row absolute bottom-96 items-center justify-center w-full">
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.1],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#F8C29E", "#ED7D31", "#F8C29E"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={idx.toString()}
            className="w-2 h-2 bg-orange-100 mx-1 rounded-full"
            style={[{width: dotWidth, backgroundColor}]}
          />
        );
      })}
    </View>
  );
};

export default CarouselPagination;

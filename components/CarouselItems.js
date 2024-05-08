import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
const { width, height } = Dimensions.get("screen");

const CarouselItems = ({ item, handlePress }) => {
  return (
    <View className="items-center" style={{ width, height }}>
      <View>
        <View>
          <View>
            <Image
              source={item.img}
              className="mx-auto mt-14 w-56 h-56"
              resizeMode="contain"
            />
          </View>
          <View className="mt-10 mx-20">
            <Text className="font-psemibold text-2xl text-center">
              {item.title}
            </Text>
          </View>
          <View className="mx-4 mt-4">
            <Text className="font-pregular text-base text-center">
              {item.description}
            </Text>
          </View>
        </View>
        {item.id === 3 ? (
          <View className="mt-20">
            <CustomButton
              text="Selesai"
              handlePress={handlePress}
              backgroundColor="bg-orange"
              textColor="text-white"
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default CarouselItems;

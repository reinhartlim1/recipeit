import { View, FlatList, Animated } from "react-native";
import React, { useRef } from "react";
import { images } from "../constants";
import CarouselItems from "./CarouselItems";
import CarouselPagination from "./CarouselPagination";

const data = [
  {
    id: 1,
    img: images.Chef,
    title: "Become Chef with your Recipe",
    description: "Dapatkan resep baru dengan bahan-bahan yang ada di tempatmu",
  },
  {
    id: 2,
    img: images.MealPlan,
    title: "Meal Planning",
    description: "Rencanakan menu makanan Anda dengan mudah dan efisien.",
  },
  {
    id: 3,
    img: images.Cook,
    title: "Ready To Cook?",
    description:
      "Sekarang Anda siap untuk memasak dengan Recipeit. Mari kita mulai menciptakan hidangan lezat bersama!",
  },
];

const Carousel = ({ handlePress }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <CarouselItems item={item} handlePress={handlePress} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        // ItemSeparatorComponent={() => <View className="w-5" />}
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
      />
      <CarouselPagination data={data} scrollX={scrollX} />
    </View>
  );
};

export default Carousel;

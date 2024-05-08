import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { icons } from "../../constants";

const Home = () => {
  return (
    <SafeAreaView>
      <View className="h-[115px] bg-green">
        <View className="mt-6 mx-8 ">
          <View className="flex-row items-center justify-between">
            <Text className="font-pmedium text-white text-[14px]">Hi, Future Chef</Text>
            <View className="items-center justify-center rounded-full h-[30px] w-[30px] bg-white">
              <Image
                source={icons.Notification}
                resizeMode="contain"
                className="h-[20px] w-[15px]"
              />
            </View>
          </View>
          <View>
            <Text className="font-psemibold text-[18px] text-white">Make new recipe today!</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        
      </ScrollView>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileNavigation from "../../components/ProfileNavigation";

const Profile = () => {
  return (
    <SafeAreaView>
      <View className="bg-green">
        <View className="h-2/5 bg-green items-center">
          <View className="justify-center items-center">
            <Text className="mt-[6px] text-white font-psemibold text-[20px]">
              Akun
            </Text>
          </View>
          <View className="mt-[20px] h-[130px] w-[130px] bg-white rounded-full"></View>
          <View className="mt-[24px] items-center">
            <Text className="font-psemibold text-[18px] text-white">
              John Doe
            </Text>
            <Text className="font-pregular text-[13px] text-white">
              Bandung, West Java
            </Text>
          </View>
        </View>
        <View className="bg-white rounded-t-[30px] h-3/5">
          <View className="justify-center items-center">
            <View className="mt-[14px] w-[70px] h-[4px] flex flex-row">
              <View className="bg-orange flex-1"></View>
            </View>
          </View>
          <View className="mt-[11px] mx-[33px]">
            <Text className="font-psemibold text-[14px] opacity-50">
              General
            </Text>
            <ProfileNavigation />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";

const CustomButton = ({ text, handlePress, backgroundColor, textColor }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${backgroundColor} rounded-[10px] min-h-[44px] justify-center items-center`}
    >
      <Text className={`font-psemibold ${textColor}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

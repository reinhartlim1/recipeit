import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";

const CustomButton = ({ text, handlePress, backgroundColor, textColor, isCard }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${backgroundColor} rounded-[10px] ${isCard ? "min-h-[30px]" : "min-h-[44px]"} justify-center items-center`}
    >
      <Text className={`${isCard ? "font-pmedium text-xs" : "font-psemibold"} ${textColor}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

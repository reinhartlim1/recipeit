import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { icons } from "../constants";

const FormField = ({ title, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="mt-4">
      <Text className="font-pregular text-[13px]">{title}</Text>
      <View className="w-full h-[55px] px-4 rounded-xl border border-gray-100 flex flex-row items-center">
        <TextInput
          className="mt-1 flex-1"
          placeholder={placeholder}
          secureTextEntry={
            (title == "Password" || title == "Konfirmasi Password") &&
            !showPassword
          }
        />
        {(title == "Password" || title == "Konfirmasi Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={icons.ShowPassword}
              className="w-5 h-4"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

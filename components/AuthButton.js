import { Text, TouchableOpacity, Image, View, containerStyles } from "react-native";

const AuthButton = ({ text, handlePress, icon, containerStyles }) => {
  return (
    <View
      className={`${containerStyles} bg-transparent mt-6 grow rounded-[15px] min-h-[44px] justify-center items-center border-0.5 h-12 w-35`}
    >
      <TouchableOpacity onPress={handlePress}>
        <View className="flex-row">
          <Image source={icon} resizeMode="contain" className="w-5 h-5" />
          <Text className={"font-psemibold ml-4"}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AuthButton;

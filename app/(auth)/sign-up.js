import { View, Text, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="items-center justify-center mx-8">
          <Image
            source={icons.Logo}
            resizeMode="contain"
            className="w-[50px] h-[50px] mt-[72px]"
          />
          <Text className="mt-[31px] font-psemibold text-[28px]">Register</Text>
          <Text className="mt-2 font-pregular text-base text-gray-100">
            Selamat datang di RecipeIt
          </Text>

          <View className="w-full mt-6">
            <FormField
              title="Nama Lengkap"
              placeholder="Enter your full name"
            />
            <FormField title="Email" placeholder="Enter your email" />
            <FormField title="Password" placeholder="Enter your password" />
            <FormField
              title="Konfirmasi Password"
              placeholder="Enter password confirmation"
            />
            <View className="mt-9">
              <CustomButton
                text="Register"
                handlePress={() => {}}
                backgroundColor="bg-green"
                textColor="text-white"
              />
            </View>
          </View>

          <View className="flex flex-row justify-center my-16">
            <Text className="opacity-50">Sudah punya akun?</Text>
            <Link href="/sign-in">
              <Text className="text-green"> Sign In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

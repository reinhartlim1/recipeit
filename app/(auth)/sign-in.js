import { View, Text, Image, Alert } from "react-native";
import { Link, router } from "expo-router";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import AuthButton from "../../components/AuthButton";
import { auth } from "../firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      console.log("User is signed in 2")
      router.replace("/home");
    } catch (error) {
      console.log(error.message);
      Alert.alert("Sign-in error", error.message);
    }
  };

  return (
    <SafeAreaView>
      <View className="items-center justify-center mx-8">
        <Image
          source={icons.Logo}
          resizeMode="contain"
          className="w-[50px] h-[50px] mt-[72px]"
        />
        <Text className="mt-[31px] font-psemibold text-[28px]">Login</Text>
        <Text className="mt-2 font-pregular text-base text-gray-100">
          Selamat datang kembali di RecipeIt
        </Text>

        <View className="w-full mt-6">
          <FormField
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          <View className="mt-9">
            <CustomButton
              text="Login"
              handlePress={handleSignIn}
              backgroundColor="bg-green"
              textColor="text-white"
            />
          </View>

          {/* Line Break */}
          <View className="items-center mt-6 flex flex-row">
            <View className="flex-1 h-[1px] mr-2 bg-gray-100"></View>
            <Text className="text-gray-100">or Login With</Text>
            <View className="flex-1 h-[1px] ml-2 bg-gray-100"></View>
          </View>

          {/* OAuth */}
          <View className="flex flex-wrap flex-row">
            <AuthButton
              text="Google"
              handlePress={() => {}}
              icon={icons.Google}
              containerStyles="mr-2"
            />
            <AuthButton
              text="Facebook"
              handlePress={() => {}}
              icon={icons.Facebook}
              containerStyles="ml-2"
            />
          </View>

          {/* Sign Up Redirect */}
          <View className="flex flex-row justify-center mt-16">
            <Text className="opacity-50">Belum punya akun?</Text>
            <Link href="/sign-up">
              <Text className="text-green"> Sign Up</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

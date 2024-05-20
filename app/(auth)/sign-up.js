import { View, Text, ScrollView, Image, Alert } from "react-native";
import { Link, router } from "expo-router";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { auth, firestore } from "../firebase/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function createUserProfile(user) {
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        fullName: form.fullName,
        email: form.email,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const checkPassword = () => {
    if (form.password !== form.confirmPassword) {
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (checkPassword()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        
        const user = userCredential.user;
        createUserProfile(user);
        router.replace("/home");

      } catch (error) {
        console.log(error.message);
        Alert.alert("Sign-up error", error.message);
      }
    } else {
      Alert.alert(
        "Sign-up error",
        "Password and confirm password must be the same"
      );
    }
  };

  const createProfile = async () => {};

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
              value={form.fullName}
              handleChangeText={(e) => setForm({ ...form, fullName: e })}
            />
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
            <FormField
              title="Konfirmasi Password"
              placeholder="Enter password confirmation"
              value={form.confirmPassword}
              handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            />
            <View className="mt-9">
              <CustomButton
                text="Register"
                handlePress={handleSignUp}
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

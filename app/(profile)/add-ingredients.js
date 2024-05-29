import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import IngredientInput from "../../components/IngredientInput";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { useGlobalContext } from "../context/GlobalProvider";
import { collection, addDoc, doc } from "firebase/firestore";
import { storage, firestore } from "../firebase/firebaseconfig";

const AddIngredients = () => {
  const { user } = useGlobalContext();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Mg");
  const [ingredient, setIngredient] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("No image selected");
    }
  };
  // console.log(image);

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Please select an image first");
      return;
    }

    setUploading(true);

    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${new Date().toISOString()}-${ingredient}`);
    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const pantryCollectionRef = collection(userDocRef, "pantry");

        await addDoc(pantryCollectionRef, {
          image: downloadURL,
          user: user.uid,
          ingredient: ingredient,
          quantity: quantity,
          unit: unit,
        });
        Alert.alert("Data uploaded successfully");
        setQuantity("");
        setUnit("");
        setIngredient("");
        setImage(null);
        Alert.alert("Image uploaded successfully");
      }
    } catch (e) {
      Alert.alert("Error uploading image", e.message);
    } finally {
      setUploading(false);
      router.replace("/digital-pantry");
    }
  };

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-between mx-8 mt-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.Back} resizeMode="contain" className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="text-center flex-1 mr-8 font-pmedium text-xl">
          Digital Pantry
        </Text>
      </View>

      <View className="mx-8">
        <View className="flex flex-row items-center justify-between mt-8">
          <Text className="font-bold text-lg">Foto Bahan</Text>
        </View>
        <View className="h-0.5 mt-1 flex flex-row">
          <View className="bg-black opacity-20 flex-1"></View>
        </View>
        <View className="mt-1">
          <Text className="text-gray-600 font-medium">
            Pilih foto yang terlihat jelas, ya.
          </Text>
        </View>
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-full h-80"
            resizeMode="cover"
          />
        ) : (
          <View className="mt-1 w-full bg-neutral-300 h-80">
            <TouchableOpacity
              className="w-full h-full items-center justify-center"
              onPress={pickImage}
            >
              <Image
                source={icons.Camera}
                resizeMode="contain"
                className="w-1/5 h-1/5"
              />
            </TouchableOpacity>
          </View>
        )}
        <View className="mt-5">
          <IngredientInput
            ingredient={ingredient}
            setIngredient={setIngredient}
            quantity={quantity}
            setQuantity={setQuantity}
            unit={unit}
            setUnit={setUnit}
          />
        </View>
        <View className="mt-8">
          <CustomButton
            text="Submit"
            backgroundColor="bg-orange"
            textColor="text-white"
            handlePress={uploadImage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddIngredients;

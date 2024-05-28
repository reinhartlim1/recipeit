import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { icons, images } from "../../constants";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { firestore } from "../firebase/firebaseconfig";
import { collection, doc, getDocs } from "firebase/firestore";
import { useGlobalContext } from "../context/GlobalProvider";
import PantryCard from "../../components/PantryCard";

const DigitalPantry = () => {
  const { user } = useGlobalContext();
  const [pantry, setPantry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const pantryCollectionRef = collection(
          firestore,
          "users",
          user.uid,
          "pantry"
        );
        const pantrySnapshot = await getDocs(pantryCollectionRef);
        const pantryArray = [];
        pantrySnapshot.forEach((doc) => {
          pantryArray.push(doc.data());
        });
        setPantry(pantryArray);
      } catch (e) {
        console.error("Error fetching document: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPantry();
  }, [user.uid]);

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
      <ScrollView className="mt-10 mx-8">
        <View className="flex flex-wrap flex-row -mx-2">
          {pantry.map((item) => (
            <View className="w-1/2 px-2 mb-4">
              <PantryCard
                ingredient={item.ingredient}
                quantity={item.quantity}
                unit={item.unit}
                imageURL={item.image}
              />
            </View>
          ))}
        </View>
        <CustomButton
          backgroundColor="bg-orange"
          text="Add other ingredients"
          textColor="text-white"
          handlePress={() => router.push("/add-ingredients")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DigitalPantry;

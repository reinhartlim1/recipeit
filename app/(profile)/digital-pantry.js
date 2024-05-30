import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { firestore } from "../firebase/firebaseconfig";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { useGlobalContext } from "../context/GlobalProvider";
import PantryCard from "../../components/PantryCard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DigitalPantry = () => {
  const { user } = useGlobalContext();
  const [pantry, setPantry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIngredientId, setSelectedIngredientId] = useState(null);

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
          pantryArray.push({
            id: doc.id,
            ...doc.data(),
          });
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "users", user.uid, "pantry", id));
      const newPantry = pantry.filter((item) => item.id !== id);
      setPantry(newPantry);
      Alert.alert("Success", "Item deleted successfully");
    } catch (e) {
      console.error("Error deleting document: ", e);
      Alert.alert("Error", "Failed to delete item");
    }
  }

  const confirmDelete = (id) => {
    setSelectedIngredientId(id);
    setModalVisible(true);
  }

  const handleEdit = (id) => {
    router.push(`/edit-ingredient/${id}`);
  }
  
  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-between mx-8 mt-8">
        <TouchableOpacity onPress={() => router.replace('/profile')}>
          <Image source={icons.Back} resizeMode="contain" className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="text-center flex-1 mr-8 font-pmedium text-xl">
          Digital Pantry
        </Text>
      </View>
      <KeyboardAwareScrollView className="mt-10 mx-8">
        <View className="flex flex-wrap flex-row -mx-2">
          {pantry.map((item, index) => (
            <View className="w-1/2 px-2 mb-4" key={index}>
              <PantryCard
                key={index}
                ingredient={item.ingredient}
                quantity={item.quantity}
                unit={item.unit}
                imageURL={item.image}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => confirmDelete(item.id)}
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
      </KeyboardAwareScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
          <View className="w-72 p-5 bg-white rounded-lg items-center">
            <Text className="text-lg text-center mb-4">Are you sure you want to delete this ingredient?</Text>
            <View className="flex-row justify-between w-full">
              <TouchableOpacity className="flex-1 bg-gray-500 py-2 rounded-lg mr-2" onPress={() => setModalVisible(false)}>
                <Text className="text-white text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-red-500 py-2 rounded-lg ml-2" onPress={() => {
                handleDelete(selectedIngredientId);
                setModalVisible(false);
              }}>
                <Text className="text-white text-center">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DigitalPantry;

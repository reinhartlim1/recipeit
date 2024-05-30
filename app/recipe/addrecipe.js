import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { icons, images } from "../../constants";
import { router } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useGlobalContext } from "../context/GlobalProvider";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import IngredientInput from "../../components/IngredientInput";
import StepInput from "../../components/StepInput";
import { storage, firestore } from "../firebase/firebaseconfig";

const Recipe = () => {
  const { user } = useGlobalContext();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [steps, setSteps] = useState([""]);
  const [mainIngredient, setMainIngredient] = useState("Ayam");
  const [recipe, setRecipe] = useState("");
  const [description, setDescription] = useState("");
  const [recipeType, setRecipeType] = useState("Vegan");
  const [cookingTime, setCookingTime] = useState("");
  const [difficulty, setDifficulty] = useState("Mudah");
  const [ingredients, setIngredients] = useState([""]);
  const [quantities, setQuantities] = useState([""]);
  const [units, setUnits] = useState([""]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("No image selected");
    }
  };

  const validateFields = (fields) => {
    for (let field of fields) {
      if (!field || field.trim() === "") {
        return false;
      }
    }
    return true;
  };

  const handleNextTab = () => {
    let fieldsToCheck = [];
    if (selectedTab === 1) {
      fieldsToCheck = [
        recipe,
        description,
        cookingTime,
        mainIngredient,
        recipeType,
        difficulty,
      ];
      if (!validateFields(fieldsToCheck) || !image) {
        Alert.alert("Please fill out all fields and upload an image.");
        return;
      }
    } else if (selectedTab === 2) {
      
        if (!validateFields(ingredients) || !validateFields(quantities) || !validateFields(units)){
          Alert.alert("Please fill out all ingredient fields.");
          return;
        }
    } else if (selectedTab === 3) {
      if (steps.some((step) => step.trim() === "")) {
        Alert.alert("Please fill out all steps.");
        return;
      }
    }

    setSelectedTab(selectedTab + 1);
  };

  const uploadData = async () => {
    if (!image) {
      Alert.alert("Please select an image first");
      return;
    }

    setUploading(true);

    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(
      storage,
      `images/${new Date().toISOString()}-${recipe}`
    );
    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const pantryCollectionRef = collection(userDocRef, "recipe");
        const docRef = doc(pantryCollectionRef);

        await setDoc(docRef, {
          recipeId: docRef.id,
          creator: user.uid,
          imageUrl: downloadURL,
          recipetype: "Private",
          ingredients: ingredients,
          unitValue: quantities,
          unit: units,
          steps: steps,
          name: recipe,
          description: description,
          jenisMakanan: recipeType,
          time: cookingTime,
          tingkatKesulitan: difficulty,
          bahanUtama: mainIngredient,
          nutrition: {
            carbs: Math.floor(Math.random() * 120),
            protein: Math.floor(Math.random() * 50),
            vegetarian_protein: Math.floor(Math.random() * 25),
            sugar: Math.floor(Math.random() * 20),
          },
      
          createdAt: serverTimestamp(),
        });
        setIngredients([""]);
        setQuantities([""]);
        setUnits([""]);
        setImage(null);
        setRecipe("");
        setDescription("");
        setRecipeType("Vegan");
        setCookingTime("");
        setDifficulty("Mudah");
        setMainIngredient("Ayam");
        setSteps([""]);
        setModalVisible(true);
      }
    } catch (e) {
      Alert.alert("Error uploading image", e.message);
    } finally {
      setUploading(false);
    }
  };

  const addIngredient = () => {
    if (ingredients.length < 5) {
      setIngredients([...ingredients, ""]);
      setQuantities([...quantities, ""]);
      setUnits([...units, ""]);
    } else {
      Alert.alert("You can only add up to 5 ingredients.");
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
    setQuantities(quantities.filter((_, i) => i !== index));
    setUnits(units.filter((_, i) => i !== index));
  };

  const setIngredientValue = (value, index, field) => {
    if (field === "ingredient") {
      setIngredients(
        ingredients.map((item, i) => (i === index ? value : item))
      );
    } else if (field === "quantity") {
      setQuantities(quantities.map((item, i) => (i === index ? value : item)));
    } else if (field === "unit") {
      setUnits(units.map((item, i) => (i === index ? value : item)));
    }
  };

  const addStep = () => {
    if (steps.length < 5) {
      setSteps([...steps, ""]);
    } else {
      Alert.alert("You can only add up to 5 steps.");
    }
  };

  const removeStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const setStepValue = (value, index) => {
    const updatedSteps = steps.map((step, i) => (i === index ? value : step));
    setSteps(updatedSteps);
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
    router.replace("/home");
  }

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-between mx-8 mt-8">
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Image source={icons.Back} resizeMode="contain" className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="text-center flex-1 mr-8 font-pmedium text-xl">
          Buat Resep
        </Text>
      </View>
      <View className="mt-10 mx-8">
        <View className="h-1 flex flex-row space-x-5">
          <View
            className={`${
              selectedTab === 1 ? "bg-green" : "bg-[#ACACAF]"
            } opacity-50 flex-1 rounded-full`}
          ></View>
          <View
            className={`${
              selectedTab === 2 ? "bg-green" : "bg-[#ACACAF]"
            } opacity-50 flex-1 rounded-full`}
          ></View>
          <View
            className={`${
              selectedTab === 3 ? "bg-green" : "bg-[#ACACAF]"
            } opacity-50 flex-1 rounded-full`}
          ></View>
        </View>
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        className="mt-2 mx-8"
      >
        {selectedTab === 1 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex flex-row items-center justify-between mt-2.5">
              <Text className="font-bold text-lg">Foto Resep</Text>
            </View>
            <View className="h-0.5 mt-1 flex flex-row">
              <View className="bg-black opacity-20 flex-1"></View>
            </View>
            <View className="mt-1">
              <Text className="text-gray-600 font-medium">
                Pilih foto yang terlihat jelas dan menarik, ya.
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

            <View className="mt-6">
              <Text className="font-bold text-base">Judul Resep</Text>
              <View className="mt-1 w-full px-4 h-10 rounded-md border border-gray-100 flex flex-row items-center">
                <TextInput
                  className="mt-1 flex-1"
                  placeholder="Tulis nama resep buatanmu...."
                  value={recipe}
                  onChangeText={setRecipe}
                />
              </View>
            </View>

            <View className="mt-6">
              <Text className="font-bold text-base">Deskripsi Resep</Text>
              <View className="mt-1 w-full px-3 rounded-md border border-gray-100">
                <TextInput
                  className="mt-1"
                  placeholder="Tulis deskripsi resep buatanmu...."
                  multiline
                  editable
                  numberOfLines={6}
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </View>

            <View className="mt-6">
              <Text className="text-center font-bold text-base">
                Kategori Resep
              </Text>
            </View>

            <View className="mt-4">
              <Text className="font-bold text-base">Lama Memasak</Text>
              <View className="flex flex-row justify-between space-x-2 items-center">
                <View className="mt-1 px-4 h-10 grow rounded-md border border-gray-100 flex flex-row items-center">
                  <TextInput
                    editable
                    placeholder="Contoh: 30"
                    keyboardType="numeric"
                    value={cookingTime}
                    onChangeText={setCookingTime}
                  />
                </View>
                <Text className="text-base font-medium text-[#696A6F]">
                  Menit
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <Text className="font-bold text-base">Bahan Utama</Text>
              <View className="h-10 border border-gray-100 rounded-md px-1 justify-center items-stretch mt-1">
                <Picker
                  selectedValue={mainIngredient}
                  mode="dropdown"
                  placeholder="Pilih Kategori Resep"
                  onValueChange={(itemValue) => setMainIngredient(itemValue)}
                >
                  <Picker.Item label="Ayam" value="Ayam" />
                  <Picker.Item label="Daging" value="Daging" />
                  <Picker.Item label="Ikan" value="Ikan" />
                  <Picker.Item label="Sayur" value="Sayur" />
                  <Picker.Item label="Buah" value="Buah" />
                  <Picker.Item label="Makanan Laut" value="Makanan Laut" />
                  <Picker.Item label="Karbohidrat" value="Karbohidrat" />
                  <Picker.Item label="Kacang" value="Kacang" />
                </Picker>
              </View>
            </View>

            <View className="mt-4">
              <Text className="font-bold text-base">Tipe Makanan</Text>
              <View className="h-10 border border-gray-100 rounded-md px-1 justify-center items-stretch mt-1">
                <Picker
                  selectedValue={recipeType}
                  mode="dropdown"
                  placeholder="Pilih Kategori Resep"
                  onValueChange={(itemValue) => setRecipeType(itemValue)}
                >
                  <Picker.Item label="Vegan" value="Vegan" />
                  <Picker.Item label="Non Vegan" value="Non Vegan" />
                </Picker>
              </View>
            </View>

            <View className="mt-4">
              <Text className="font-bold text-base">Tingkat Kesulitan</Text>
              <View className="h-10 border border-gray-100 rounded-md px-1 justify-center items-stretch mt-1">
                <Picker
                  selectedValue={difficulty}
                  mode="dropdown"
                  placeholder="Pilih Kategori Resep"
                  onValueChange={(itemValue) => setDifficulty(itemValue)}
                >
                  <Picker.Item label="Mudah" value="Mudah" />
                  <Picker.Item label="Sedang" value="Sedang" />
                  <Picker.Item label="Sulit" value="Sulit" />
                </Picker>
              </View>
            </View>

            <View className="mt-5">
              <CustomButton
                text="Selanjutnya"
                backgroundColor="bg-orange"
                textColor="text-white"
                handlePress={handleNextTab}
              />
            </View>

            <View className="mt-40"></View>
          </ScrollView>
        )}

        {selectedTab === 2 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex flex-row items-center justify-between mt-2.5">
              <Text className="font-bold text-lg">Bahan</Text>
            </View>
            <View className="mt-2">
              {ingredients.map((ingredient, index) => (
                <View className="mt-2 flex flex-row items-center" key={index}>
                  <IngredientInput
                    index={index}
                    quantity={ingredient.quantity}
                    unit={ingredient.unit}
                    ingredient={ingredient.ingredient}
                    setQuantity={(value) =>
                      setIngredientValue(value, index, "quantity")
                    }
                    setUnit={(value) =>
                      setIngredientValue(value, index, "unit")
                    }
                    setIngredient={(value) =>
                      setIngredientValue(value, index, "ingredient")
                    }
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity
              onPress={addIngredient}
              className="bg-green-500 p-2 rounded-md mt-4"
            >
              <Text className="text-center text-white font-pmedium">
                Tambah Bahan
              </Text>
            </TouchableOpacity>
            <View className="mt-4">
              <CustomButton
                text="Selanjutnya"
                backgroundColor="bg-orange"
                textColor="text-white"
                handlePress={handleNextTab}
              />
            </View>

            <View className="mt-40"></View>
          </ScrollView>
        )}
        {selectedTab === 3 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex flex-row items-center justify-between mt-2.5">
              <Text className="font-bold text-lg">Langkah-langkah</Text>
            </View>
            <View className="mt-2">
              {steps.map((step, index) => (
                <View className="mt-2" key={index}>
                  <StepInput
                    index={index}
                    step={step.step}
                    setStep={(value) => setStepValue(value, index)}
                    removeStep={removeStep}
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity
              onPress={addStep}
              className="bg-green-500 p-2 rounded-md mt-4"
            >
              <Text className="text-center text-white font-pmedium">
                Tambah Langkah
              </Text>
            </TouchableOpacity>
            <View className="mt-4">
              <CustomButton
                text="Selesai"
                backgroundColor="bg-orange"
                textColor="text-white"
                handlePress={uploadData}
              />
            </View>

            <View className="mt-40"></View>
          </ScrollView>
        )}
      </KeyboardAwareScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
          <View className="w-4/5 bg-white rounded-lg p-5 items-center">
            <Text className="text-lg font-bold">Suceed</Text>
            <Image 
              source={images.Succeed} 
              className="w-32 h-48"
              resizeMode="contain"
            />
            <Text className="mt-5 font-bold text-xs">The recipe has been saved successfully</Text>
            <View className="w-full px-4 mt-8">
            <CustomButton 
              text="Ok"
              backgroundColor="bg-orange"
              textColor="text-white"
              handlePress={handleModal}
            />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Recipe;

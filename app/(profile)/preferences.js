import { View, Text, ScrollView, Alert, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { firestore } from "../firebase/firebaseconfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useGlobalContext } from "../context/GlobalProvider";


const Preferences = () => {
  const { user } = useGlobalContext();
  
  const [preferences, setPreferences] = useState({
    alergi: "",
    tujuanKesehatan: "",
    riwayatPenyakit: "",
    jenisMakananKesukaan: "",
    makananDisukai: "",
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPreferences({
            alergi: data.alergi || "",
            tujuanKesehatan: data.tujuanKesehatan || "",
            riwayatPenyakit: data.riwayatPenyakit || "",
            jenisMakananKesukaan: data.jenisMakananKesukaan || "",
            makananDisukai: data.makananDisukai || "",
          });
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error fetching document: ", e);
      }
    };

    fetchPreferences();
  }, [user.uid]);

  const handleInputChange = (field, value) => {
    setPreferences((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    console.log(preferences);
  };

  const savePreferences = async () => {
    try {
      await setDoc(
        doc(firestore, "users", user.uid),
        preferences,
        { merge: true }
      );
      Alert.alert("Success", "Preferences saved successfully");
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Error", "Failed to save preferences");
    }
  };

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-between mx-8 mt-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.Back} resizeMode="contain" className="w-8 h-8" />
        </TouchableOpacity>
        <Text className="text-center flex-1 mr-8 font-pmedium text-xl">
          Personalisasi
        </Text>
      </View>
      <ScrollView>
        <View className="mx-8">
          <FormField title="Alergi diderita" value={preferences.alergi} handleChangeText={(text) => handleInputChange("alergi", text)}  />
          <FormField title="Tujuan Kesehatan" value={preferences.tujuanKesehatan} handleChangeText={(text) => handleInputChange("tujuanKesehatan", text)} />
          <FormField title="Riwayat Penyakit" value={preferences.riwayatPenyakit} handleChangeText={(text) => handleInputChange("riwayatPenyakit", text)} />
          <FormField title="Jenis Makanan Kesukaan" value={preferences.jenisMakananKesukaan} handleChangeText={(text) => handleInputChange("jenisMakananKesukaan", text)} />
          <FormField title="Makanan yang Disukai" value={preferences.makananDisukai} handleChangeText={(text) => handleInputChange("makananDisukai", text)}/>
        </View>
      </ScrollView>
      <View className="m-8">
        <CustomButton
          text="Simpan Preferensi"
          backgroundColor="bg-green"
          textColor="text-white"
          handlePress={savePreferences}
        />
      </View>
    </SafeAreaView>
  );
};

export default Preferences;

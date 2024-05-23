import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { images, icons } from "../constants";
import { auth } from "../app/firebase/firebaseconfig";
import { useGlobalContext } from "../app/context/GlobalProvider";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import { useState } from "react";

const data = [
  {
    id: 1,
    name: "Profile",
    icon: icons.User,
    route: "/profile",
  },
  {
    id: 2,
    name: "Preferensi",
    icon: icons.Preference,
    route: "/preferences",
  },
  {
    id: 3,
    name: "Digital Pantry",
    icon: icons.DigitalPantry,
    route: "/digital-pantry",
  },
  {
    id: 4,
    name: "Pengaturan",
    icon: icons.Settings,
    route: "/profile",
  },
  {
    id: 5,
    name: "Log Out",
    icon: icons.LogOut,
    route: "/sign-in", // This will be handled separately
  },
];

const ProfileNavigation = () => {
  const { isLogged, setIsLogged, user, setUser } = useGlobalContext();

  const [modalVisible, setModalVisible] = useState(false);

  const handleNavigation = (route) => {
    if (route === "/sign-in") {
      setModalVisible(true);
    } else {
      router.push(route);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsLogged(false);
        setUser(null);
        console.log("Sign out success");
        console.log(isLogged);
        console.log(user);
        router.replace("/sign-in");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleNavigation(item.route)}
        >
          <View className="flex flex-row items-center justify-between py-4 border-b-[0.75px] border-b-[#D9D9D9]">
            <View className="flex flex-row items-center">
              <Image source={item.icon} className="w-[32px] h-[32px]" />
              <Text className="font-pmedium text-[14px] ml-4">{item.name}</Text>
            </View>
            <Image source={icons.RightChevron} className="w-[20px] h-[20px]" />
          </View>
        </TouchableOpacity>
      ))}
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
            <Text className="text-lg font-bold">Are you sure you want logout?</Text>
            <Image 
              source={images.LogOut} 
              className="w-28 h-48 mt-7"
              resizeMode="contain"
            />
            <View className="flex-row justify-between w-full mt-7">
              <TouchableOpacity
                className="flex-1 bg-red px-5 rounded-md mx-1 h-8 justify-center items-center"
                onPress={handleSignOut}
              >
                <Text className="text-white text-sm text-center font-sans">Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-green px-5 rounded-md mx-1 h-8 justify-center items-center"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-sm text-center font-sans">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileNavigation;

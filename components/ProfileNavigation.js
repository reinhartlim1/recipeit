import { View, Text, TouchableOpacity, Image } from "react-native";
import { images, icons } from "../constants";
import { auth } from "../app/firebase/firebaseconfig";
import { useGlobalContext } from "../app/context/GlobalProvider";
import { signOut } from "firebase/auth";
import { router } from "expo-router";

const data = [
  {
    id: 1,
    name: "Profile",
    icon: icons.User,
  },
  {
    id: 2,
    name: "Preferensi",
    icon: icons.Preference,
  },
  {
    id: 3,
    name: "Digital Pantry",
    icon: icons.DigitalPantry,
  },
  {
    id: 4,
    name: "Pengaturan",
    icon: icons.Settings,
  },
  {
    id: 5,
    name: "Log Out",
    icon: icons.LogOut,
  },
];

const ProfileNavigation = () => {
  const { isLogged, setIsLogged, user, setUser } = useGlobalContext();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsLogged(false);
        setUser(null);
        console.log("Sign out success");
        console.log(isLogged);
        console.log(user);
        router.replace("/sign-in")
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View>
      {data.map((item) => (
        <TouchableOpacity key={item.id} onPress={item.id == 5 ? handleSignOut : ""}>
          <View className="flex flex-row items-center justify-between py-4 border-b-[0.75px] border-b-[#D9D9D9]">
            <View className="flex flex-row items-center">
              <Image source={item.icon} className="w-[32px] h-[32px]" />
              <Text className="font-pmedium text-[14px] ml-4">{item.name}</Text>
            </View>
            <Image source={icons.RightChevron} className="w-[20px] h-[20px]" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileNavigation;

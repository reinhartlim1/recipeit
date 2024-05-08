import { View, Text, Image, TouchableOpacity } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text className={`${focused ? "" : "font-pmedium"} text-xs`}>{name}</Text>
    </View>
  );
};

const CustomTabButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="justify-center items-center -top-10"
  >
    <View className="rounded-full h-[60px] w-[60px] bg-green">{children}</View>
  </TouchableOpacity>
);

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#06A43C",
          tabBarInactiveTintColor: "#A6A6A6",
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 73,
            borderTopColor: "#FFFFFF",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.Home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="mealplan"
          options={{
            title: "MealPlan",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.MealPlan}
                color={color}
                name="MealPlan"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="recipe"
          options={{
            title: "Recipe",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image source={icons.Camera} resizeMode="contain" className="h-5 w-5"/>
            ),
            tabBarButton: (props) => (
                <CustomTabButton {...props} />
            )
          }}
        />

        <Tabs.Screen
          name="resepku"
          options={{
            title: "ResepKu",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.Favorite}
                color={color}
                name="ResepKu"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.Favorite}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

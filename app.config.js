import "dotenv/config";
export default {
  expo: {
    name: "RecipeIt",
    scheme: "recipeit",
    slug: "recipeit",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/recipeit_splash.png",
      resizeMode: "contain",
      backgroundColor: "#ED7D31",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/recipeit_icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.reinhartlim.recipeit",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "deffb747-3ef1-425a-8aea-c793c4d312b8",
      },
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
      openaiApiKey: process.env.OPENAI_API_KEY,
      geminiApiKey: process.env.GEMINI_API_KEY,
      recipeImageUrl: process.env.RECIPE_IMAGE_URL,
      profileImageUrl: process.env.PROFILE_IMAGE_URL,
    },
    plugins: ["expo-router", "expo-image-picker", "expo-camera"],
  },
};

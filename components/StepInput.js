import { View, TextInput, TouchableOpacity, Text } from "react-native";

const StepInput = ({ step, setStep, index, removeStep }) => {
  return (
    <View className="mb-4">
      <Text className="text-sm">Langkah {index + 1}</Text>
      <View className="flex flex-row items-center space-x-2 mt-2">
        <TextInput
          className="flex-1 border border-gray-300 rounded-md px-2"
          placeholder={`Langkah ${index + 1}`}
          value={step}
          onChangeText={(text) => setStep(text)}
          multiline
          numberOfLines={4}
          maxLength={250}
        />
        <TouchableOpacity onPress={() => removeStep(index)}>
          <Text className="text-red-500 text-center">Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepInput;

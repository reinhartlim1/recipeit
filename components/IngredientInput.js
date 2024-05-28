import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const IngredientInput = ({
  quantity,
  setQuantity,
  unit,
  setUnit,
  ingredient,
  setIngredient,
}) => {
  return (
    <View className="flex-row items-center space-x-1">
      <View className="flex-1">
        <Text className="text-center font-bold text-sm">Jumlah</Text>
        <TextInput
          className="h-10 border border-gray-300 rounded-md px-1 mt-1"
          placeholder="Contoh: 1"
          value={quantity}
          onChangeText={setQuantity}
        />
      </View>
      <View className="flex-1">
        <Text className="text-center font-bold text-sm">Satuan</Text>
        <View className="h-10 border border-gray-300 rounded-md px-1 justify-center items-stretch mt-1">
          <Picker
            selectedValue={unit}
            mode="dropdown"
            placeholder="Pilih Satuan"
            onValueChange={(itemValue) => setUnit(itemValue)}
          >
            <Picker.Item label="Mg" value="Mg" style={{ fontSize: 14 }} />
            <Picker.Item label="Gr" value="Gr" style={{ fontSize: 14 }} />
            <Picker.Item label="Kg" value="Kg" style={{ fontSize: 14 }} />
            <Picker.Item label="L" value="L" style={{ fontSize: 14 }} />
            <Picker.Item label="Butir" value="Butir" style={{ fontSize: 14 }} />
            <Picker.Item label="Sdt" value="Sdt" style={{ fontSize: 14 }} />
            <Picker.Item label="Sdm" value="Sdm" style={{ fontSize: 14 }} />
            <Picker.Item label="Bks" value="Bks" style={{ fontSize: 14 }} />
            <Picker.Item label="Btg" value="Btg" style={{ fontSize: 14 }} />
          </Picker>
        </View>
      </View>
      <View className="flex-1">
        <Text className="text-center font-bold text-sm">Bahan</Text>
        <TextInput
          className="h-10 border border-gray-300 rounded-md px-1 mt-1"
          placeholder="Contoh: Ayam"
          value={ingredient}
          onChangeText={setIngredient}
        />
      </View>
    </View>
  );
};

export default IngredientInput;

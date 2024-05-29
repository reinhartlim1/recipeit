import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const QuantityModal = ({
  visible,
  onClose,
  quantity,
  setQuantity,
  saveQuantity,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="w-4/5 bg-white rounded-xl p-5 items-center">
          <Text className="text-2xl font-psemibold mb-5">Ubah Porsi</Text>
          <View className="flex-row items-center mb-5">
            <Text className="text-2xl mr-5 font-pregular">Personal</Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                className="border border-orange rounded-xl h-14 w-14 items-center justify-center"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text className="text-2xl px-3 text-orange">-</Text>
              </TouchableOpacity>
              <Text className="text-lg mx-5">{quantity}</Text>
              <TouchableOpacity
                className="border border-orange rounded-xl h-14 w-14 items-center justify-center"
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text className="text-2xl px-3 text-orange">+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            className="bg-orange px-5 py-2 rounded-lg h-11 w-52 items-center justify-center"
            onPress={saveQuantity}
          >
            <Text className="text-white text-base font-pmedium">Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default QuantityModal;

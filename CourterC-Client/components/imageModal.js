
import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import tw from "twrnc";

// const windowHeight = Dimensions.get("window").height;

export default function ImageModal(props) {
    const closeModal = (bool ,data) => {
        props.changeModalVisible(bool)
        props.setData(data)
    }
return (
    <TouchableOpacity disable={true} style={tw`flex-1 items-center justify-center`}>
        <View style={tw`h-[150px] pt-10 border rounded-lg bg-white w-40`}>
    <Text>test</Text>
    <Button
            title="cancel"
            style={tw`mx-1`}
            onPress={() => closeModal(false, 'Cancel')}
            />
        </View>
    </TouchableOpacity>
)

}
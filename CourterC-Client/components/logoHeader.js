import { View, Text, Image} from "react-native";
export default function logo(){
    return (
        <Image
          style={{ width: 88, height: 65.5 }}
          source={require("../assets/CourterC_Transparent.png")}
        />
      );
}
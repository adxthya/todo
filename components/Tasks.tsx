import { StyleSheet, TextStyle } from "react-native";
import { Text, View } from "./Themed";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Tasks({ task }: { task: string }) {
  const [checked, setChecked] = useState(false);
  const [line, setLine] = useState<"none" | "line-through">("none");
  function onCheck() {
    setChecked(!checked);
    checked ? setLine("none") : setLine("line-through");
  }
  return (
    <View style={styles.task}>
      <BouncyCheckbox
        style={styles.checkbox}
        fillColor="red"
        size={18}
        isChecked={checked}
        onPress={() => onCheck()}
      />
      <Text
        onPress={() => onCheck()}
        style={[styles.getStartedText, { textDecorationLine: line }]}
      >
        {task}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 5,
    width: 25,
  },
  getStartedText: {
    fontSize: 20,
  },
});

import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text, View } from "./Themed";
import Tasks from "./Tasks";

export default function EditScreenInfo({ path }: { path: string }) {
  const [text, onChangeText] = useState("");
  const [opacity, setOpacity] = useState(1);
  const [tasks, setTasks] = useState<Array<string>>([]);
  const [retrievedTasks, setRetrievedTasks] = useState<Array<string>>([]);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          style={styles.input}
          onChangeText={onChangeText}
        />
        <Pressable
          onPress={async () => {
            setOpacity(0.5);
            if (text != "") {
              setTasks([...tasks, text]);
              try {
                await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
              } catch (e) {
                console.log(e);
              }
              try {
                const retrievedItems = await AsyncStorage.getItem("tasks");
                const parsedItems = await JSON.parse(retrievedItems!);

                if (parsedItems != null) setRetrievedTasks(parsedItems);
              } catch (e) {
                console.log(e);
              }
            }
            setOpacity(1);
            onChangeText("");
          }}
          style={[styles.button, { opacity: opacity }]}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>
      </View>
      <View>
        {retrievedTasks.map((task, index) => (
          <Tasks
            task={task}
            key={index}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 25,
  },
  inputContainer: {
    display: "flex",
  },
  input: {
    marginVertical: 10,
    height: 60,
    borderWidth: 1,
    padding: 10,
    borderColor: "red",
    borderRadius: 5,
    color: "#fff",
    fontSize: 20,
  },
  button: {
    borderWidth: 1,
    padding: 10,
    borderColor: "red",
    alignSelf: "flex-end",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 15,
  },
});

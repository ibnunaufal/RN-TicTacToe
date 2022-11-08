import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  const [values, setValues] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [giliran, setGiliran] = useState("X");

  function button(x, y, value) {
    let temp = values;
    console.log(temp);
    temp[x][y] = value;
    console.log(temp);
    setValues(temp);
    let gil = giliran === "X" ? "O" : "X";
    setGiliran(gil);
    checkGame()
  }

  function checkGame() {
    for (let x = 0; x < 3; x++) {
      if ((values[x][0] == "X" && values[x][1] == "X" && values[x][2] == "X")||(values[x][0] == "O" && values[x][1] == "O" && values[x][2] == "O")) {
        console.log(`${giliran} win the game`);
        win()
        return
      }
    }
    for (let x = 0; x < 3; x++) {
      if ((values[0][x] == "X" && values[1][x] == "X" && values[2][x] == "X")||(values[0][x] == "O" && values[1][x] == "O" && values[2][x] == "O")) {
        console.log(`${giliran} win the game`);
        win()
        return
      }
    }
    if ((values[0][0] == "X" && values[1][1] == "X" && values[2][2] == "X")||(values[0][0] == "O" && values[1][1] == "O" && values[2][2] == "O")) {
      console.log(`${giliran} win the game`);
      win()
      return
    }
    if ((values[0][2] == "X" && values[1][1] == "X" && values[2][0] == "X")||(values[0][2] == "O" && values[1][1] == "O" && values[2][0] == "O")) {
      console.log(`${giliran} win the game`);
      win()
      return
    }
    
    let temp = values
    let draw = [false,false,false]    
    for (let x = 0; x < 3; x++){
      if(!temp[x].includes("")){
        draw[x] = true
      }
    }
    if(!draw.includes(false)){
      console.log("draw")
      endDraw()
    }
  }

  function win(){        
    Alert.alert("Game end!",`${giliran} win the game`)
    reset()
  }

  function endDraw(){
    Alert.alert("Game end!","Game ended draw")
    reset()
  }

  function reset() {
    let temp = values;
    console.log(JSON.stringify(temp));
    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        temp[x][y] = "";
      }
    }
    setValues(temp);
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
    console.log(JSON.stringify(values));
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!isLoading && (
        <View style={{flex:1}}>
          <View style={styles.header}>
            <Text>Giliran:</Text>
            <Text style={styles.giliran}>{giliran}</Text>
          </View>
          <View style={styles.body}>
            <View style={[styles.row, styles.first]}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.left,
                  pressed && styles.pressed,
                ]}
                onPress={() => button(0, 0, giliran)}
              >
                <Text style={[styles.textButton, styles.topLeft]}>
                  {values[0][0]}
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.center,
                  pressed && styles.pressed,
                ]}
                onPress={() => button(0, 1, giliran)}
              >
                <Text style={[styles.textButton, styles.topCenter]}>
                  {values[0][1]}
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.right,
                  pressed && styles.pressed,
                ]}
                onPress={() => button(0, 2, giliran)}
              >
                <Text style={[styles.textButton, styles.topRight]}>
                  {values[0][2]}
                </Text>
              </Pressable>
            </View>
            <View style={[styles.row, styles.second]}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.left,
                  pressed && styles.pressed,
                ]}
                onPress={() => button(1, 0, giliran)}
              >
                <Text style={[styles.textButton, styles.centerLeft]}>
                  {values[1][0]}
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.center,
                  pressed && styles.pressed,
                ]}
                onPress={() => button(1, 1, giliran)}
              >
                <Text style={[styles.textButton, styles.centerCenter]}>
                  {values[1][1]}
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.right,
                  pressed && styles.pressed,
                ]}
                onPress={() => button(1, 2, giliran)}
              >
                <Text style={[styles.textButton, styles.centerRight]}>
                  {values[1][2]}
                </Text>
              </Pressable>
            </View>
            <View style={[styles.row, styles.third]}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.left,
                  pressed && styles.pressed,
                ]}
                onPress={() => button(2, 0, giliran)}
              >
                <Text style={[styles.textButton, styles.bottomLeft]}>
                  {values[2][0]}
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.center,
                  pressed && styles.pressed,
                ]}
                onPress={() => button(2, 1, giliran)}
              >
                <Text style={[styles.textButton, styles.bottomCenter]}>
                  {values[2][1]}
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.right,
                  pressed && styles.pressed,
                ]}
                onPress={() => button(2, 2, giliran)}
              >
                <Text style={[styles.textButton, styles.bottomRight]}>
                  {values[2][2]}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.footer}>
            <Pressable onPress={() => reset()}>
              <Text>Reset</Text>
            </Pressable>
          </View>
        </View>
      )}
      {isLoading && (
        <ActivityIndicator
          size={"large"}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,    
    alignItems: "center",
    justifyContent: "center"
  },
  giliran: {
    fontSize: 20,
    fontWeight: "bold"
  },
  body: {
    flex: 5,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: Dimensions.get("window").height / 9,
    width: Dimensions.get("window").width / 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  second: {
    borderTopColor: "black",
    borderTopWidth: 5,
    borderBottomColor: "black",
    borderBottomWidth: 5,
  },
  left: {
    borderRightColor: "black",
    borderRightWidth: 5,
  },
  right: {
    borderLeftColor: "black",
    borderLeftWidth: 5,
  },
  footer: {
    flex: 1,
  },
  pressed: {
    opacity: 0.5,
  },
});

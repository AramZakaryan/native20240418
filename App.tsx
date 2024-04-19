import {StatusBar} from 'expo-status-bar';
import {
    Animated,
    Button,
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {useState} from "react";
import {Checkbox} from "expo-checkbox";
import add = Animated.add;
import {EditableText} from "./EditableText/EditableText";

export default function App() {
    const [value, setValue] = useState("hurrah ")
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: "html", isDone: true},
        {id: 2, title: "react", isDone: false},
        {id: 3, title: "css", isDone: true},
        {id: 4, title: "JS", isDone: true},
        {id: 5, title: "native", isDone: false},
    ])

    const addTask = (title: string) => {
        if (value.trim() === "") return
        const id = 1 + tasks.reduce((acc, t) =>
                acc < t.id ? acc = t.id : acc
            , 0)
        setTasks([{id, title, isDone: false}, ...tasks])
        setValue("")
    }

    const delTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const changeTaskStatus = (taskId: number, newIsDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }

    const changeTaskTitle = (taskId:number, newTitle: string) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, title: newTitle} : t))
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={[styles.blockWithInput]}>
                    <TextInput style={[styles.input, globalStyles.border, {backgroundColor: "white"}]} value={value}
                               onChangeText={setValue}/>
                    <View style={[styles.addTaskBtn]}>
                        <Button title={"add task"}
                                onPress={() => addTask(value)}
                                color={"#fffffe"}

                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>


            <View style={{width: "60%"}}>
                {tasks.map(t => {
                    return (<View key={t.id} style={[styles.taskBox]}>
                        <Checkbox value={t.isDone} onValueChange={v => changeTaskStatus(t.id, v)}/>
                        <EditableText task={t} onBlurCB={changeTaskTitle}/>
                        <View style={[styles.delTaskBtn]}>
                            <Button title={"X"} onPress={() => delTask(t.id)}
                                    color={"#b8c1ec"}
                            />
                        </View>
                    </View>)
                })}
            </View>

            <StatusBar style="auto"/>
        </View>
    );
}

/** https://www.happyhues.co/palettes/12) */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#232946',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: "100%",
        backgroundColor: "#fffffe",
        fontSize: 22,
        padding: 5,
        // marginBottom: 10,
        borderRadius: 8
    },
    taskBox: {
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 2,
        alignItems: 'center',

        justifyContent: "space-between",
        backgroundColor: "#b8c1ec",
        // fontSize: 28
    },
    blockWithInput: {
        width: "75%",
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addTaskBtn: {
        backgroundColor: "#121629",
        width: "60%",
        borderRadius: 10,
        marginTop: 15,
        borderColor: "#b8c1ec"
    },
    delTaskBtn: {
        backgroundColor: "#121629",
        borderRadius: 10,
    },
    // taskTextInput: {
    //     backgroundColor: "#fffffe",
    //     padding: 5,
    //     borderRadius: 5,
    //
    // }
});

const globalStyles = StyleSheet.create({
    border: {
        borderStyle: "solid",
        borderColor: "green",
        borderWidth: 2
    }
})

////////// TYPES

export type Task = {
    id: number,
    title: string,
    isDone: boolean
}
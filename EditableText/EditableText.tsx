import {StyleProp, StyleSheet, Text, TextInput} from "react-native";
import {useState} from "react";
import {Task} from "../App";


type Props = {
    task: Task,
    onBlurCB: (taskId:number, newTitle: string) => void,
}

export const EditableText = ({task:{id, title}, onBlurCB}: Props) => {

    const [EditMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)


    return (<>
            {
                EditMode ?
                    <TextInput value={value}
                               style={[styles.taskTextInput]}
                               onChangeText={(text) => setValue(text)}
                               onBlur={() => {
                                   onBlurCB(value)
                                   setEditMode(false)
                               }
                               }
                               autoFocus={true}
                    /> :
                    <Text style={{marginLeft: 5}} onPress={() => setEditMode(true)}>{title}</Text>
            }
        </>
    )
}

const styles = StyleSheet.create({

    taskTextInput: {
        backgroundColor: "#fffffe",
        padding: 5,
        borderRadius: 5,

    }
});
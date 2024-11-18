import React, {useState, useEffect} from "react";
import { 
    StyleSheet,
    Text,
    View 
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";


export default function CheckBox(props: { id: string, label: string, color: string, isChecked: (id: string, isChecked: boolean) => void, reset: boolean }) {
    const [checked, setChecked] = useState(false);

    return (
    <BouncyCheckbox 
        style={styles.checkBox}
        key={props.id}
        text={props.label}
        fillColor={props.color}
        isChecked={checked}
        onPress={(isChecked: boolean) => props.isChecked(props.id, isChecked)} />
  );
}

const styles = StyleSheet.create({
    checkBox: {
        margin: 8,
    }
});
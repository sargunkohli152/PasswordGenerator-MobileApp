import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
type proptypes = {
    colorfill: string,
    text: string
    state :  boolean,
    stateSetter: (state: boolean) => void,
    passwordSetter: (password: string) => void,
    passwordBoolSetter: (bool: boolean) => void
}

export default function Options(props: proptypes ) {
    const {text, colorfill, state, stateSetter, passwordSetter, passwordBoolSetter} = props;

  return (
    <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include {text}</Text>
        <BouncyCheckbox
        disableBuiltInState
        isChecked={state}
        onPress={() => {
        stateSetter(!state);
        passwordSetter('');
        passwordBoolSetter(false);
        }}
        fillColor={colorfill}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    heading: {
        fontSize: 15,
    },
})
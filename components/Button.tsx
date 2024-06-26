import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { forwardRef } from 'react'
import Colors from '@/src/constants/Colors'
import { ForwardedRef } from 'react'

type ButtonProps = {
    text:string;
} & React.ComponentPropsWithoutRef <typeof Pressable>

const Button = forwardRef <View | null , ButtonProps> (
    ({text, ...pressableProps}, ref) => {
        return (
            <Pressable ref={ref} {...pressableProps} style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        )
    }
)

export default Button

const styles = StyleSheet.create({
    container : {
        backgroundColor: Colors.light.tint,
        padding:15,
        alignItems:"center",
        borderRadius:100,
        marginVertical:10
    },
    text: {
        color:"dark",
        fontWeight:"bold"
    }
})
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Button from '@/components/Button'
import Colors from '@/src/constants/Colors'
import { Link, Stack } from 'expo-router'
import { supabase } from '@/src/lib/supabase'

const SignInScreen = () => {
    
    const [email,setEmail] = useState(``);
    const [password,setPassword] = useState(``);
    const [loading,setLoading] = useState(false);

    async function signInUser() {
      setLoading(true)
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
    
        if (error) {
          Alert.alert(error.message);
        } else {
          Alert.alert('Success', 'User signed in successfully!');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to sign in. Please try again later.');
      }
      setEmail("")
      setPassword("")
      setLoading(false)
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder='Email...'
        style={styles.input}
      />

        <Text style={styles.label}>Password</Text>
        <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder='Password...'
        style={styles.input}
        secureTextEntry
        />

        <Button disabled={loading} onPress={signInUser} style={styles.btn} text={loading? "Signing in" : "Sign in"} />
        <Link href="/sign-up">
        Create an Account
        </Link>

    </View>

  )
}

export default SignInScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        padding:10
    },
    input:{
        padding:10,
        backgroundColor:"grey",
        marginTop:5,
        marginBottom:5,
        borderRadius:5
    },
    label: {
        color:"grey"
    },
    btn: {
        alignSelf:"center",
        fontWeight:"bold",
        color:Colors.light.tint,
        marginVertical:10
    }
})
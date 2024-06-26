import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Button from '@/components/Button'

const index = () => {
  return (
    <View style={{flex:1,justifyContent:"center",padding:10}}>
        <Link href={`/(tabs)`} asChild>
            <Button text='User' />
        </Link>
        <Link href={`/(admin)`} asChild>
            <Button text='Admin' />
        </Link>
        <Link href={`/sign-in`} asChild>
            <Button text='Sign in' />
        </Link>
    </View>
  )
}

export default index;

const styles = StyleSheet.create({})
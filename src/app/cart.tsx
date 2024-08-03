import { View, Text, StatusBar, Platform, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useCart } from '@/providers/CartProvider' 
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'

const cart = () => {
  
  const {items, total, checkout} = useCart()

  return (
    <View style={styles.container}>
      <FlatList 
      data={items} 
      renderItem={({item}) => <CartListItem cartItem={item} />} 
      contentContainerStyle={{padding:10,gap:10}}
       />
       <Text style={styles.totalPrice}>${total}</Text>
       <Button onPress={checkout} text='Go to checkout' />

      <StatusBar />
    </View>
  )
}

export default cart

const styles = StyleSheet.create({
    container: {
      padding:10
    },
    totalPrice: {
      marginTop:20,
      fontSize:20,
      fontWeight:"bold"
    }
})


import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Image } from 'react-native'
import { defaultShoeImage } from '@/components/ProductListItem' 
import { useState } from 'react'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider' 
import { ShoeSizes } from '@/Types' 
import { useProduct } from '@/src/api/products'

const sizes = [ 42, 44, 46, 48]

const ProductDetailsScreen = () => {

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === `string` ? idString : idString[0])
  const { data: product, error, isLoading } = useProduct(id);  

  const [selectedSize,setSelectedSize] = useState<ShoeSizes> ("42");
  const {addItem} = useCart();

  const router = useRouter();

  const addToCart = () => {
    if (product) {
        addItem(product, selectedSize);
        router.push(`/cart`);
    }
};


  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch products</Text>
  }

  return (
    <View style={styles.container}>  
      <Stack.Screen options={{title: product?.name}} />
      <Image style={styles.image} source={{uri: product.image || defaultShoeImage}} />
      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable onPress={() => setSelectedSize(size)} style={[styles.size, {backgroundColor: selectedSize === size? `gainsboro` : `white`}]}>
          <Text style={[styles.sizeText, {color: selectedSize === size ? 'blue' : `grey`}]}  key={size}>{size}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text='Add to cart' />
    </View>
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    flex:1,
    padding:10
  },
  image: {
    width:`100%`,
    aspectRatio:1,
    resizeMode:"contain"
  },
  price : {
    fontSize:20,
    fontWeight:"bold",
    marginTop:`auto`
  },
  size: {
    backgroundColor:"gainsboro",
    width:50,
    borderRadius:25,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  sizes : {
    marginVertical:5,
    flexDirection:"row",
    justifyContent: "space-around"
  },
  sizeText : {
    fontWeight:"600",
    fontSize:20
  }
})
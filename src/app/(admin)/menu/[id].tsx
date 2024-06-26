import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { Image } from 'react-native'
import { defaultShoeImage } from '@/components/ProductListItem' 
import { useState } from 'react'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider' 
import { ShoeSizes } from '@/Types' 
import { FontAwesome } from '@expo/vector-icons'

const sizes = [ 42, 44, 46, 48]

const ProductDetailsScreen = () => {

  const { id } = useLocalSearchParams()
  const product = products.find ((p) => p.id.toString() === id)
  const [selectedSize,setSelectedSize] = useState<ShoeSizes> ("42");
  const {addItem} = useCart();

  const router = useRouter();

  const addToCart = () => {
    if (product) {
        addItem(product, selectedSize);
        router.push(`/cart`);
    }
};


  if (!product) {
    return <Text>Product not available</Text>
  }

  return (
    <View style={styles.container}>  
     <Stack.Screen options={{title: `Menu`, headerRight: () => (
                  <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <FontAwesome
                          name="pencil"
                          size={25}
                          color="blue"
                          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                      )}
                    </Pressable>
                  </Link>
                ),}}/>
      <Stack.Screen options={{title: product?.name}} />
      <Image style={styles.image} source={{uri: product.image || defaultShoeImage}} />
      <Text>Select size</Text>
      <Text>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      
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
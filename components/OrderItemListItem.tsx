import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OrderItem } from '@Types'
import { defaultShoeImage } from './ProductListItem'



type OrderListItemPromps = {
    item:OrderItem 
}

const OrderItemListItem = ({item} : OrderListItemPromps ) => {
    console.log(item.id)
  return (
    <View style={styles.container}>
      <Image
      source={{uri: item.products.image || defaultShoeImage}}
      style={styles.image}
      resizeMode='contain'
      />

      <View style={{flex:1}}>
        <Text style={styles.title}>{item.products.name}</Text>

        <View style={styles.subtitle}>
            <Text style={styles.price}>${item.products.price.toFixed(2)}</Text>
            <Text style={styles.size}>{item.size}</Text>
        </View>
      </View>

      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{item.quantity}</Text>
        
      </View>
    </View>
  )
}

export default OrderItemListItem

const styles = StyleSheet.create({
    container:{
        backgroundColor: `white`,
        borderRadius:10,
        padding:5,
        flex:1,
        flexDirection:"row",
        alignItems:"center"
    },
    image: {
        width:75,
        aspectRatio:1,
        alignSelf:"center",
        marginRight:10
    },
    title : {
        fontWeight:"500",
        fontSize:16,
        marginBottom:5
    },
    subtitle: {
        flexDirection:"row",
        gap:5
    },
    price: {
        color:"blue",
        fontWeight:"bold"
    },
    size : {
        color:"grey",
        fontWeight:"600"
    },
    quantitySelector: {
        flexDirection:"row",
        gap:10,
        alignItems:"center",
        marginVertical:10
    },
    quantity : {
        fontWeight:"600",
        fontSize:18
    }
})
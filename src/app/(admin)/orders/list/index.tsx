import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import orders from '@/assets/data/orders'
import OrderListItem from '@/components/OrderListItem'

const Orderscreen = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({item}) => <OrderListItem order={item} />}
      contentContainerStyle={{gap:10,padding:10}}
    />
  )
}

export default Orderscreen

const styles = StyleSheet.create({})
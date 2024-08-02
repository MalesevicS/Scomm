import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import OrderListItem from '@/components/OrderListItem'
import { supabase } from '@/src/lib/supabase'
import { useAdminOrderList, useMyOrderList } from '@/src/api/orders'

const Orderscreen = () => {

  const {data: orders, isLoading, error} = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch products</Text>
  }

  


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
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Order } from '@Types';
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
dayjs.extend(relativeTime);

type OrderListItemProps = {
    order:Order;
}

const OrderListItem = ({order} : OrderListItemProps) => {
    const segments = useSegments();

  return (
    <Link href={`/orders/${order.id}`} asChild>
    <Pressable style={styles.container}>
      <View>
        <Text style={styles.title}>Order # {order.id}</Text>
        <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
      </View>

      <Text>{order.status}</Text>
    </Pressable>
  </Link>
  )
}

export default OrderListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        padding:10,
        borderRadius:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    title: {
        fontWeight:"bold",
        marginVertical:5
    },
    time: {
        color:"grey"
    },
    status: {
       fontWeight: `500`
    }
})
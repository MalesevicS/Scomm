import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';
import { OrderListStatus } from '@/Types'; 
import { useOrderDetails } from '@/src/api/orders';

const OrderDetailPage = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === `string` ? idString : idString[0])

    const { data: order, isLoading, error} = useOrderDetails(id);

    if (isLoading) {
        return <ActivityIndicator />
      }
    
      if (error) {
        return <Text>Failed to fetch products</Text>
      }

    return (
        <View style={{padding:10, gap: 10, flex:1}}>
            <Stack.Screen options={{ title: `Order number #${id}` }} />

            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                keyExtractor={(item) => item.id.toString()} 
                ListHeaderComponent={() => <OrderListItem order={order} />}
                ListFooterComponent={() => (
                    <>
                        <Text style={{fontWeight:"bold"}}>Package status</Text>
                            <View style={{flexDirection:"row",gap:5}}>
                                {OrderListStatus.map((status) => (
                                    <Pressable
                                    key={status}
                                    onPress={() => console.log(`Upadating status`)}
                                    style={{
                                        borderColor:"blue",
                                        borderWidth:1,
                                        padding:10,
                                        borderRadius:5,
                                        marginVertical:10,
                                        backgroundColor:
                                            order.status === status
                                                ? "blue"
                                                : "transparent"
                                    }}
                                    >

                                        <Text
                                        style={{color: order.status === status ? "white" : "blue"}}
                                        >
                                            {status}
                                        </Text>

                                    </Pressable>
                                ))}
                            </View>
                    </>
                )}
            />
        </View>
    );
};

export default OrderDetailPage;

const styles = StyleSheet.create({});

import { ActivityIndicator, Button, StyleSheet } from 'react-native';
import { FlatList, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed'; 
import ProductListItem from '@/components/ProductListItem';
import { supabase } from '@/src/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useProductList } from '@/src/api/products';



export default function TabOneScreen() {

  const { data: products, error, isLoading} = useProductList();

  
  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch products</Text>
  }


  return (
   <ScrollView>
     <Button onPress={() => supabase.auth.signOut()} title="out"  />
    <FlatList 
      data={products}
      renderItem={({item}) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{gap:10,padding:10}}
      columnWrapperStyle={{gap:10}}
    />
   </ScrollView>
  );
}

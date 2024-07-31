import { StyleSheet } from 'react-native';
import EditScreenInfo from './EditScreenInfo';
import { Text,View } from './Themed'; 
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Tables } from '@/Types'; 
import { Link, useSegments } from 'expo-router';


export const defaultShoeImage = `https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png`

type ProductListItemProps = {
    product: Tables<`products`>
}


const ProductListItem = ({product} : ProductListItemProps) => {
  const segments= useSegments()
  return(
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
    <View>
      <Image resizeMode='contain' style={styles?.image} source={{uri: product.image || defaultShoeImage}} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

  
    </View>
    </Pressable> 
    </Link>
  )
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    padding:10,
    borderRadius:15,
    flex:1,
    maxWidth:`50%`
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  price: {
    fontSize: 12,
    color: Colors.light.tint,
  },
  image : {
    width: `100%`,
    aspectRatio:1
  }
});

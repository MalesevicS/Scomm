import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert} from 'react-native';
import Button from '@/components/Button';
import { defaultShoeImage } from '@/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products';

const CreateProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const [image, setImage] = useState<string | null>(null);
  
  const {id: idString} = useLocalSearchParams();
  const id = parseFloat(typeof idString === `string` ? idString : idString[0])
  const isUpdating = !!id;

  const { mutate: insertProduct} = useInsertProduct();
  const { mutate: updateProduct} = useUpdateProduct();
  const { mutate: deleteProduct} = useDeleteProduct();
  const {data: updatingProduct} = useProduct(id)
  const router = useRouter();

  useEffect(() => {
    if (updateProduct) {
      setName(updateProduct.name);
      // setPrice(updateProduct.price.toString());
      // setImage(updateProduct.image)
    }

  }, [updatingProduct])

  const validateInput = () => {
    setErrors(``)
    if (!name) {
        setErrors("Name is requierd");
        return false;
    }
    if (!price) {
        setErrors("Price is requierd");
        return false;
    }
    if (isNaN(parseFloat(price))) {
        setErrors("Price is not a number");
        return false;
    }

    return true;
  }

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  const onCreate = () => {
    if (!validateInput()) {
        return;
    }

    insertProduct({name, price: parseFloat(price), image}, {
      onSuccess: () => {
        resetFields();
        router.back();
      }
    })
  }

  const resetFields = () => {
    setName(``);
    setPrice(``);
  }

  const onUpdate = () => {
    if (!validateInput()) {
        return;
    }

    updateProduct({
      id, name, price: parseFloat(price), image
    })
    onSuccess: () => {
      resetFields();
      router.back();
    }

    resetFields();
  }


  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    deleteProduct(id)
  };
  

  const confirmDelete = () => {
    Alert.alert(`Confirm` , `Are you sure you want to delete this product?` , [
      {
        text:`Cancel`,
      },
      {
        text:`Delete`,
        style: `destructive`,
        onPress:onDelete
      }
    ])
    console.log("a")
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{title:isUpdating? `Update Product`: `Create Product`}} />
        <Image style={styles.image} source={{uri:image || defaultShoeImage}} />
        <Text onPress={pickImage} style={styles.textBtn}>Select Image</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.input} />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput value={price} onChangeText={setPrice} placeholder='124.99' style={styles.input} keyboardType="numeric" />

      <Text style={styles.errors}>{errors}</Text>

      <Button onPress={onSubmit} text={isUpdating? `Update Product`:'Create Product'} />
      {isUpdating && <Text onPress={confirmDelete} style={styles.textBtn}>Delete</Text>}
    </View>
  );
}

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 20,
    color:"grey"
  },
  label: {
    color: "grey",
    paddingLeft: 7,
    fontSize: 18
  },
  errors : {
    color:"red"
  },
  image: {
    width:`50%`,
    aspectRatio:1,
    resizeMode:"contain",
    alignSelf:"center"
  },
  textBtn: {
    alignSelf:"center",
    fontWeight:"bold",
    color:Colors.light.tint
  }
});

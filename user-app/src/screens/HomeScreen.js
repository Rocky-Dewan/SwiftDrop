import React, { useEffect } from 'react';
import { View, FlatList, SafeAreaView, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Loader from '../components/Loader';
import { addToCart } from '../redux/slices/cartSlice';

const categories = ['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Pantry'];

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { list, status } = useSelector(s => s.products);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  const openProduct = (p) => navigation.navigate('ProductDetails', { id: p._id });
  const onAdd = (p) => dispatch(addToCart({ product: p, qty: 1 }));

  if (status === 'loading') return <Loader />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {categories.map(c => <CategoryCard key={c} title={c} onPress={() => { }} />)}
        </ScrollView>

        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>Products</Text>
        <FlatList data={list} keyExtractor={i => i._id} renderItem={({ item }) => (
          <ProductCard product={item} onPress={openProduct} onAdd={onAdd} />
        )} />
      </ScrollView>
    </SafeAreaView>
  );
}

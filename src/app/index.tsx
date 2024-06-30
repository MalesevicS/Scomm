import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import Button from '@/components/Button';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '../lib/supabase';

const Index = () => {
  const { session, loading } = useAuth();
  
  console.log(session);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={`/sign-in`} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={`/(tabs)`} asChild>
        <Button text='User' />
      </Link>
      <Link href={`/(admin)`} asChild>
        <Button text='Admin' />
      </Link>
      <Link href={`/sign-in`} asChild>
        <Button text='Sign in' />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text={'Sign out'}  />
    </View> 
  );
}

export default Index;

const styles = StyleSheet.create({});

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert, Pressable, Text } from 'react-native';
import { Link } from 'expo-router';

const Home = () => {
  const [transactions, setTransactions] = useState([]);

  return (
    <SafeAreaView style={{ padding: 20, marginVertical: 20 }}>
    <Pressable style={styles.addTransaction}>
        <Text style={styles.addText}>+</Text>
    </Pressable>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
    addTransaction: {
        backgroundColor: '#0096FF',
        color: '#fff',
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
    },

    addText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
});
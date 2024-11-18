import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, {useState, useEffect} from "react";

export default function ViewTransaction () {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { transaction: transactionString } = params;

    console.log('Transaction:', params);

      if (!transaction) {
        return (
          <View style={styles.container}>
            <Text>Loading transaction details...</Text>
          </View>
        );
      }
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{transaction.title}</Text>
          <Text style={styles.text}>Amount: ${transaction.amount} CAD</Text>
          <Text style={styles.text}>Description: {transaction.desc}</Text>
          <Text style={styles.text}>Type: {transaction.type}</Text>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      text: {
        fontSize: 16,
        marginBottom: 5,
      },
    });
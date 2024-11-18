import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert, Pressable, Text, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import getBGColor from './components/bgColor';

const Home = () => {
      
    const [transactions, setTransactions] = useState([]);

    const { transactions: queryTransactions } = useLocalSearchParams();
  
    useEffect(() => {
        if (queryTransactions) {
          try {
            const parsedTransactions = JSON.parse(
              Array.isArray(queryTransactions) ? queryTransactions[0] : queryTransactions
            );
      
            setTransactions(parsedTransactions);
      
          } catch (e) {
            console.error('Failed to parse transactions:', e);
      
            setTransactions([]);
          }
        }
      }, [queryTransactions]);


      console.log('Parsed Transactions Home:', transactions);
    return (
        <SafeAreaView style={{ padding: 20, marginVertical: 20 }}>
        <View>
            {transactions.map((transaction) => (
            <Link
                key={transaction.id} 
                href={{
                pathname: '/viewTransaction',
                params: { transaction } 
                }}
                asChild
            >
            <Pressable style={{ padding:10, marginVertical:10, borderBottomColor: '#ccc', borderBottomWidth: 2, backgroundColor: getBGColor(transaction.type) }}>
                <View>
                    <Text style={styles.transText}>{transaction.title}</Text>
                    <Text style={styles.transText}>${transaction.amount} CAD</Text>
                </View>
            </Pressable>        
            </Link>
            ))}
        </View>
        <Link
            href={{
            pathname: '/addTransaction',
            params: { transactions: JSON.stringify(transactions) } 
            }}
            asChild
        >
            <Pressable style={styles.addTransaction}>
                <Text style={styles.addText}>+</Text>
            </Pressable>
        </Link>
            

        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    addTransaction: {
        backgroundColor: 'green',
        color: '#fff',
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
        marginTop: 20,
        alignSelf: 'flex-end',
    },

    addText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    transaction: {
        padding: 10,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    transText: {
        fontSize: 16,
    },
});
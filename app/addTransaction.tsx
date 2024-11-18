import React, { useEffect, useState} from "react";
import {View, TextInput, Pressable, StyleSheet, Text, Alert} from 'react-native';
import CheckBox from './components/checkBox';
import uuid from 'react-native-uuid';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AddTransaction() {

  const [transactions, setTransactions] = useState([]);
  const router = useRouter();
  const { transactions: queryTransactions } = useLocalSearchParams();
  
  useEffect(() => {
    if (queryTransactions) {
      try {
        const parsedTransactions = JSON.parse(Array.isArray(queryTransactions) ? queryTransactions[0] : queryTransactions);
        setTransactions(Array.isArray(parsedTransactions) ? parsedTransactions : []);
        console.log('Transactions:', transactions);
      } catch (e) {
        console.error('Failed to parse transactions:', e);
        setTransactions([]);
      }
    }
  }, [queryTransactions]);

  enum TransactionType  {
    Essential = 'Essential',
    Leisure = 'Leisure',
    Other = 'Other',
  };

  interface TransactionEntry {
    id : string,
    title : string,
    amount : number,
    desc : string,
    type : TransactionType,
  };  

  const defaultTransactionEntry : TransactionEntry = {
    id : "",
    title : "",
    amount : 0,
    desc : "",
    type : TransactionType.Essential,
  };
  
  const [transaction, setTransaction] = useState(defaultTransactionEntry);
  const [selectedType, setSelectedType] = useState(TransactionType.Essential);

  const handleIsChecked = (type: TransactionType) => {
    setSelectedType(type);
    setTransaction({ ...transaction, type: type });
  };

  function getNewID() : string {
    const id = String(uuid.v4());
    console.log(`ID is : ${id}`);
    return id;
}

const addTransaction = () => {
  if (!validateTransaction(transaction)) return;

  const newTransaction = {
    ...transaction,
    id: getNewID(),
  };

  const updatedTransactions = [...transactions, newTransaction];


  setTransactions(updatedTransactions);

  router.push({
    pathname: '/',
    params: { transactions: JSON.stringify(updatedTransactions) },
  });

  setTransaction(defaultTransactionEntry);
  setSelectedType(TransactionType.Essential);
};

  const validateTransaction = (transaction: TransactionEntry) => {
    if (!transaction.title) {
      Alert.alert('Error', 'Title is required.');
      return false;
    }
    if (!transaction.desc) {
      Alert.alert('Error', 'Description is required.');
      return false;
    }
    if (transaction.amount <= 0 || isNaN(transaction.amount)) {
      Alert.alert('Error', 'Please enter a valid amount greater than zero.');
      return false;
    }
    return true;
  };

  return (
    <View style={styles.form}>
      <TextInput
        id="title"
        placeholder="Write a Title..."
        style={styles.input}
        onChangeText={(text) => setTransaction({ ...transaction, title: text })}
        value={transaction.title}
      />
      <TextInput
        id="desc"
        style={styles.input}
        placeholder="Write a Description..."
        onChangeText={(text) => setTransaction({ ...transaction, desc: text })}
        value={transaction.desc}
      />
      <TextInput
        id="amount"
        style={styles.input}
        placeholder="Write Amount..."
        keyboardType="numeric"
        onChangeText={(text) =>  {
          const parsedValue = parseFloat(text);
          setTransaction({
            ...transaction,
            amount: isNaN(parsedValue) ? 0 : parsedValue, // Default to 0 if input is invalid
          });
        }}
        value={transaction.amount === 0 ? '' : transaction.amount.toString()}
      />
      <CheckBox
        id="1"
        label="Essential"
        color="blue"
        isChecked={() => handleIsChecked(TransactionType.Essential)}
        reset={selectedType !== TransactionType.Essential}
      />
      <CheckBox
        id="2"
        label="Leisure"
        color="red"
        isChecked={() => handleIsChecked(TransactionType.Leisure)}
        reset={selectedType !== TransactionType.Leisure}
      />
      <CheckBox
        id="3"
        label="Other"
        color="orange"
        isChecked={() => handleIsChecked(TransactionType.Other)}
        reset={selectedType !== TransactionType.Other}
      />

      <Pressable style={styles.button} onPress={() => addTransaction()}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    form: {
      marginTop: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
      paddingVertical: 5,
      margin: 10,
      height: 60,
    },
    button: {
      padding: 10,
      margin: 30,
      height: 60,
      backgroundColor: '#2196F3',
      borderRadius: 5,
      justifyContent: 'center', 
      alignItems: 'center',    
    },
    buttonText: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16, 
    },
  });
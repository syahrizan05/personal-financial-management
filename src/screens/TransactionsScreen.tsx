
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { Header, ListItem, Divider, Overlay, Icon, Text } from 'react-native-elements';

import styles from '../styles/styles'

import { View } from '../components/Themed';
import * as actionCreator from '../store/actions/action'

export default function TransactionsScreen(props: any) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionCreator.populateTransactions())
  }, [])

  const { transactionList } = useSelector((state: any) => state.transactionListReducer, shallowEqual)
  const filteredTransactionList=transactionList?transactionList.filter((tL:any)=>tL.transactionType==='external'):[]

  console.log(`transactionList : ${JSON.stringify(transactionList)}`)
  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => props.navigation.openDrawer() }}
        centerComponent={{ text: 'TRANSACTIONS', style: { color: '#fff' } }}
        rightComponent={{ icon: 'add', color: '#fff', onPress: () => props.navigation.navigate('AddTransaction') }}
      />
      <ScrollView>

        {
          filteredTransactionList && filteredTransactionList.map((item: any, i: any) => (
            <ListItem
              key={i}
              title={item.category}
              subtitle={item.description}
              leftIcon={{ name: item.categoryIcon, type: 'font-awesome', color: item.categoryIconColor }}
              rightElement={<View><Text> {item.account}</Text><Text> {`MYR ${item.amount}`}</Text></View>}
              bottomDivider
            // chevron
            />
          ))
        }
        <ListItem

          title={'Add Transaction'}
          //  subtitle= {<Text>Test</Text>}
          leftIcon={{ name: 'plus', type: 'font-awesome' }}
          bottomDivider
          chevron
          onPress={() => props.navigation.navigate('AddTransaction')}

        />



      </ScrollView>
    </View>
  );
}

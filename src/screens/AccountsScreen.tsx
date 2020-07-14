
import React, { useState, useEffect } from 'react';
import { ScrollView,View } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { Header, ListItem, Divider, Overlay, Icon, Text } from 'react-native-elements';

import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

export default function AccountsScreen(props: any) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionCreator.populateAccounts())
    dispatch(actionCreator.populateCategories())
    dispatch(actionCreator.populateTransactions())
  }, [])

  const { accountList } = useSelector((state: any) => state.accountListReducer, shallowEqual)

  //const accountList: any[] = []
  const incomeList = accountList ? accountList.filter((aL: any) => aL.type === 'Income') : []
  const savingList = accountList ? accountList.filter((aL: any) => aL.type === 'Saving') : []
  const accountListList = accountList ? accountList.filter((aL: any) => aL.type === 'Account') : []

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => props.navigation.openDrawer() }}
        centerComponent={{ text: 'ACCOUNTS', style: { color: '#fff' } }}
        rightComponent={{ icon: 'add', color: '#fff', onPress: () => props.navigation.navigate('AddAccount') }}
      />
      <ScrollView>
        <Text h4={true} style={{ margin: 10 }}>Income</Text>
        {
          incomeList && incomeList.map((item: any, i: any) => (

            <ListItem
              key={i}
              title={item.title}
              subtitle={<Text h4 h4Style={{ color: item.iconColor }}>MYR {item.balance}</Text>}
              leftIcon={{ name: item.icon, type: 'font-awesome', color: item.iconColor, reverse: true, size: 17 }}

              bottomDivider
              chevron
              onPress={() => props.navigation.navigate(`AccountDetail`, { accountTitle: item.title })}
            />

          ))
        }
        <ListItem
          title={'Add Income'}
          key={1234567890}
          //  subtitle= {<Text>Test</Text>}
          leftIcon={{ name: 'plus', type: 'font-awesome', reverse: true, size: 17 }}
          bottomDivider
          chevron
          onPress={() => props.navigation.navigate('AddAccount', { accountType: 'Income' })}

        />
        <Text h4={true} style={{ margin: 10 }}>Accounts</Text>
        {
          accountListList && accountListList.map((item: any, i: any) => (
            <ListItem
              key={i}
              title={item.title}
              subtitle={<Text h4 h4Style={{ color: item.iconColor }}>MYR {item.balance}</Text>}
              leftIcon={{ name: item.icon, type: 'font-awesome', color: item.iconColor, reverse: true, size: 17 }}
              bottomDivider
              chevron
              onPress={() => props.navigation.navigate(`AccountDetail`, { accountTitle: item.title })}
            />
          ))
        }
        <ListItem

          title={'Add Account'}
          key={1234567891}
          //  subtitle= {<Text>Test</Text>}
          leftIcon={{ name: 'plus', type: 'font-awesome', reverse: true, size: 17 }}
          bottomDivider
          chevron
          onPress={() => props.navigation.navigate('AddAccount', { accountType: 'Account' })}

        />

        <Text h4={true} style={{ margin: 10 }}>Savings</Text>
        {
          savingList && savingList.map((item: any, i: any) => (
            <ListItem
              key={i}
              title={item.title}
              subtitle={<Text h4 h4Style={{ color: item.iconColor }}>MYR {item.balance}</Text>}
              leftIcon={{ name: item.icon, type: 'font-awesome', color: item.iconColor, reverse: true, size: 17 }}
              bottomDivider
              chevron
            />
          ))
        }
        <ListItem
          key={1234567892}
          title={'Add Saving'}
          //  subtitle= {<Text>Test</Text>}
          leftIcon={{ name: 'plus', type: 'font-awesome', reverse: true, size: 17 }}
          onPress={() => props.navigation.navigate('AddAccount', { accountType: 'Saving' })}

          bottomDivider
          chevron
        />

     
      </ScrollView>
    </View>
  );
}

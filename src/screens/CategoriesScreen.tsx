
import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { Header, ListItem, Divider, Overlay, Icon, Text, Card } from 'react-native-elements';

import styles from '../styles/styles'

import Layout from '../constants/Layout'
import * as actionCreator from '../store/actions/action'

export default function CategoriesScreen(props: any) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionCreator.populateCategories())
  }, [])

  const { categoryList } = useSelector((state: any) => state.categoryListReducer, shallowEqual)

  //categoryList&& console.log(categoryList.length % 3)
  const categoryListMod = categoryList ? categoryList.length % 3 : 0

  const categoryListList = categoryListMod === 0 ? categoryList : categoryListMod === 1 ? [...categoryList, { title: 'NA' }, { title: 'NA' }] : [...categoryList, { title: 'NA' }]

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => props.navigation.openDrawer() }}
        centerComponent={{ text: 'CATEGORIES', style: { color: '#fff' } }}
        rightComponent={{ icon: 'add', color: '#fff', onPress: () => props.navigation.navigate('AddCategory') }}
      />
      <View>



        {categoryListList &&
          <FlatList
            contentContainerStyle={{ width: Layout.window.width, }}

            data={categoryListList}
            keyExtractor={(item, i) => i.toString()}
            numColumns={3}
            renderItem={({ item, index }) => {
              if (item.title !== 'NA') {
                return (
                  <View key={index} style={{ flex: 1, margin: 10, alignItems: 'center' }} >
                    <Text numberOfLines={1} ellipsizeMode={'tail'}>{item.title}</Text>
                    <Icon raised reverse color={item.iconColor} name={item.icon} type={'font-awesome'} size={30}
                      onPress={() => props.navigation.navigate(`CategoryDetail`, { categoryTitle: item.title })}
                    />
                    <Text>MYR {item.balance}</Text>

                  </View>
                )
              } else {
                return (
                  <View key={index} style={{ flex: 1, margin: 10, alignItems: 'center' }}  ></View>

                )
              }

            }
            }

          />
        }

      </View>
    </View>
  );
}

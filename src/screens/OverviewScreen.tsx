
import React, { useState, useEffect } from 'react';
import { ScrollView,View } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { VictoryBar, VictoryChart, VictoryTheme,VictoryPie } from "victory-native";
import { Header, ListItem, Divider, Overlay, Icon, Text } from 'react-native-elements';

import styles from '../styles/styles'

import * as actionCreator from '../store/actions/action'

export default function OverviewScreen(props: any) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionCreator.populateTransactions())
  }, [])

  const { transactionList } = useSelector((state: any) => state.transactionListReducer, shallowEqual)
  const { categoryList } = useSelector((state: any) => state.categoryListReducer, shallowEqual)

  console.log(`category list ialah : ${JSON.stringify(categoryList)}`)

  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];

  const externalTransaction = transactionList ? transactionList.filter((tL: any) => tL.transactionType === 'external') : []


  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => props.navigation.openDrawer() }}
        centerComponent={{ text: 'CATEGORIES', style: { color: '#fff' } }}
        rightComponent={{ icon: 'add', color: '#fff', onPress: () => props.navigation.navigate('AddCategory') }}
      />
      <ScrollView>
        <Text h4={true}>Coming Soon</Text>
        {/* <VictoryChart
          width={350}
          theme={VictoryTheme.material}
          domainPadding={10}>
          <VictoryBar
            style={{ data: { fill: "#c43a31" } }}
            //alignment="start"
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            barRatio={0.5}
            //barWidth={({ index }) => index * 2 + 8}
            //categories={{ x: ["dogs", "cats", "mice", "snake"] }}
            //cornerRadius={{ topLeft: ({ datum }) => datum.x * 4 }}


            data={categoryList}
            x="title" y="balance"
          />
        </VictoryChart>

       
          <VictoryPie
            colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
            data={[
              { x: "Cats", y: 90 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 }
            ]}
           // innerRadius={({ datum }) => 30 }
            labelRadius={({ innerRadius }:any) => innerRadius + 30 }
            //radius={({ datum }) => 10 + datum.y * 1}
            innerRadius={20}
            padAngle={5}
            
          /> */}
      

      </ScrollView>
    </View>
  );
}

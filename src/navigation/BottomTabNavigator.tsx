import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { BottomTabParamList, TabOneParamList, TabTwoParamList, TransactionsParamList, OverviewParamList } from '../../types';
import Sidebar from '../components/Sidebar'
import AccountsScreen from '../screens/AccountsScreen';
import AddAccountScreen from '../screens/AddAccountScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import AddCategoryScreen from '../screens/AddCategoryScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import OverviewScreen from '../screens/OverviewScreen';
import AccountDetailScreen from '../screens/AccountDetailScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const Drawer = createDrawerNavigator();

function getRouteName(route: any) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  return routeName
}

export default function BottomTabNavigator() {


  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Accounts"
        component={AccountsNavigator}

        options={({ route }) => {

          let tabBarVisible = true
          const routeName = getRouteName(route)
          if (routeName === 'AccountDetail' || routeName === 'AddAccount') {
            tabBarVisible = false
          }
          return {
            tabBarIcon: ({ color }: any) => <TabBarIcon name="md-card" color={color} />, tabBarVisible
          }
        }}
      />
      <BottomTab.Screen
        name="Categories"
        component={CategoriesNavigator}
        options={({ route }) => {

          let tabBarVisible = true
          const routeName = getRouteName(route)
          if (routeName === 'AddCategory') {
            tabBarVisible = false
          }
          return {
            tabBarIcon: ({ color }: any) => <TabBarIcon name="md-grid" color={color} />, tabBarVisible
          }
        }}
      />
      <BottomTab.Screen
        name="Transactions"
        component={TransactionsNavigator}
        options={({ route }) => {

          let tabBarVisible = true
          const routeName = getRouteName(route)
          if (routeName === 'AddTransaction') {
            tabBarVisible = false
          }
          return {
            tabBarIcon: ({ color }: any) => <TabBarIcon name="md-pricetags" color={color} />, tabBarVisible
          }
        }}
      />
      <BottomTab.Screen
        name="Overview"
        component={OverviewNavigator}
        options={{
          tabBarIcon: ({ color }: any) => <TabBarIcon name="md-analytics" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}



// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function AccountsNavigator() {
  return (
    <TabOneStack.Navigator screenOptions={{ headerShown: false }}>
      <TabOneStack.Screen
        name="AccountsScreen"
        component={AccountsScreen}

      />
      <TabOneStack.Screen
        name="AddAccount"
        component={AddAccountScreen}
      />
      <TabOneStack.Screen
        name="AccountDetail"
        component={AccountDetailScreen}
      />

    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function CategoriesNavigator() {
  return (
    <TabTwoStack.Navigator screenOptions={{ headerShown: false }}>
      <TabTwoStack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}

      />
      <TabTwoStack.Screen
        name="AddCategory"
        component={AddCategoryScreen}
      />
      <TabTwoStack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
      />
    </TabTwoStack.Navigator>
  );
}


const TransactionsStack = createStackNavigator<TransactionsParamList>();

function TransactionsNavigator() {
  return (
    <TransactionsStack.Navigator screenOptions={{ headerShown: false }}>
      <TransactionsStack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}

      />
      <TransactionsStack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
      />
    </TransactionsStack.Navigator>
  );
}


const OverviewStack = createStackNavigator<OverviewParamList>();

function OverviewNavigator() {
  return (
    <OverviewStack.Navigator screenOptions={{ headerShown: false }}>
      <OverviewStack.Screen
        name="OverviewScreen"
        component={OverviewScreen}

      />

    </OverviewStack.Navigator>
  );
}
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';

import { BottomTabParamList, TabOneParamList, TabTwoParamList, TransactionsParamList,DrawerParamList } from '../../types';
import Sidebar from '../components/Sidebar'
import BottomTabNavigator from './BottomTabNavigator';


const Drawer = createDrawerNavigator<DrawerParamList>();



function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props: any) => {
                const close = (props: any) => { props.navigation.closeDrawer() }
                const nav = (screen: any) => { props.navigation.navigate(screen) }
                return (<Sidebar nav={nav} close={close} />)
            }}
        >
            <Drawer.Screen name="Home" component={BottomTabNavigator} />
        </Drawer.Navigator>

    );
}

export default DrawerNavigator

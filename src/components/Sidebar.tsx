import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles/styles'

import { Header, ListItem, Divider, Overlay, Icon, Text } from 'react-native-elements';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import * as actionCreator from '../store/actions/action'

const Sidebar = (props: any) => {

    const dispatch = useDispatch()

    const nav = (screen: any) => {
        props.close()
        props.nav(screen)
    }
    // const list = [
    //     {
    //         title: 'Appointments',
    //         icon: 'av-timer'
    //     },
    //     {
    //         title: 'Trips',
    //         icon: 'flight-takeoff'
    //     },

    //]
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#2089dc' }}></View>
            <ListItem
                // key={i}
                title={'item.title'}
                leftIcon={{ name: 'book' }}
                bottomDivider
                chevron
            />
            <ListItem
                // key={i}
                title={'RESET DATA'}
                leftIcon={{ name: 'book' }}
                bottomDivider
                chevron
                onPress={() => dispatch(actionCreator.resetAllData())}
            />
            {/* {
                list.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.title}
                        leftIcon={{ name: item.icon }}
                        bottomDivider
                        chevron
                    />
                ))
            } */}
            <View style={{ flex: 3 }}></View>
        </View>
    );
}

export default Sidebar
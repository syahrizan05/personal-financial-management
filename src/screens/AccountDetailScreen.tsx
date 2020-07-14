
import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Header, ListItem, Divider, Overlay, Icon, Text, Input, Button, CheckBox, Card, ButtonGroup, PricingCard } from 'react-native-elements';
import styles from '../styles/styles'
import moment from 'moment'

import Layout from '../constants/Layout';


const validationSchema = Yup.object().shape({
    amount: Yup
        .number('Please enter amount')
        .required()
        .min(3)
        .label('Amount'),
});

export default function AccountDetailScreen(props: any) {
    const dispatch = useDispatch()
    const { transactionList } = useSelector((state: any) => state.transactionListReducer, shallowEqual)
    const { accountList } = useSelector((state: any) => state.accountListReducer, shallowEqual)

    const accountTitle = props.route.params?.accountTitle ?? 'NA'

    const accountInView = accountList ? accountList.find((aL: any) => aL.title === accountTitle) : []

    const filteredTransactionList = transactionList ? transactionList.filter((aL: any) => (aL.account === accountTitle || aL.category === accountTitle)) : []

    const [overlayVisible, setOverlayVisible] = useState(false)
    const [screenType, setScreenType] = useState('')
    const openOverlay = (screen: string) => {
        setScreenType(screen)
        setOverlayVisible(true)

    }

    const closeOverlay = () => {
        setScreenType('')
        setOverlayVisible(false)
    }


    return (
        <View style={styles.container}>
            <Overlay
                isVisible={overlayVisible}
                overlayStyle={{ width: Layout.window.width - 50 }}
                onBackdropPress={() => setOverlayVisible(false)}>
                {screenType === 'add' ?
                    <Topup accountList={accountList} accountDetail={accountInView} closeOverlay={closeOverlay} /> : <Transfer accountList={accountList} accountDetail={accountInView} closeOverlay={closeOverlay} />}
            </Overlay>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => props.navigation.goBack() }}
                centerComponent={{ text: accountInView.title, style: { color: '#fff' } }}
            />

            <View style={{ alignSelf: 'stretch', width: Layout.window.width - 20, height: Layout.window.height / 6, margin: 10 }}>

                <View style={{ flex: 1, borderWidth: 1, borderColor: 'lightgrey', marginLeft: 25, padding: 10, paddingLeft: 40 }}>
                    <Text>Balance</Text>

                    <Text h4={true} h4Style={{ color: accountInView.iconColor }}>{`MYR ${accountInView.balance}`}</Text>
                </View>
                <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Icon name={accountInView.icon} type={'font-awesome'} color={accountInView.iconColor} size={30} style={{ borderWidth: 1, borderColor: 'lightgrey', padding: 10, backgroundColor: 'white' }} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 10, width: Layout.window.width - 20 }}>
                <Button
                    icon={
                        <Icon
                            name="add-circle"
                            size={20}
                            color="white"
                        />
                    }
                    title="Topup"
                    containerStyle={{ flex: 1, margin: 5 }}
                    onPress={() => openOverlay('add')}
                />
                <Button
                    icon={
                        <Icon
                            name="remove-circle"
                            size={20}
                            color="white"
                        />
                    }
                    title="Transfer"
                    containerStyle={{ flex: 1, margin: 5 }}
                    buttonStyle={{ backgroundColor: 'deeppink' }}
                    onPress={() => openOverlay('minus')}
                />
                <Button
                    icon={
                        <Icon
                            name="shopping-cart"
                            size={20}
                            color="white"
                        />
                    }
                    title="Pay"
                    containerStyle={{ flex: 1, margin: 5 }}
                    buttonStyle={{ backgroundColor: 'darksalmon' }}
                    onPress={() => openOverlay('minus')}
                />
            </View>

            <FlatList
                //contentContainerStyle={{ width: Layout.window.width, }}

                data={filteredTransactionList}
                keyExtractor={(item, i) => i.toString()}

                renderItem={({ item, index }) =>
                    <ListItem
                        key={index}
                        title={`MYR ${item.amount}`}
                        subtitle={<Text>{item.account === accountTitle ? item.category : item.account}</Text>}
                        // leftIcon={{ name: item.transactionType === 'topup' ? 'add-circle' : 'remove-circle', color: item.categoryIconColor }}
                        leftIcon={{ name: item.account === accountTitle ? item.transactionType === 'topup' ? 'add-circle' : 'remove-circle' : item.transactionType === 'topup' ? 'remove-circle' : 'add-circle' }}
                        rightElement={<View>
                            <Text> {`${moment(item.dateUpdated).format('MMMM Do YYYY, h:mm:ss a')}`}</Text>
                        </View>}
                        bottomDivider
                    // chevron
                    />
                }

            />
        </View >
    );
}


const Topup = (props: any) => {
    const dispatch = useDispatch()
    const { accountList, handleAccountChange, accountDetail, closeOverlay } = props
    const accountListList = accountList && accountList.filter((aL: any) => (aL.title !== accountDetail.title))
    const accountListMod = accountListList ? accountListList.length % 3 : 0
    const accountListListList = accountListMod === 0 ? accountListList : accountListMod === 1 ? [...accountListList, { title: 'NA' }, { title: 'NA' }] : [...accountListList, { title: 'NA' }]

    const [selectedAccount, setSelectedAccount] = useState(0)


    return (
        <Formik
            validateOnMount
            initialValues={{
                description: undefined,
                amount: undefined,
                account: accountDetail.title,
                accountIcon: accountDetail.icon,
                accountIconColor: accountDetail.iconColor,
                category: accountDetail.type !== 'Income' ? accountListListList[selectedAccount].title : 'NA',
                categoryIcon: accountDetail.type !== 'Income' ? accountListListList[selectedAccount].icon : undefined,
                categoryIconColor: accountDetail.type !== 'Income' ? accountListListList[selectedAccount].iconColor : undefined,
                transactionType: 'topup',
                dateCreated: new Date(),
                dateUpdated: new Date()
            }}

            onSubmit={(values, actions) => {

                dispatch(actionCreator.addTransaction(values))
                //console.log(`values topup is : ${JSON.stringify(values)}`)
                actions.setSubmitting(false)
                closeOverlay()

            }
            }
            validationSchema={validationSchema}
        >

            {FormikProps => {

                const { amount } = FormikProps.values


                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount

                const selectAccount = (index: number) => {

                    setSelectedAccount(index)
                    FormikProps.setFieldValue('category', accountListListList[index].title)
                    FormikProps.setFieldValue('categoryIcon', accountListListList[index].icon)
                    FormikProps.setFieldValue('categoryIconColor', accountListListList[index].iconColor)

                }



                return (
                    <View>
                        <Text h4={true} style={{ margin: 10 }}>Accounts</Text>
                        <View style={{ flexDirection: 'row', paddingRight: 20 }}>
                            {/* <Text style={{ textAlignVertical: 'center' }}>MYR</Text> */}
                            <Input
                                placeholder='Amount (MYR)'
                                keyboardType={'number-pad'}
                                value={amount}
                                errorStyle={{ color: 'red' }}
                                errorMessage={amountTouched && amountError ? amountError : ''}
                                onChangeText={FormikProps.handleChange(`amount`)}
                                onBlur={FormikProps.handleBlur(`amount`)}

                            />
                        </View>
                        {accountDetail.type !== 'Income' &&
                            <FlatList
                                contentContainerStyle={{}}

                                data={accountListListList}
                                keyExtractor={(item, i) => i.toString()}
                                numColumns={3}
                                renderItem={({ item, index }) => {
                                    if (item.title !== 'NA') {
                                        return (
                                            <View key={index} style={{ flex: 1, margin: 10, alignItems: 'center' }} >
                                                <Text>{item.title}</Text>
                                                <Icon onPress={() => selectAccount(index)} reverse color={index === selectedAccount ? item.iconColor : 'lightgrey'} name={item.icon} type={'font-awesome'} size={30} />
                                                <Text>MYR {item.balance}</Text>
                                            </View>
                                        )
                                    } else {
                                        return (
                                            <View key={index} style={{ flex: 1, margin: 10, alignItems: 'center' }} />

                                        )
                                    }

                                }
                                }

                            />}
                        <Button title={'submit'} onPress={() => FormikProps.handleSubmit()} />


                    </View>)
            }}
        </Formik >
    )
}
const Transfer = (props: any) => {
    const dispatch = useDispatch()
    const { accountList, handleAccountChange, accountDetail, closeOverlay } = props
    const accountListList = accountList && accountList.filter((aL: any) => (aL.title !== accountDetail.title))
    const accountListMod = accountListList ? accountListList.length % 3 : 0
    const accountListListList = accountListMod === 0 ? accountListList : accountListMod === 1 ? [...accountListList, { title: 'NA' }, { title: 'NA' }] : [...accountListList, { title: 'NA' }]

    const [selectedAccount, setSelectedAccount] = useState(0)


    return (
        <Formik
            validateOnMount
            initialValues={{
                description: undefined,
                amount: undefined,
                account: accountDetail.title,
                accountIcon: accountDetail.icon,
                accountIconColor: accountDetail.iconColor,
                category: accountListListList[selectedAccount].title,
                categoryIcon: accountListListList[selectedAccount].icon,
                categoryIconColor: accountListListList[selectedAccount].iconColor,
                transactionType: 'transfer',
                dateCreated: new Date(),
                dateUpdated: new Date()
            }}

            onSubmit={(values, actions) => {

                dispatch(actionCreator.addTransaction(values))
                //console.log(`values topup is : ${JSON.stringify(values)}`)
                actions.setSubmitting(false)
                closeOverlay()

            }
            }
            validationSchema={validationSchema}
        >

            {FormikProps => {

                const { amount } = FormikProps.values


                const amountError = FormikProps.errors.amount
                const amountTouched = FormikProps.touched.amount

                const selectAccount = (index: number) => {

                    setSelectedAccount(index)
                    FormikProps.setFieldValue('category', accountListListList[index].title)
                    FormikProps.setFieldValue('categoryIcon', accountListListList[index].icon)
                    FormikProps.setFieldValue('categoryIconColor', accountListListList[index].iconColor)

                }




                return (
                    <View>
                        <Text h4={true} style={{ margin: 10 }}>Accounts</Text>
                        <View style={{ flexDirection: 'row', paddingRight: 20 }}>
                            {/* <Text style={{ textAlignVertical: 'center' }}>MYR</Text> */}
                            <Input
                                placeholder='Amount (MYR)'
                                keyboardType={'number-pad'}
                                value={amount}
                                errorStyle={{ color: 'red' }}
                                errorMessage={amountTouched && amountError ? amountError : ''}
                                onChangeText={FormikProps.handleChange(`amount`)}
                                onBlur={FormikProps.handleBlur(`amount`)}

                            />
                        </View>

                        <FlatList
                            contentContainerStyle={{}}

                            data={accountListListList}
                            keyExtractor={(item, i) => i.toString()}
                            numColumns={3}
                            renderItem={({ item, index }) => {
                                if (item.title !== 'NA') {
                                    return (
                                        <View key={index} style={{ flex: 1, margin: 10, alignItems: 'center' }} >
                                            <Text>{item.title}</Text>
                                            <Icon onPress={() => selectAccount(index)} reverse color={index === selectedAccount ? item.iconColor : 'lightgrey'} name={item.icon} type={'font-awesome'} size={30} />
                                            <Text>MYR {item.balance}</Text>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View key={index} style={{ flex: 1, margin: 10, alignItems: 'center' }} />

                                    )
                                }

                            }
                            }

                        />
                        <Button title={'submit'} onPress={() => FormikProps.handleSubmit()} />


                    </View>)
            }}
        </Formik >
    )
}
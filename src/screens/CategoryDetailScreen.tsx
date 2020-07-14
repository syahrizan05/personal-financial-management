
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

export default function CategoryDetailScreen(props: any) {
    const dispatch = useDispatch()
    const { transactionList } = useSelector((state: any) => state.transactionListReducer, shallowEqual)
    const { categoryList } = useSelector((state: any) => state.categoryListReducer, shallowEqual)
    //const  accountList  = categoryList
    const { accountList } = useSelector((state: any) => state.accountListReducer, shallowEqual)


    const categoryTitle = props.route.params?.categoryTitle ?? 'NA'

    const categoryInView = categoryList ? categoryList.find((aL: any) => aL.title === categoryTitle) : []

    const filteredTransactionList = transactionList ? transactionList.filter((aL: any) => (aL.account === categoryTitle || aL.category === categoryTitle)) : []

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
                    <Topup accountList={accountList} categoryDetail={categoryInView} closeOverlay={closeOverlay} /> : <Transfer categoryList={categoryList} accountDetail={categoryInView} closeOverlay={closeOverlay} />}
            </Overlay>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => props.navigation.goBack() }}
                centerComponent={{ text: categoryInView.title, style: { color: '#fff' } }}
            />

            <View style={{ alignSelf: 'stretch', width: Layout.window.width - 20, height: Layout.window.height / 6, margin: 10 }}>

                <View style={{ flex: 1, borderWidth: 1, borderColor: 'lightgrey', marginLeft: 25, padding: 10, paddingLeft: 40 }}>
                    <Text>Balance</Text>

                    <Text h4={true} h4Style={{ color: categoryInView.iconColor }}>{`MYR ${categoryInView.balance}`}</Text>
                </View>
                <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Icon name={categoryInView.icon} type={'font-awesome'} color={categoryInView.iconColor} size={30} style={{ borderWidth: 1, borderColor: 'lightgrey', padding: 10, backgroundColor: 'white' }} />
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
                        subtitle={<Text>{item.account === categoryTitle ? item.category : item.account}</Text>}
                        // leftIcon={{ name: item.transactionType === 'topup' ? 'add-circle' : 'remove-circle', color: item.categoryIconColor }}
                        leftIcon={{ name: item.account === categoryTitle ? item.transactionType === 'topup' ? 'add-circle' : 'remove-circle' : item.transactionType === 'topup' ? 'remove-circle' : 'add-circle' }}
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
    const { accountList, handleAccountChange, categoryDetail, closeOverlay } = props
    const accountListList = accountList
    const accountListMod = accountListList ? accountListList.length % 3 : 0
    const accountListListList = accountListMod === 0 ? accountListList : accountListMod === 1 ? [...accountListList, { title: 'NA' }, { title: 'NA' }] : [...accountListList, { title: 'NA' }]

    const [selectedAccount, setSelectedAccount] = useState(0)

    accountList && console.log(`account list kat Topup : ${JSON.stringify(accountList)}`)
    return (
        <Formik
            validateOnMount
            initialValues={{
                description: undefined,
                amount: undefined,
                category: categoryDetail.title,
                categoryIcon: categoryDetail.icon,
                categoryIconColor: categoryDetail.iconColor,
                account: accountListListList[selectedAccount].title,
                accountIcon: accountListListList[selectedAccount].icon,
                accountIconColor: accountListListList[selectedAccount].iconColor,
                transactionType: 'external',
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
                    FormikProps.setFieldValue('account', accountListListList[index].title)
                    FormikProps.setFieldValue('accountIcon', accountListListList[index].icon)
                    FormikProps.setFieldValue('accountIconColor', accountListListList[index].iconColor)

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
const Transfer = (props: any) => {
    const dispatch = useDispatch()
    const { categoryList, handleAccountChange, accountDetail, closeOverlay } = props
    const categoryListList = categoryList && categoryList.filter((aL: any) => (aL.title !== accountDetail.title))
    const categoryListMod = categoryListList ? categoryListList.length % 3 : 0
    const categoryListListList = categoryListMod === 0 ? categoryListList : categoryListMod === 1 ? [...categoryListList, { title: 'NA' }, { title: 'NA' }] : [...categoryListList, { title: 'NA' }]

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
                category: categoryListListList[selectedAccount].title,
                categoryIcon: categoryListListList[selectedAccount].icon,
                categoryIconColor: categoryListListList[selectedAccount].iconColor,
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
                    FormikProps.setFieldValue('category', categoryListListList[index].title)
                    FormikProps.setFieldValue('categoryIcon', categoryListListList[index].icon)
                    FormikProps.setFieldValue('categoryIconColor', categoryListListList[index].iconColor)

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

                            data={categoryListListList}
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
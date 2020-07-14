
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, FlatList,View } from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import * as actionCreator from '../store/actions/action'


import { Header, ListItem, Divider, Overlay, Icon, Text, Input, Button, CheckBox, Card } from 'react-native-elements';

import styles from '../styles/styles'

import Layout from '../constants/Layout';

const validationSchema = Yup.object().shape({

    description: Yup
        .string('Please enter description')
        .required()
        .min(3)
        .label('Description'),
    amount: Yup
        .number('Please enter amount')
        .required()
        .min(3)
        .label('Amount'),

});

export default function AddTransactionScreen(props: any) {

    const dispatch = useDispatch()
    const [changeAccountVisible, setChangeAccountVisible] = useState(false)
    const [selectionScreen, setSelectionScreen] = useState('')

    const { accountList } = useSelector((state: any) => state.accountListReducer, shallowEqual)
    const { categoryList } = useSelector((state: any) => state.categoryListReducer, shallowEqual)

    const openOverlay = (screen: string) => {
        setChangeAccountVisible(true)
        setSelectionScreen(screen)

    }

    return (
        <View style={styles.container}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => props.navigation.goBack() }}
                centerComponent={{ text: 'ADD TRANSACTION', style: { color: '#fff' } }}
            //rightComponent={{ icon: 'add', color: '#fff', onPress: () => props.navigation.navigate('AddAccount') }}
            />

            <Formik
                validateOnMount
                initialValues={{
                    description: undefined,
                    amount: undefined,
                    account: accountList[0].title,
                    accountIcon: accountList[0].icon,
                    accountIconColor: accountList[0].iconColor,
                    category: categoryList[0].title,
                    categoryIcon: categoryList[0].icon,
                    categoryIconColor: categoryList[0].iconColor,
                    transactionType:'external',
                    dateCreated: new Date(),
                    dateUpdated: new Date()
                }}

                onSubmit={(values, actions) => {

                    dispatch(actionCreator.addTransaction(values))
                    actions.setSubmitting(false)
                    props.navigation.goBack()
                }
                }
                validationSchema={validationSchema}
            >

                {FormikProps => {

                    const { description, amount, account, accountIcon, accountIconColor, category, categoryIcon, categoryIconColor } = FormikProps.values

                    const descriptionError = FormikProps.errors.description
                    const descriptionTouched = FormikProps.touched.description

                    const amountError = FormikProps.errors.amount
                    const amountTouched = FormikProps.touched.amount

                    const handleCategoryChange = (value: any) => {
                        const { title, icon, iconColor } = value
                        FormikProps.setFieldValue('category', title)
                        FormikProps.setFieldValue('categoryIcon', icon)
                        FormikProps.setFieldValue('categoryIconColor', iconColor)
                        setChangeAccountVisible(false)
                        //console.log('category change')
                    }


                    const handleAccountChange = (value: any) => {
                        const { title, icon, iconColor } = value
                        FormikProps.setFieldValue('account', title)
                        FormikProps.setFieldValue('accountIcon', icon)
                        FormikProps.setFieldValue('accountIconColor', iconColor)
                        setChangeAccountVisible(false)
                        //console.log('category change')
                    }


                    // const nameErrorMessage = nameTouched ? nameError:''

                    return (
                        <View>
                            <Overlay
                                overlayStyle={{ width: Layout.window.width - 50 }}
                                isVisible={changeAccountVisible}
                                onBackdropPress={() => setChangeAccountVisible(false)}
                            >
                                {selectionScreen === 'Account' ?
                                    <AccountList accountList={accountList} handleAccountChange={handleAccountChange} /> :
                                    <CategoryList categoryList={categoryList} handleCategoryChange={handleCategoryChange} />}
                            </Overlay>

                            <Card>
                                <TouchableOpacity onPress={() => openOverlay('Category')} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'lightgrey', paddingBottom: 10, marginBottom: 10 }}>
                                    <Text style={{ color: 'black' }}>{category}</Text>
                                    <Icon name={'pencil'} type={'font-awesome'} color={'black'} size={17} />

                                </TouchableOpacity>
                                <Icon name={categoryIcon} type={'font-awesome'} color={categoryIconColor} size={60} />

                                <Input
                                    placeholder='Description...'
                                    value={description}
                                    errorStyle={{ color: 'red' }}
                                    errorMessage={descriptionTouched && descriptionError ? descriptionError : ''}
                                    onChangeText={FormikProps.handleChange(`description`)}
                                    onBlur={FormikProps.handleBlur(`description`)}

                                />
                            </Card>
                            <Card>
                                <TouchableOpacity onPress={() => openOverlay('Account')} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'lightgrey', paddingBottom: 10, marginBottom: 10 }}>
                                    <Text style={{ color: 'black' }}>{account}</Text>
                                    <Icon name={'pencil'} type={'font-awesome'} color={'black'} size={17} />

                                </TouchableOpacity>
                                <Icon name={accountIcon} type={'font-awesome'} color={accountIconColor} size={60} />

                                <Input
                                    placeholder='Amount (MYR)'
                                    keyboardType={'number-pad'}
                                    value={amount}
                                    errorStyle={{ color: 'red' }}
                                    errorMessage={amountTouched && amountError ? amountError : ''}
                                    onChangeText={FormikProps.handleChange(`amount`)}
                                    onBlur={FormikProps.handleBlur(`amount`)}

                                />
                            </Card>



                            <Button
                                title="Add"
                                raised={true}
                                onPress={()=>FormikProps.handleSubmit()}
                                containerStyle={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}
                            />


                        </View>

                    )
                }}
            </Formik >
        </View >
    );
}


const AccountList = (props: any) => {
    const { accountList, handleAccountChange } = props
    const accountListList = accountList && accountList.filter((aL: any) => aL.type === 'Account')
    const accountListMod = accountListList ? accountListList.length % 3 : 0
    const accountListListList = accountListMod === 0 ? accountListList : accountListMod === 1 ? [...accountListList, { title: 'NA' }, { title: 'NA' }] : [...accountListList, { title: 'NA' }]

    return (
        <View>
            <Text h4={true} style={{ margin: 10 }}>Accounts</Text>


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
                                <Icon onPress={() => handleAccountChange(item)} raised reverse color={item.iconColor} name={item.icon} type={'font-awesome'} size={30} />
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


        </View>
    )
}

const CategoryList = (props: any) => {
    const { categoryList, handleCategoryChange } = props

    //categoryList&& console.log(categoryList.length % 3)
    const categoryListMod = categoryList ? categoryList.length % 3 : 0

    const categoryListList = categoryListMod === 0 ? categoryList : categoryListMod === 1 ? [...categoryList, { title: 'NA' }, { title: 'NA' }] : [...categoryList, { title: 'NA' }]

    return (<View>
        {categoryListList &&
            <FlatList
                // contentContainerStyle={{  }}

                data={categoryListList}
                keyExtractor={(item, i) => i.toString()}
                numColumns={3}
                renderItem={({ item, index }) => {
                    if (item.title !== 'NA') {
                        return (
                            <View key={index} style={{ flex: 1, margin: 10, alignItems: 'center' }} >
                                <Text>{item.title}</Text>
                                <Icon onPress={() => handleCategoryChange(item)} raised reverse color={item.iconColor} name={item.icon} type={'font-awesome'} size={30} />
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

    </View>)
}
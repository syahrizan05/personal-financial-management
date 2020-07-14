
import React, { useState, useEffect } from 'react';
import { View } from 'react-native'

import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Header, ListItem, Divider, Overlay, Icon, Text, Input, Button, CheckBox, Card } from 'react-native-elements';
import styles from '../styles/styles'

import { fontAwesomeString } from '../components/iconString'
import colorString from '../components/colorString'



const validationSchema = Yup.object().shape({
    title: Yup
        .string('Please enter')
        .required()
        .min(3)
        .label('title'),
});

export default function AccountsScreen(props: any) {

    const dispatch = useDispatch()

    const accountType = props.route.params?.accountType ?? 'NA'

    const selectedIcon = fontAwesomeString[Math.floor(Math.random() * fontAwesomeString.length)]
    const selectedColor = colorString[Math.floor(Math.random() * colorString.length)]

    return (
        <View style={styles.container}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => props.navigation.goBack() }}
                centerComponent={{ text: 'ADD ACCOUNT', style: { color: '#fff' } }}
            />

            <View style={{ padding: 10, margin: 10, flex: 1 }}>
                <View style={{ borderWidth: 1, borderColor: 'lightgrey', padding: 10, margin: 10, marginTop: 70, paddingTop: 35, position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Formik
                        validateOnMount
                        initialValues={{ title: undefined, type: accountType, iconColor: selectedColor, icon: selectedIcon, dateCreated: new Date(), dateUpdated: new Date(), balance: 0 }} onSubmit={(values, actions) => {

                            dispatch(actionCreator.addAccount(values))
                            actions.setSubmitting(false)
                            props.navigation.goBack()
                        }
                        }
                        validationSchema={validationSchema}
                    >
                        {FormikProps => {

                            const { title, type } = FormikProps.values

                            const titleError = FormikProps.errors.title
                            const titleTouched = FormikProps.touched.title

                            const typeError = FormikProps.errors.type
                            const typeTouched = FormikProps.touched.type

                            // const titleErrorMessage = titleTouched ? titleError:''

                            return (
                                <View>

                                    <Text style={{ margin: 10 }}>Name</Text>
                                    <Input
                                        placeholder='Name'

                                        value={title}
                                        errorStyle={{ color: 'red' }}
                                        errorMessage={titleTouched && titleError ? titleError : ''}
                                        onChangeText={FormikProps.handleChange(`title`)}
                                        onBlur={FormikProps.handleBlur(`title`)}

                                    />
                                    <Text style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>Type</Text>
                                    <CheckBox
                                        title='Income'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={type == 'Income'}
                                        onPress={() => FormikProps.setFieldValue('type', 'Income')}
                                    />

                                    <CheckBox
                                        title='Account'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={type == 'Account'}
                                        onPress={() => FormikProps.setFieldValue('type', 'Account')}
                                    />
                                    <CheckBox

                                        title='Saving'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={type == 'Saving'}
                                        onPress={() => FormikProps.setFieldValue('type', 'Saving')}
                                    />
                                    <CheckBox

                                        title='Debt'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={type == 'Debt'}
                                        onPress={() => FormikProps.setFieldValue('type', 'Debt')}
                                    />

                                    <Button
                                        title="Add"
                                        raised={true}
                                        onPress={() => FormikProps.handleSubmit()}
                                        containerStyle={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}
                                    />


                                </View>

                            )
                        }}
                    </Formik >
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={styles.shadow}>
                        <Icon name={selectedIcon} type={'font-awesome'} color={'#fff'} size={90} style={{ borderWidth: 1, borderColor: 'lightgrey', backgroundColor: selectedColor, padding: 10, }} />
                    </View>
                </View>
            </View>
        </View >
    );
}

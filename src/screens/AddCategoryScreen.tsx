
import React, { useState, useEffect } from 'react';
import {View} from 'react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as actionCreator from '../store/actions/action'
import { Header, ListItem, Divider, Overlay, Icon, Text, Input, Button, CheckBox } from 'react-native-elements';
import styles from '../styles/styles'

import { fontAwesomeString, ioniconsString } from '../components/iconString'
import colorString from '../components/colorString'


const validationSchema = Yup.object().shape({

    title: Yup
        .string('Please enter')
        .required()
        .min(3)
        .label('Name'),

});

export default function AddCategoryScreen(props: any) {

    const selectedIcon = fontAwesomeString[Math.floor(Math.random() * fontAwesomeString.length)]
    const selectedColor = colorString[Math.floor(Math.random() * colorString.length)]
    const dispatch = useDispatch()


    return (
        <View style={styles.container}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => props.navigation.goBack() }}
                centerComponent={{ text: 'ADD CATEGORY', style: { color: '#fff' } }}
            //rightComponent={{ icon: 'add', color: '#fff', onPress: () => props.navigation.navigate('AddAccount') }}
            />
            {/* <View style={{ alignItems: 'center' }}>
                <Icon raised reverse name={selectedIcon} type={'font-awesome'} color={selectedColor} size={90} />
            </View> */}
            <View style={{ padding: 10, margin: 10, flex: 1 }}>
                <View style={{ borderWidth: 1, borderColor: 'lightgrey', padding: 10, margin: 10, marginTop: 70, paddingTop: 35, position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>
           
            <Formik
                validateOnMount
                initialValues={{ title: undefined, iconColor: selectedColor, icon: selectedIcon, dateCreated: new Date(), dateUpdated: new Date(), balance: 0 }} onSubmit={(values, actions) => {

                    dispatch(actionCreator.addCategory(values))
                    actions.setSubmitting(false)
                    //actions.resetForm()
                    props.navigation.goBack()
                }
                }
                validationSchema={validationSchema}
            >
                {FormikProps => {

                    const { title } = FormikProps.values

                    const titleError = FormikProps.errors.title
                    const titleTouched = FormikProps.touched.title



                    // const nameErrorMessage = nameTouched ? nameError:''

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
            </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View >
                        <Icon raised reverse name={selectedIcon} type={'font-awesome'} color={selectedColor} size={45}  />
                    </View>
                </View>
            </View>
        </View >
    );
}

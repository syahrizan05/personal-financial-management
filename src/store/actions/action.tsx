
import AsyncStorage from '@react-native-async-storage/async-storage';

const accountListDefault = [
    {
        title: 'Salary',
        type: 'Income',
        balance: 0,
        icon: 'building-o',
        iconColor: 'peru',
        dateCreated: new Date(),
        dateUpdated: new Date(),

    },
    {
        title: 'Card',
        type: 'Account',
        balance: 0,
        icon: 'credit-card',
        iconColor: 'dodgerblue',
        dateCreated: new Date(),
        dateUpdated: new Date(),

    },
    {
        title: 'Cash',
        type: 'Account',
        balance: 0,
        icon: 'money',
        iconColor: 'darkseagreen',
        dateCreated: new Date(),
        dateUpdated: new Date(),
    },
    {
        title: 'Travel',
        type: 'Saving',
        balance: 0,
        icon: 'road',
        iconColor: 'indianred',
        dateCreated: new Date(),
        dateUpdated: new Date(),
    },


]

const categoryListDefault = [
    
    {
        title: 'Groceries',
        icon: 'shopping-basket',
        iconColor: 'darkseagreen',
        dateCreated: new Date(),
        dateUpdated: new Date(),
        balance: 0,

    },
    {
        title: 'Restaurant',
        icon: 'coffee',
        iconColor: 'lightcoral',
        dateCreated: new Date(),
        dateUpdated: new Date(),
        balance: 0,
    },
    {
        title: 'Leisure',
        icon: 'beer',
        iconColor: 'indigo',
        dateCreated: new Date(),
        dateUpdated: new Date(),
        balance: 0,
    },
    {
        title: 'Transport',
        icon: 'train',
        iconColor: 'mediumorchid',
        dateCreated: new Date(),
        dateUpdated: new Date(),
        balance: 0,
    },
    {
        title: 'Health',
        icon: 'medkit',
        iconColor: 'palegreen',
        dateCreated: new Date(),
        dateUpdated: new Date(),
        balance: 0,
    },
    {
        title: 'Gifts',
        icon: 'gift',
        iconColor: 'peachpuff',
        dateCreated: new Date(),
        dateUpdated: new Date(),
        balance: 0,
    },
    {
        title: 'Family',
        icon: 'child',
        iconColor: 'peru',
        dateCreated: new Date(),
        dateUpdated: new Date(),
        balance: 0,
    },
    {
        title: 'Shopping',
        icon: 'shopping-bag',
        iconColor: 'darkseagreen',
        dateCreated: new Date(),
        dateUpdated: new Date(),
        balance: 0,
    },

]

export const populateAccounts = () => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        console.log(`populate data 1`)

        try {
            const accountList = await AsyncStorage.getItem('accounts')
            if (accountList !== null) {
                // value previously stored
                console.log(`value ialah ${accountList}`)
                dispatch({ type: 'GET_ACCOUNTS', payload: { accountList: JSON.parse(accountList) } })
            } else {
                try {
                    const jsonValue = JSON.stringify(accountListDefault)
                    await AsyncStorage.setItem('accounts', jsonValue)
                    dispatch({ type: 'GET_ACCOUNTS', payload: { accountList: accountListDefault } })

                } catch (e) {
                    // saving error
                }

            }
        } catch (e) {
            // error reading value
        }
    }

}


export const addAccount = (value: object) => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        const { accountList } = getState().accountListReducer
        const newAccountList = [...accountList, value]

        try {
            const jsonValue = JSON.stringify(newAccountList)
            await AsyncStorage.setItem('accounts', jsonValue)
            dispatch({ type: 'GET_ACCOUNTS', payload: { accountList: newAccountList } })

        } catch (e) {
            // saving error
        }
        console.log(`add data ${JSON.stringify(accountList)}`)


    }

}


export const populateCategories = () => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        console.log(`populate category 1`)

        try {
            const categoryList = await AsyncStorage.getItem('categories')
            if (categoryList !== null) {
                // value previously stored
                console.log(`value ialah ${categoryList}`)
                dispatch({ type: 'GET_CATEGORIES', payload: { categoryList: JSON.parse(categoryList) } })
            } else {
                try {
                    const jsonValue = JSON.stringify(categoryListDefault)
                    await AsyncStorage.setItem('categories', jsonValue)
                    dispatch({ type: 'GET_CATEGORIES', payload: { categoryList: categoryListDefault } })

                } catch (e) {
                    // saving error
                }

            }
        } catch (e) {
            // error reading value
        }
    }

}


export const addCategory = (value: object) => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        const { categoryList } = getState().categoryListReducer
        const newCategoryList = [...categoryList, value]

        try {
            const jsonValue = JSON.stringify(newCategoryList)
            await AsyncStorage.setItem('categories', jsonValue)
            dispatch({ type: 'GET_CATEGORIES', payload: { categoryList: newCategoryList } })

        } catch (e) {
            // saving error
        }
        console.log(`add data ${JSON.stringify(categoryList)}`)


    }

}




export const populateTransactions = () => {
    return async (dispatch: any, getState: any) => {
        //dispatch(getLoanDataApi())
        console.log(`populate transaction 1`)

        try {
            const transactionList = await AsyncStorage.getItem('transactions')
            if (transactionList !== null) {
                // value previously stored
                console.log(`value ialah ${transactionList}`)
                dispatch({ type: 'GET_TRANSACTIONS', payload: { transactionList: JSON.parse(transactionList) } })
            } else {
                dispatch({ type: 'GET_TRANSACTIONS', payload: { categoryList: [] } })

            }
        } catch (e) {
            // error reading value
        }
    }

}



export const addTransaction = (value: any) => {
    return async (dispatch: any, getState: any) => {

        console.log(`add transaction : ${JSON.stringify(value)}`)

        const { category, account, dateUpdated, amount, transactionType } = value

        const { transactionList } = getState().transactionListReducer
        const newTransactionList = transactionList ? [...transactionList, value] : [value]

        const { accountList } = getState().accountListReducer
        console.log(`ini la hasil dari value tersebut : ${JSON.stringify(account)}`)
        const selectedAccount = accountList.find((aL: any) => aL.title === account)


        if (transactionType === 'topup') {
            const newAccount = { ...selectedAccount, dateUpdated, balance: selectedAccount.balance + Number(amount) }
            const newAccountList = [...accountList.filter((aL: any) => aL.title !== account), newAccount]
            if (category !== 'NA') {
                const categoryList = newAccountList
                const selectedCategory = categoryList.find((cL: any) => cL.title === category)
                console.log(`selectedCategory : ${JSON.stringify(selectedCategory)}`)
                const newCategory = { ...selectedCategory, dateUpdated, balance: selectedCategory.balance - Number(amount) }
                const newCategoryList = [...categoryList.filter((cL: any) => cL.title !== category), newCategory]
                try {
                    const jsonValue = JSON.stringify(newTransactionList)
                    await AsyncStorage.setItem('transactions', jsonValue)
                    //await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList))
                    await AsyncStorage.setItem('accounts', JSON.stringify(newCategoryList))

                } catch (e) {
                    // saving error
                }
            } else {

                try {
                    const jsonValue = JSON.stringify(newTransactionList)
                    await AsyncStorage.setItem('transactions', jsonValue)
                    //await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList))
                    await AsyncStorage.setItem('accounts', JSON.stringify(newAccountList))

                } catch (e) {
                    // saving error
                }
            }




        } else if (transactionType === 'transfer') {
            const newAccount = { ...selectedAccount, dateUpdated, balance: selectedAccount.balance - Number(amount) }
            const newAccountList = [...accountList.filter((aL: any) => aL.title !== account), newAccount]
            const categoryList = newAccountList
            const selectedCategory = categoryList.find((cL: any) => cL.title === category)
            const newCategory = { ...selectedCategory, dateUpdated, balance: selectedCategory.balance + Number(amount) }
            const newCategoryList = [...categoryList.filter((cL: any) => cL.title !== category), newCategory]



            try {
                const jsonValue = JSON.stringify(newTransactionList)
                await AsyncStorage.setItem('transactions', jsonValue)
                //await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList))
                await AsyncStorage.setItem('accounts', JSON.stringify(newCategoryList))

            } catch (e) {
                // saving error
            }
        }
        else {
            console.log(`goes here`)
            const newAccount = { ...selectedAccount, dateUpdated, balance: selectedAccount.balance - Number(amount) }
            const newAccountList = [...accountList.filter((aL: any) => aL.title !== account), newAccount]
            const { categoryList } = getState().categoryListReducer
            const selectedCategory = categoryList.find((cL: any) => cL.title === category)
            const newCategory = { ...selectedCategory, dateUpdated, balance: selectedCategory.balance + Number(amount) }
            const newCategoryList = [...categoryList.filter((cL: any) => cL.title !== category), newCategory]


            try {
                const jsonValue = JSON.stringify(newTransactionList)
                await AsyncStorage.setItem('transactions', jsonValue)

                await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList))
                await AsyncStorage.setItem('accounts', JSON.stringify(newAccountList))

            } catch (e) {
                // saving error
            }
        }



        dispatch({ type: 'GET_TRANSACTIONS', payload: { transactionList: newTransactionList } })
        dispatch(populateAccounts())
        dispatch(populateCategories())
        dispatch(populateTransactions())


    }

}



// export const topUp = (value: any) => {
//     return async (dispatch: any, getState: any) => {

//         console.log(`add transaction : ${JSON.stringify(value)}`)

//         const { category, account, dateUpdated, amount } = value

//         const { transactionList } = getState().transactionListReducer
//         const { categoryList } = getState().categoryListReducer
//         const { accountList } = getState().accountListReducer

//         const selectedCategory = categoryList.find((cL: any) => cL.title === category)
//         const selectedAccount = accountList.find((aL: any) => aL.title === account)

//         const newCategory = { ...selectedCategory, dateUpdated, balance: selectedCategory.balance + Number(amount) }
//         const newAccount = { ...selectedAccount, dateUpdated, balance: selectedAccount.balance - Number(amount) }

//         console.log(`newCategory : ${JSON.stringify(newCategory)}`)
//         console.log(`newAccount : ${JSON.stringify(newAccount)}`)


//         const newCategoryList = [...categoryList.filter((cL: any) => cL.title !== category), newCategory]
//         const newAccountList = [...accountList.filter((aL: any) => aL.title !== account), newAccount]




//         const newTransactionList = transactionList ? [...transactionList, value] : [value]

//         try {
//             const jsonValue = JSON.stringify(newTransactionList)
//             await AsyncStorage.setItem('transactions', jsonValue)

//             await AsyncStorage.setItem('categories', JSON.stringify(newCategoryList))
//             await AsyncStorage.setItem('accounts', JSON.stringify(newAccountList))

//             console.log(`new categories are : ${JSON.stringify(newCategoryList)}`)
//             console.log(`new accounts  are : ${JSON.stringify(newAccountList)}`)

//             dispatch({ type: 'GET_TRANSACTIONS', payload: { transactionList: newTransactionList } })

//             dispatch(populateAccounts())
//             dispatch(populateCategories())
//             dispatch(populateTransactions())

//         } catch (e) {
//             // saving error
//         }
//         console.log(`add data ${JSON.stringify(transactionList)}`)


//     }

// }



export const resetAllData = () => {
    return async (dispatch: any, getState: any) => {
        try {
            await AsyncStorage.multiRemove(['transactions', 'categories', 'accounts'])

        } catch (e) {
            // remove error
        }


        dispatch({ type: 'TRANSACTIONS_RESET' })
        // dispatch({ type: 'CATEGORIES_RESET' })
        // dispatch({ type: 'ACCOUNTS_RESET' })

        dispatch(populateAccounts())
        dispatch(populateCategories())
        dispatch(populateTransactions())

        console.log(`reset accounts : ${JSON.stringify(getState().accountListReducer)}`)

    }

}


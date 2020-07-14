// import { Notifications } from 'expo'
// import * as SecureStore from 'expo-secure-store'
// import { AsyncStorage } from 'react-native';
// import moment from 'moment'

// const apiUrl = 'https://staging.tekun.app/'
// const lmsApiUrl = 'https://lms.bxcess.my/'

// const apiGetCall = async (uri, apiAccess, lms = false) => {


//   const access = !lms ? apiAccess ? apiAccess : JSON.parse(await SecureStore.getItemAsync('personalToken')) : JSON.parse(await SecureStore.getItemAsync('lmsPersonalToken'))

//   const { token_type, access_token } = access
//   const method = 'GET'
//   const Accept = 'application/json'
//   const Authorization = token_type + ' ' + access_token

//   const headers = { 'Content-Type': 'application/json', Accept, Authorization }
//   let response = await fetch(`${!lms ? apiUrl : lmsApiUrl}${uri}`, { method, headers })
//   let responseJson = await response.json()
//   return responseJson


// }

// const apiPostCall = async (uri, values, apiAccess) => {

//   const body = JSON.stringify({ ...values, access_credential: 'api' })

//   const access = apiAccess ? apiAccess : JSON.parse(await SecureStore.getItemAsync('personalToken'))

//   const { token_type, access_token } = access
//   const method = 'POST'
//   const Accept = 'application/json'
//   const Authorization = token_type + ' ' + access_token

//   const headers = { 'Content-Type': 'application/json', Accept, Authorization }
//   let response = await fetch(`${apiUrl}${uri}`, { method, headers, body })
//   let responseJson = await response.json()
//   return responseJson

// }



// export const newsApi = () => {
//   return async (dispatch, getState) => {

//     const responseJson = await apiPostCall(`api/news/view`, null, getState().apiReducer)
//     const newsArray = await responseJson.data
//      await console.log(`NEWS API  ${JSON.stringify(newsArray)}`)

//     await dispatch({ type: 'SET_NEWS', payload: { newsArray } })


//   }
// }


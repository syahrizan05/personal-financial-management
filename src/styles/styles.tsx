import { StyleSheet } from 'react-native'
//import Constants from 'expo-constants'

const fontSize = 15

const elevationShadowStyle = (elevation: number) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}



export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    fontSize: fontSize * 1.1,
    fontFamily: 'Montserrat_medium',
    color: '#000'
  },
  listItem: {
    fontSize: fontSize * 0.8,
    fontFamily: 'Montserrat_medium',
    color: 'darkgrey'
  },

  label: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: 'grey'
  },
  value: {
    fontSize: fontSize * 1.1,
    fontFamily: 'Montserrat_medium',
    color: '#000'
  },


 
  subTitle: {

    fontFamily: 'Montserrat_medium',
    color: '#055E7C',
    fontSize: fontSize * 1.2
  },

  butang: {

    fontFamily: 'Montserrat_medium',
    fontSize: fontSize * 1.4
  },

  h3: {

    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize * 1.1
  },

  h2: {

    fontFamily: 'Montserrat_medium',
    color: '#04A2BD',
    fontSize: fontSize * 1.3
  },

  h1: {

    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize * 1.4
  },

  boldText: {

    fontFamily: 'Montserrat_medium',
    color: '#000',
    fontSize: fontSize * 1.1
  },

  small: {

    fontFamily: 'Montserrat_regular',
    color: '#000',
    fontSize: fontSize * 0.9
  },

  titleBox: {
    fontSize: fontSize * 0.87,
    fontFamily: 'Montserrat_medium',
    color: '#000',

  },
  textInput: {
    fontSize: fontSize * 1.1,
    fontFamily: 'Montserrat_medium',
    color: '#000'
  },
  searchBar: {
    fontSize: fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000'
  },

  error: {

    fontFamily: 'Montserrat_medium',
    color: 'rgba(255,0,0,1)',
    fontSize: fontSize * 0.7
  },
  textDefault: {
    fontSize,
    fontFamily: 'Montserrat_medium',
    color: '#000'
  },
  screenMargin: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },

  formElement: {
    marginBottom: 20
  },

  titleMargin: {
    paddingLeft: 20,
    paddingRight: 20
  },

  boxOld: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    // elevation: 6,
    margin: 10,
    padding: 15,
    // borderRadius: 15,
    // borderColor: '#000000',
    // borderWidth: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  box: {
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',


  },
  shadow: {
    ...elevationShadowStyle(5),
    backgroundColor: 'white' // It'll look weird without a background color!
  },
  borderStyleBase: {
    width: 45,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  busHub: {
    flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, margin: 10, marginTop: 5, marginBottom: 5, borderWidth: 1, padding: 20, borderColor: 'lightgrey',
  }
})
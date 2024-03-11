import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

//form validations
import * as Yup from 'yup';
import { Formik } from 'formik';
import Options from './components/Options';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number().required('Length is required')
  .min(4, 'Should be minimum of 4 characters')
  .max(16, 'should be a maximum of 16 characters')
})

export default function App() {

  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setIsUpperCase] = useState(false);
  const [numbers, useNumbers] = useState(false);
  const [symbols, useSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitsChars = '0123456789';
    const specialChars = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

    if(upperCase){
      characterList += upperCaseChars;
    }

    if(lowerCase){
      characterList += lowerCaseChars;
    }
    
    if(numbers){
      characterList += digitsChars;
    }

    if(symbols){
      characterList +=specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  }

  const createPassword = (characters: String, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  }

  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setIsUpperCase(false);
    useNumbers(false);
    useSymbols(false);
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Password Generator</Text>
          </View>
  
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={ values => {
              console.log(values);
              generatePasswordString(+values.passwordLength) 
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset
            }) => (
              <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                  
                </View>
                <TextInput
                  style={styles.inputStyle}
                  value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  placeholder="Ex. 8"
                  keyboardType='numeric'
                  />
              </View> 

                <Options 
                colorfill="#29AB87"
                text='lowercase letters'
                state={lowerCase} 
                stateSetter={setLowerCase} 
                passwordSetter={setPassword} 
                passwordBoolSetter={setIsPassGenerated}
                />

                <Options 
                colorfill="#FED85D"
                text='uppercase letters'
                state={upperCase} 
                stateSetter={setIsUpperCase} 
                passwordSetter={setPassword} 
                passwordBoolSetter={setIsPassGenerated}
                />

                <Options 
                colorfill="#C9A0DC"
                text='Numbers'
                state={numbers} 
                stateSetter={useNumbers} 
                passwordSetter={setPassword} 
                passwordBoolSetter={setIsPassGenerated}
                />

                <Options 
                colorfill="#FC80A5"
                text='Symbols'
                state={symbols} 
                stateSetter={useSymbols} 
                passwordSetter={setPassword} 
                passwordBoolSetter={setIsPassGenerated}
                />

              <View style={styles.formActions}>
                <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => handleSubmit()}//DOUBT
                >
                  <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={ () => {
                  handleReset();
                  resetPassword();
                }}
                >
                  <Text style={styles.secondaryBtnTxt}>Reset</Text>
                </TouchableOpacity>
              </View>
              </>
            )}
        </Formik>

        </View>
        {isPassGenerated ? (
            (
              lowerCase || upperCase || numbers || symbols ? (
                <View style={[styles.card, styles.cardElevated]}>
                  <Text style={styles.description}>Long press to copy the password.</Text>
                  <Text selectable style={styles.generatedPassword}>{password}</Text>
                </View>
              )
              : (
                <View style={[styles.card, styles.cardElevated]}>
                  <Text style={styles.description}>Select atleast one option to generate password</Text>
                </View>
              )
            )
        ) : null}

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    marginBottom: 30,
  },
  description: {
    color: '#758283',
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ffffff',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#0086F9',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#fff',
  },
  secondaryBtnTxt: {
    color: '#64A7FB',
    textAlign: 'center',
    fontWeight: '700',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    minHeight: 60
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 30,
    textAlign: 'center',
    color:'#000'
  },
})
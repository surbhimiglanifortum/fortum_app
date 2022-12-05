import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import CommonView from '../../../Component/CommonView/index'
import CommonCard from '../../../Component/Card/CommonCard/index'
import DenseCard from '../../../Component/Card/DenseCard/index'
import Header from '../../../Component/Header/Header'
import { Formik } from 'formik'
import Button from '../../../Component/Button/Button'
import CommonText from '../../../Component/Text/CommonText'
import Textinput from '../../../Component/Textinput/Textinput'
import colors from '../../../Utils/colors'
import { franchise, getStateList } from '../../../Services/Api'
import { Picker } from '@react-native-community/picker'
import RadioBtn from '../../../Component/Button/RadioButton'
import * as Yup from 'yup';
import { useQuery } from 'react-query'
import { useState } from 'react'
import { Checkbox } from 'react-native-paper'
import { scale } from 'react-native-size-matters'
import { useContext } from 'react'
import SnackContext from '../../../Utils/context/SnackbarContext'
import { useNavigation } from '@react-navigation/native'

const JoinHandsWith = () => {

  const navigation = useNavigation()
  const { setOpenCommonModal } = useContext(SnackContext);
  const [stateName, setStateName] = useState('')
  const [location, setLocation] = useState('');
  const [comercialApproved, setcomercialApproved] = useState('');
  const [qualification, setqualification] = useState('');
  const [investment, setinvestment] = useState('');
  const [isAcceptCheck, setIsAcceptCheck] = useState(false)
  const [isAcceptCheck2, setIsAcceptCheck2] = useState(false)
  const [stateError, setStateError] = useState('')
  const [locationError, setLocationError] = useState('')

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name Required'),
    email: Yup.string().email('Invalid email').matches(emailRegex, 'Email is not valid !').required('Email Required'),
    mobile_number: Yup.string().min(10, 'Enter Valid Phone Number!').max(10, 'Enter Valid Phone Number!').matches(phoneRegExp, 'Phone Number is not valid !').required('Enter Mobile Number'),
    stateName: Yup.string().min(10, 'Enter Valid Phone Number!').max(10, 'Enter Valid Phone Number!').matches(phoneRegExp, 'Phone Number is not valid !').required('Enter Mobile Number'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('City Name Required'),
    complete_address: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Address Name Required'),
    stateName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('State Name Required'),

  });


  const handleSignup = async (values, event) => {

    // console.log("State Slection", values)

    // if (stateName == "") {
    //   setStateError('Please select State.')
    //   return
    // } else {
    //   setStateError('')
    // }
    // if (location == "") {
    //   setLocationError('Please select State.')
    //   return
    // } else {
    //   setLocationError('')
    // }


    let objToSend = {}
    objToSend.firstname = values.name
    objToSend.email = values.email
    objToSend.phonenumber = values.mobile_number
    objToSend.stateofproposedlocation = stateName
    objToSend.proposedlocation = location
    objToSend.cityofproposedlocation = values.city
    objToSend.ispropertycommerciallyapproved = comercialApproved
    objToSend.addressproposedland = values.complete_address
    objToSend.qualification = qualification
    // objToSend.occupation = occupation
    objToSend.existingcompanyname = values.existing_company
    objToSend.reasonfortakingupfortumcharge = values.reason_for_taking
    objToSend.rangeofinvestment = investment
    objToSend.timeframerequired = values.time_frame

    console.log(objToSend, '..........obj ')

    const res = await franchise(objToSend)
    console.log(res.data, '.....................data resssssssssss---')
    navigation.goBack()
    if (res) {
      setOpenCommonModal({ isVisible: true, message: "Franchise Added Successfully" })
      return
    }
  }

  const arrayData = [
    {
      name: 'Business',
    },
    {
      name: 'Other'
    }
  ]


  const { data: stateData, status, isLoading, refetch } = useQuery('StateData', async () => {
    const result = await getStateList()
    return result?.data
  })

  return (
    <CommonView>
      <Header showText={'Join Hands with'} />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              mobile_number: '',
              city: '',
              complete_address: '',
              existing_company: '',
              reason_for_taking: '',
              time_frame: '',
            }}
            onSubmit={handleSignup}
            validationSchema={SignupSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors, touched }) => (
              <>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={"Name"} fontSize={14} />
                  <Textinput value={values.name} onChange={handleChange('name')} />
                  {errors.name && <CommonText showText={errors.name} customstyles={{ color: colors.red }} fontSize={14} />}
                </View>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={'Email'} fontSize={14} />
                  <Textinput value={values.email} onChange={handleChange('email')} />
                  {errors.email && <CommonText showText={errors.email} customstyles={{ color: colors.red }} fontSize={14} />}
                </View>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={'Phone number'} fontSize={14} />
                  <Textinput value={values.mobile_number} onChange={handleChange('mobile_number')} keyboardType={'number-pad'} />
                  {errors.mobile_number && <CommonText showText={errors.mobile_number} customstyles={{ color: colors.red }} fontSize={14} />}
                </View>
                <View>
                  <CommonText showText={"State of proposed location"} fontSize={14} />
                  <DenseCard>
                    <Picker
                      selectedValue={stateName}
                      onValueChange={(itemValue, itemIndex) => {
                        console.log("Select State Here ", itemValue)
                        setStateError('')
                        setStateName(itemValue)
                      }
                      }
                      mode={'dropdown'}
                    >
                      <Picker.Item label={'Select State'} value={''} />
                      {
                        stateData?.map((item, index) => {
                          return (
                            <Picker.Item label={item.name} value={item.value} />
                          )
                        })
                      }
                    </Picker>

                  </DenseCard>
                  {errors.stateName && <CommonText showText={errors.stateName} customstyles={{ color: colors.red }} fontSize={14} />}
                </View>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={'Proposed location'} fontSize={14} />
                  <View >
                    <View style={styles.centerView}>
                      <RadioBtn
                        value="Owned"
                        status={location === 'Owned' ? 'checked' : 'unchecked'}
                        onPress={() => setLocation('Owned')}

                      />
                      <CommonText showText={'Owned'} customstyles={{ marginRight: 10 }} />
                    </View>
                    <View style={styles.centerView}>
                      <RadioBtn
                        value="Rented"
                        status={location === 'Rented' ? 'checked' : 'unchecked'}
                        onPress={() => setLocation('Rented')}
                      />
                      <CommonText showText={'Rented'} customstyles={{ marginRight: 10 }} />
                    </View>

                  </View>
                  {locationError == '' && <CommonText showText={'locationError'} customstyles={{ color: colors.red }} fontSize={14} />}
                </View>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={'City of proposed location'} fontSize={14} />
                  <Textinput value={values.city} onChange={handleChange('city')} />
                  {errors.city && <CommonText showText={errors.city} customstyles={{ color: colors.red }} fontSize={14} />}
                </View>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={'Is property commercially approved?'} fontSize={14} />
                  <View >
                    <View style={styles.centerView}>
                      <RadioBtn
                        value="yes"
                        status={comercialApproved === 'yes' ? 'checked' : 'unchecked'}
                        onPress={() => setcomercialApproved('yes')}

                      />
                      <CommonText showText={'Yes'} customstyles={{ marginRight: 10 }} />
                    </View>
                    <View style={styles.centerView}>
                      <RadioBtn
                        value="Owned"
                        status={comercialApproved === 'no' ? 'checked' : 'unchecked'}
                        onPress={() => setcomercialApproved('no')}

                      />
                      <CommonText showText={'No'} customstyles={{ marginRight: 10 }} />
                    </View>

                  </View>
                  {/* <CommonText showText={'errors[e.value]'} customstyles={{ color: colors.red }} fontSize={14} /> */}
                </View>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={'Complete Address of proposed land along with landmark'} fontSize={14} />
                  <Textinput value={values.complete_address} onChange={handleChange('complete_address')} />
                  {errors.complete_address && <CommonText showText={errors.complete_address} customstyles={{ color: colors.red }} fontSize={14} />}
                </View>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={'Qualification'} fontSize={14} />
                  <View style={[{ flexWrap: 'wrap' }]}>
                    <View style={styles.centerView}>
                      <RadioBtn
                        value="higher"
                        status={qualification === 'higher' ? 'checked' : 'unchecked'}
                        onPress={() => setqualification('higher')}
                      />
                      <CommonText showText={'High School (10th)'} customstyles={{ marginRight: 10 }} />
                    </View>
                    <View style={styles.centerView}>
                      <RadioBtn
                        value="secondary"
                        status={qualification === 'secondary' ? 'checked' : 'unchecked'}
                        onPress={() => setqualification('secondary')}
                      />
                      <CommonText showText={'Sr. Secondary (12th)'} customstyles={{ marginRight: 10 }} />
                    </View>
                    <View style={styles.centerView}>
                      <RadioBtn
                        value="graduate"
                        status={qualification === 'graduate' ? 'checked' : 'unchecked'}
                        onPress={() => setqualification('graduate')}
                      />
                      <CommonText showText={'Graduate'} customstyles={{ marginRight: 10 }} />
                    </View>
                    <View style={styles.centerView}>
                      <RadioBtn
                        value="postGraduate"
                        status={qualification === 'postGraduate' ? 'checked' : 'unchecked'}
                        onPress={() => setqualification('postGraduate')}
                      />
                      <CommonText showText={'Post-graduate'} customstyles={{ marginRight: 10 }} />
                    </View>
                  </View>
                  {/* <CommonText showText={'errors[e.value]'} customstyles={{ color: colors.red }} fontSize={14} /> */}
                </View>
                <View>

                  <CommonText showText={"Occupation"} fontSize={14} />

                  <DenseCard>
                    <Picker
                      selectedValue={stateName}
                      onValueChange={(itemValue, itemIndex) => setStateName(itemValue)}
                      mode={'dropdown'}
                    >
                      <Picker.Item label={'Select Occupation'} value={''} />
                      {
                        [arrayData]?.map((item, index) => {
                          return (
                            <Picker.Item label={item.name} value={item.value} />
                          )
                        })
                      }
                    </Picker>

                  </DenseCard>
                  {/* <CommonText showText={'errors[e.value]'} customstyles={{ color: colors.red }} fontSize={14} /> */}
                </View>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={'Name of Existing Company, if business (Write NA if Not Applicable)'} fontSize={14} />
                  <Textinput value={values.existing_company} onChange={handleChange('existing_company')} />
                  {values.existing_company && <CommonText showText={values.existing_company} customstyles={{ color: colors.red }} fontSize={14} />}
                </View>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={'Please tell us your reason for taking up Fortum Charge & Drive India Franchise'} fontSize={14} />
                  <Textinput value={values.reason_for_taking} onChange={handleChange('reason_for_taking')} />
                  {values.reason_for_taking && <CommonText showText={values.reason_for_taking} customstyles={{ color: colors.red }} fontSize={14} />}
                </View>

                <View style={styles.textinputConatiner}>
                  <CommonText showText={'Range of investment'} fontSize={14} />
                  <View style={styles.centerView}>
                    <View style={[{ flexWrap: 'wrap' }]}>
                      <View style={styles.centerView}>
                        <RadioBtn
                          value="10lakh"
                          status={investment === '10lakh' ? 'checked' : 'unchecked'}
                          onPress={() => setinvestment('10lakh')}
                        />
                        <CommonText showText={'Less than 10 lakhs'} customstyles={{ marginRight: 10 }} />
                      </View>
                      <View style={styles.centerView}>
                        <RadioBtn
                          value="15lakh"
                          status={investment === '15lakh' ? 'checked' : 'unchecked'}
                          onPress={() => setinvestment('15lakh')}
                        />
                        <CommonText showText={'10 lakhs to 15 lakhs'} customstyles={{ marginRight: 10 }} />
                      </View>
                      <View style={styles.centerView}>
                        <RadioBtn
                          value="20lakh"
                          status={investment === '20lakh' ? 'checked' : 'unchecked'}
                          onPress={() => setinvestment('20lakh')}
                        />
                        <CommonText showText={'16 lakhs to 20 lakhs'} customstyles={{ marginRight: 10 }} />
                      </View>
                      <View style={styles.centerView}>
                        <RadioBtn
                          value="21lakh"
                          status={investment === '21lakh' ? 'checked' : 'unchecked'}
                          onPress={() => setinvestment('21lakh')}
                        />
                        <CommonText showText={'21 lakhs and above'} customstyles={{ marginRight: 10 }} />
                      </View>
                    </View>
                  </View>
                  {/* <CommonText showText={'errors[e.value]'} customstyles={{ color: colors.red }} fontSize={14} /> */}
                </View>
                <View style={styles.textinputConatiner}>
                  <CommonText showText={'Please let us know the time frame required by you to invest in this opportunity'} fontSize={14} />
                  <Textinput value={values.time_frame} onChange={handleChange('time_frame')} />
                  {values.time_frame && <CommonText showText={values.time_frame} customstyles={{ color: colors.red }} fontSize={14} />}
                </View>

                <View style={[styles.bottomText, { marginVertical: 15 }]}>
                  <Checkbox
                    color={colors.green}
                    status={isAcceptCheck ? 'checked' : 'unchecked'}
                    onPress={() => setIsAcceptCheck(!isAcceptCheck)}
                  />
                  <View style={{ flexWrap: 'nowrap', marginLeft: 10, width: scale(280) }}>

                    <CommonText fontSize={14} regular showText={'I accept to share my personal details ( as mentioned above) to be used by Fortum Charge & Drive India Pvt. Ltd'} />
                  </View>
                </View>

                <View style={[styles.bottomText, { marginVertical: 15 }]}>
                  <View style={{}}>
                    <Checkbox
                      color={colors.green}
                      status={isAcceptCheck2 ? 'checked' : 'unchecked'}
                      onPress={() => setIsAcceptCheck2(!isAcceptCheck2)}
                    />
                  </View>
                  <View style={{ flexWrap: 'nowrap', marginLeft: 10, width: scale(280) }}>
                    <CommonText fontSize={14} regular showText={'I wish to be contacted through above mentioned phone and email'} />
                  </View>
                </View>



                <View style={styles.btnConatiner}>
                  <View style={{ width: '100%' }}>
                    <Button onPress={handleSubmit} showText={'Submit'}  />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </CommonView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20
  },
  header: {
    flexDirection: 'row',

  },
  headerText: { alignItems: 'center', marginLeft: 70 },
  textinputConatiner: {
    marginVertical: 15
  },
  button: {
    marginVertical: 15
  },
  btnConatiner: { marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bottomText: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
    // flexWrap: 'wrap',
    // borderWidth: 1
  },
  centerView: { flexDirection: 'row', alignItems: 'center' },

})

export default JoinHandsWith
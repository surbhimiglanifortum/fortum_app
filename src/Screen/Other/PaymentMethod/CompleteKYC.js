import { View, StyleSheet, useColorScheme, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import colors from '../../../Utils/colors'
import CommonText from '../../../Component/Text/CommonText'
import Textinput from '../../../Component/Textinput/Textinput'
import Button from '../../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import Header from '../../../Component/Header/Header'
import routes from '../../../Utils/routes'
import { Checkbox } from 'react-native-paper'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { Picker } from '@react-native-community/picker'
import DenseCard from '../../../Component/Card/DenseCard'
import CommonView from '../../../Component/CommonView'
import moment from 'moment'
import { useSelector } from 'react-redux'
import SnackContext from '../../../Utils/context/SnackbarContext'
import { pinelabDocVerify, createPinelabWallet, createPinelabDigitalCard } from '../../../Services/Api'

const KYCLIST = [
    { value: 1, name: 'Passport' },
    { value: 2, name: 'Driving Licence' },
    { value: 3, name: 'Aadhaar Card' },
    { value: 4, name: "Voter's Identity Card" },
    { value: 5, name: "PAN Card" },
]

const CompleteKYC = ({ route }) => {
    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const navigation = useNavigation()
    const scheme = useColorScheme()

    const { setOpenCommonModal } = useContext(SnackContext);

    const [documentType, setDocumentType] = useState('')
    const [docNumber, setDocNumber] = useState('')
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [docDate, setDocDate] = useState('')
    const [isAcceptCheck, setIsAcceptCheck] = useState(false)
    const [isAcceptCheck2, setIsAcceptCheck2] = useState(false)

    const [docTypeError, setDocTypeError] = useState('')
    const [docNumberError, setDocNumberError] = useState('')
    const [nameError, setNameError] = useState('')
    const [dobError, setDobError] = useState('')
    const [docIssueError, setDocIssueError] = useState('')
    const [isAcceptCheckError, setIsAcceptCheckError] = useState('')
    const [isAcceptCheck2Error, setIsAcceptCheck2Error] = useState('')
    const [loadingSign, setLoadingSign] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [docDatePickerVisible, setDocDatePickerVisibility] = useState(false);
    const [dobTech, setDobTech] = useState('')
    const [docDateTech, setDocDateTech] = useState('')

    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const handleConfirm = (date) => {
        let dob = moment(date).format('LL')
        setDob(dob)
        let month = String(new Date(dob).getMonth() + 1)
        let day = String(new Date(dob).getDate())
        if (month.length <= 1)
            month = '0' + month
        if (day.length <= 1)
            day = '0' + day
        let fullDob = `${new Date(dob).getFullYear()}-${month}-${day}`
        setDobTech(fullDob)
        hideDatePicker();
    };

    const docShowDatePicker = () => {
        setDocDatePickerVisibility(!docDatePickerVisible);
    };

    const docHideDatePicker = () => {
        setDocDatePickerVisibility(!docDatePickerVisible);
    };

    const docHandleConfirm = (date) => {
        let docDate = moment(date).format('LL')
        setDocDate(docDate)
        let month = String(new Date(docDate).getMonth() + 1)
        let day = String(new Date(docDate).getDate())
        if (month.length <= 1)
            month = '0' + month
        if (day.length <= 1)
            day = '0' + day
        let fullDocDate = `${new Date(docDate).getFullYear()}-${month}-${day}`
        setDocDateTech(fullDocDate)
        docHideDatePicker();
    };

    const onDocumentVerify = async () => {
        if (documentType == "") {
            setDocTypeError('Please select a document type.')
            return
        } else {
            setDocTypeError('')
        }
        if (docNumber == "") {
            setDocNumberError('Please enter document number.')
            return
        } else {
            setDocNumberError('')
        }
        if (name == "") {
            setNameError('Please enter name.')
            return
        } else {
            setNameError('')
        }
        if (dob == "") {
            setDobError('Please select date of birth.')
            return
        } else {
            setDobError('')
        }
        if (docDateTech == "") {
            setDocIssueError('Please select document issue date.')
            return
        } else {
            setDocIssueError('')
        }

        if (isAcceptCheck == false) {
            setIsAcceptCheckError('Please accept the terms and conditions.')
            // return
        } else {
            setIsAcceptCheckError('')
        }

        if (isAcceptCheck2 == false) {
            setIsAcceptCheck2Error('Please accept the terms and conditions.')
            return
        } else {
            setIsAcceptCheck2Error('')
        }

        const payload = {
            username: mUserDetails?.username,
            documentType: documentType,
            nameOnDocument: name,
            documentNumber: docNumber,
            dateOfBirth: dobTech,
            issueDate: docDateTech
        }

        console.log("ALL WELL", payload)

        try {
            setLoadingSign(true)
            const result = await pinelabDocVerify(payload)
            console.log("DOc Verify API Result", result.data)
            if (result.data.success) {
                pineLabWalletCreate()
            }
            else {
                setOpenCommonModal({
                    isVisible: true, message: result.data.message.responseMessage, onOkPress: () => {
                        console.log("OKPressed")
                    }
                })
            }
            setLoadingSign(false)
        } catch (error) {
            console.log("DOc Verify API error", error)
            setLoadingSign(false)
        }
    }

    const pineLabWalletCreate = async (payload) => {
        try {
            const payload = {
                FirstName: route.params?.fName,
                LastName: route.params?.lName,
                Mobile: mUserDetails?.phone_number,
                Email: mUserDetails?.username
            }
            const result = await createPinelabWallet(payload)
            console.log('Result of Create Wallet', result.data)
            if (result.data.success) {
                createDigitalCard()
                navigation.navigate(routes.FortumChargeAndDriveCard, {
                    response: result.data.redsponse,
                    name: route.params?.fName
                })
            }
            if (!result.data.success) {
                setOpenCommonModal({
                    isVisible: true, message: result.data?.message, onOkPress: () => {
                        console.log("OKPressed")
                    }
                })
            }
        } catch (error) {
            console.log('Error of Create Wallet', error)
        }
    }

    const createDigitalCard = async () => {
        try {
            const payload = {
                username: mUserDetails?.username
            }
            const result = await createPinelabDigitalCard(payload)
            console.log('Response of Create Digital Card', result.data)
        } catch (error) {
            console.log("Error of Create Digital Card", error)
        }
    }

    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault()
            Alert.alert(
                'Discard changes?',
                'Do you really want to quit process ?',
                [
                    { text: "Cancel", style: 'cancel', onPress: () => { } },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(e.data.action)
                    },
                ]
            );
        }),
        [navigation]
    );

    return (
        <CommonView >
            <ScrollView>

                <Header showText={'Complete KYC'} />

                <View style={styles.topText}>
                    <CommonText showText={'As per RBI guidelines, it is mandatory to obtain minimum details of all cardholder/ consumers'} regular fontSize={14} />
                </View>

                <View style={{ marginTop: 25 }}>
                    <CommonText showText={'Document Type'} regular fontSize={14} />
                    <DenseCard>
                        <Picker
                            selectedValue={documentType}
                            onValueChange={(itemValue, itemIndex) => setDocumentType(itemValue)}
                            mode={'dropdown'}
                        >
                            <Picker.Item label={'Select Document Type'} value={''} />
                            {
                                KYCLIST.map((item, index) => {
                                    return (
                                        <Picker.Item label={item.name} value={item.value} />
                                    )
                                })
                            }
                        </Picker>
                    </DenseCard>
                    {docTypeError !== '' &&
                        <CommonText customstyles={styles.errorText} showText={docTypeError} regular fontSize={12} />
                    }
                </View>

                <View>
                    <CommonText showText={'Document Number'} regular fontSize={14} />
                    <Textinput value={docNumber} onChange={setDocNumber} />
                    {docNumberError !== '' &&
                        <CommonText customstyles={styles.errorText} showText={docNumberError} regular fontSize={12} />
                    }
                </View>

                <View>
                    <CommonText showText={'Name on Document'} regular fontSize={14} />
                    <Textinput value={name} onChange={setName} />
                    {nameError !== '' &&
                        <CommonText customstyles={styles.errorText} showText={nameError} regular fontSize={12} />
                    }
                </View>

                <TouchableOpacity onPress={showDatePicker}>
                    <CommonText showText={'Date of Birth'} regular fontSize={14} />
                    <Textinput value={dob} editable={false} />
                    {dobError !== '' &&
                        <CommonText customstyles={styles.errorText} showText={dobError} regular fontSize={12} />
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => docShowDatePicker(true)}>
                    <CommonText showText={'Document Issue Date'} regular fontSize={14} />
                    <Textinput value={docDate} editable={false} />
                    {docIssueError !== '' &&
                        <CommonText customstyles={styles.errorText} showText={docIssueError} regular fontSize={12} />
                    }
                </TouchableOpacity>

                <View style={styles.bottomText}>
                    <Checkbox
                        color={colors.green}
                        status={isAcceptCheck ? 'checked' : 'unchecked'}
                        onPress={() => setIsAcceptCheck(!isAcceptCheck)}
                    />
                    <CommonText fontSize={14} regular>{'I accept the'} <CommonText fontSize={14} regular onPress={() => { Linking.openURL('https://www.google.com/') }} customstyles={styles.linkText} >{'Terms Of Services'}</CommonText></CommonText>
                </View>

                {isAcceptCheckError !== '' &&
                    <CommonText customstyles={styles.errorText} showText={isAcceptCheckError} regular fontSize={12} />
                }

                <View style={styles.bottomText}>

                    <Checkbox
                        color={colors.green}
                        status={isAcceptCheck2 ? 'checked' : 'unchecked'}
                        onPress={() => setIsAcceptCheck2(!isAcceptCheck2)}
                    />

                    <CommonText fontSize={14} regular customstyles={{ flex: 1 }}>{'I acknowledge that '}
                        <CommonText fontSize={14} regular onPress={() => { Linking.openURL('https://www.google.com/') }} customstyles={styles.linkText} >{'Terms of Services,'}</CommonText>
                        <CommonText showText={' '} />
                        <CommonText fontSize={14} regular onPress={() => { Linking.openURL('https://www.google.com/') }} customstyles={styles.linkText} >{'Privacy Policy, '}</CommonText>
                        <CommonText fontSize={14} regular showText={'and our default '} />
                        <CommonText fontSize={14} regular onPress={() => { Linking.openURL('https://www.google.com/') }} customstyles={styles.linkText} >{'Notification Settings.'}</CommonText>
                    </CommonText>
                </View>

                {isAcceptCheck2Error !== '' &&
                    <CommonText customstyles={styles.errorText} showText={isAcceptCheck2Error} regular fontSize={12} />
                }
            </ScrollView>

            <Button showText={'Compelete to KYC'} onPress={onDocumentVerify} />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
            />

            <DateTimePickerModal
                isVisible={docDatePickerVisible}
                mode="date"
                onConfirm={docHandleConfirm}
                onCancel={docHideDatePicker}
                maximumDate={new Date()}
            />

        </CommonView>
    )
}

const styles = StyleSheet.create({
    bottomText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    topText: {
        marginTop: 15
    },
    linkText: {
        color: colors.blue,
        textDecorationLine: 'underline'
    },
    errorText: {
        color: colors.red
    }
})


export default CompleteKYC
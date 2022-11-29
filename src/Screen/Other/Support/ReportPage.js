import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import CommonView from '../../../Component/CommonView'
import Header from '../../../Component/Header/Header'
import CommonText from '../../../Component/Text/CommonText'
import Textinput from '../../../Component/Textinput/Textinput'
import Button from '../../../Component/Button/Button'
import { useSelector } from 'react-redux'
import { reportIssue } from '../../../Services/Api'
import colors from '../../../Utils/colors'
import SnackContext from '../../../Utils/context/SnackbarContext'
import { useNavigation } from '@react-navigation/native'

const ReportPage = ({ route }) => {
    let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
    const locDetails = route.params?.locDetails

    const [report, setReport] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState(false)

    const { setOpenCommonModal } = useContext(SnackContext)
    const navigation = useNavigation()

    const submitReport = async () => {
        if (report.value == '') {
            setReport({ value: '', error: "Please enter report." })
            return
        }
        setLoading(true)
        const payload = {
            usename: mUserDetails?.usename,
            report: report.value,
            location: locDetails?.name
        }
        try {
            const result = await reportIssue(payload)
            if (result?.data?.result == 'ok') {
                setOpenCommonModal({
                    isVisible: true, message: "Reported Successfully.",
                    onOkPress: () => { navigation.goBack() }
                })
            }
            setLoading(false)
        } catch (error) {
            console.log("Error in report submission", error)
            setLoading(false)
        }
    }

    return (
        <CommonView>
            <Header showText={'Report'} />
            <View style={{ flex: 1 }}>
                <CommonText showText={'Report an Issue'} customstyles={{ marginVertical: 30 }} />
                <Textinput
                    customStyles={{ height: 200 }}
                    placeholder={'Report'}
                    value={report.value}
                    onChange={(text) => setReport({ value: text, error: '' })}
                    multiline={true}
                    numberOfLines={10}
                />
                {!report.error == '' && <CommonText showText={report.error} customstyles={{ color: colors.red }} regular fontSize={14} />}
            </View>
            <Button showText={'Submit'} onPress={submitReport} onLoading={loading} />
        </CommonView>
    )
}

const styles = StyleSheet.create({

})

export default ReportPage
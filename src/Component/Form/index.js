import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import CommonText from '../Text/CommonText'
import Textinput from '../Textinput/Textinput'
import Button from '../Button/Button'
export default function index({ lazy_array, initialValues={}, onSubmit=()=>{}, schema={} }) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors, touched }) => (
                <>
                    {lazy_array.map((e, i) => {
                        return (
                            <View key={i} style={styles.textinputConatiner}>
                                 <CommonText showText={e.name} fontSize={14} />
                                <Textinput value={values[e.value]} onChange={handleChange(e.value)} />
                                {errors[e.value] && touched[e.value] ? (
                                    <CommonText showText={errors[e.value]} customstyles={{ color: colors.red }} fontSize={14} />
                                ) : null}
                            </View>
                        )
                    })}
                    <View style={styles.btnConatiner}>
                        <Button onPress={handleSubmit} showText={'SignUp'} onLoading={isSubmitting} />
                    </View>
                </>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    textinputConatiner: {
        marginVertical: 15
    }

})
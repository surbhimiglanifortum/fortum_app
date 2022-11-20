import { View, SafeAreaView, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Header from '../../../Component/Header/Header'
import colors from '../../../Utils/colors'
import CommonText from '../../../Component/Text/CommonText'
import Charger1 from '../../../assests/svg/charger1'
import IconCardWithoutBg from '../../../Component/Card/IconCardWithoutBg'
import IconCard from '../../../Component/Card/IconCard'
import Button from '../../../Component/Button/Button'
import { useNavigation } from '@react-navigation/native'
import routes from '../../../Utils/routes'
import { getChargerMapObject } from '../../../Utils/HelperCommonFunctions'
import Report from "../../../assests/svg/Report"
import CommonCard from "../../../Component/Card/CommonCard"
import SupportSvg from '../../../assests/svg/SupportSvg'
import DenseCard from "../../../Component/Card/DenseCard"
import SelectPaymentMode from '../../../Component/MajorComponents/SelectPaymentMode'
import { useSelector } from 'react-redux'
import appconfig from '../../../Utils/appconfig'
import axios from "axios"
import { GetCouterTime } from '../../../Utils/utils'
import PayAsUGoModal from '../../../Component/Modal/PayAsUGoModal'
import { refundCloseLoopWallet, refundPayAsUGo } from '../../../Services/Api'
import CommonView from '../../../Component/CommonView'
import SnackContext from '../../../Utils/context/SnackbarContext'
import CommonIconCard from '../../../Component/Card/CommonIconCard/CommonIconCard'

var mStoppedPressed = false;
let sessionId = ''

const OngoingDetails = ({ route }) => {

  let mUserDetails = useSelector((state) => state.userTypeReducer.userDetails);
  const username = mUserDetails?.username

  console.log("Check Params", route?.params?.CardPin)

  const navigation = useNavigation()
  const scheme = useColorScheme()

  var counterinterval;

  const [paymentMethod, setPaymentMethod] = useState(route?.params?.paymentMethod)
  const [msg, setMsg] = useState('')
  const [goodToGo, setGoodToGo] = useState(false)
  const [isShow, setShow] = useState(true)
  const [payAsYouGoOrderId, setPayAsYouGoOrderId] = useState(route?.params?.payAsYouGoOrderId)
  const [unpaid, setUnpaid] = useState([])
  const [unpaidVisible, setUnpaidVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [chargerText, setChargerText] = useState("Start")
  const [chargerState, setChargerState] = useState("STOP")
  const [isSessionActive, setSessionActive] = useState(false)
  const [stopColor, setStopColor] = useState(null)
  const [disableButton, setButtonDisable] = useState(false)
  const [optionOpt, setOptionOpt] = useState('')
  const [chargeTime, setChargeTime] = useState("")
  const [loadingRefund, setLoadingRefund] = useState(false)
  const [loadingWallet, setLoadingWallet] = useState(false)
  const [showRestart, setShowRestart] = useState(false)
  const [chargingCost, setChargingCost] = useState('')
  const [remainingCost, setRemainingCost] = useState('')
  const [chargeSessionID, setChargeSessionID] = useState('')
  const [isChargerStart, setChargerStart] = useState(false)
  const [stopPressed, setStopPressed] = useState(false)
  const [payAsYouGoOrderStatus, setPayAsYouGoOrderStatus] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  let pollsessnioCalls = 0
  const stopButtonHandler = () => {
    navigation.navigate(routes.taxInvoice)
  }

  const { setOpenCommonModal, setShowFeedbackModel } = useContext(SnackContext);

  const locDetails = route?.params?.locDetails
  const evDetails = route.params?.evDetails
  console.log("ONGPOIN", evDetails, locDetails)
  let lastPaidSession = {}

  // const checkIfUnpaid = () => {
  //   axios.get(appconfig.TOTAL_BASE_URL + '/api_app/sessions/allunpaid/' + username + '?app_version=' + appconfig.APP_VERSION_NUMBER).then((res) => {
  //     console.log("Check If Unpaid From Charging Start Page", res.data)
  //     if (res.data != undefined && res.data !== [] && res?.data.length > 0) {
  //       setUnpaid(res.data)
  //       setUnpaidVisible(true)
  //     }
  //   }).catch((err) => console.log("Check If Unpaid From Charging Start Page Error", err))
  // }

  const fetchLastSession = async () => {
    setRefreshing(true)
    const response = await axios.get(appconfig.BASE_URL + "/api_app/sessions/allactive/" + username);
    setRefreshing(false)
    response.data.forEach((item, index) => {
      if (!item) {
        return;
      }
      // console.log(item.location.evses[0].connectors)
      const activeConnectors = item.location.evses[0].connectors
      activeConnectors.map(i => {
        if (i.id === evDetails?.uid) {
          // setChargeSessionID(response.data[1].auth_id)  
          pollSessions(item.auth_id, 0, 0, 0)
          setChargerText('STOP')
          setChargerState('CHARGING')
          setShow(false)
          setSessionActive(true)
          setStopColor(colors.blue)

          // axios.post(appconfig.TOTAL_BASE_URL + '/api_app/sessions/last', { username }).then(res => {
          //   if (res.data[0].payments[0].payment_method === 'CLOSED_WALLET') {
          //     setOptionOpt('Prepaid Wallet')
          //   } else if (res.data[0].payments[0].payment_method === 'PAY_AS_U_GO') {
          //     setOptionOpt('Pay As You Go')
          //   } else if (res.data[0].payments[0].payment_method === 'PREPAID_CARD') {
          //     setOptionOpt('Prepaid Card')
          //   }
          // }).catch(err => {
          //   console.log("Error From Last Session API", err)
          // })
          if (item.auth_id.startsWith("fleet") || item.auth_id.startsWith("token_")) {
            setButtonDisable(false)
          }
          counterinterval = setInterval(() => {
            setChargeTime(GetCouterTime(item.start_datetime))
          }, 1000);
        }
        else {
          setChargerText('START')
          setChargerState('STOP')
          setSessionActive(false)
        }
      })

      // checking if active session is not more than 24 hours
      if (new Date() - new Date(item.start_datetime) > 86400000) {
        const activeConnectors = item.location.evses[0].connectors
        activeConnectors.map(i => {
          if (i.id === evDetails?.uid) {
            pollSessions(item.auth_id, 0, 0, 0)
            setChargerText('STOP')
            setChargerState('CHARGING')
            setSessionActive(true)
            setStopColor(colors.blue)
            if (item.auth_id.startsWith("fleet") || item.auth_id.startsWith("token_")) {
              setButtonDisable(false)
            }
          }
          else {
            setChargerText('START')
            setChargerState('STOP')
            setSessionActive(false)
          }
        })
      }
    })
  }

  useEffect(() => {
    //  checkIfUnpaid()
    if (evDetails?.status === "CHARGING") {
      fetchLastSession()
    }
    return () => {
      try {
        clearInterval(counterinterval)
      } catch (error) { }
    }
  }, [])

  const pollSessions = (authID, contSucc, active, failcounter) => {
    console.log("Poll seessions count", pollsessnioCalls)
    pollsessnioCalls = pollsessnioCalls + 1
    if (contSucc > 3) {
      setChargerText("Start")
      setChargerState("STOP")

      try {
        clearInterval(counterinterval)
      } catch (error) {
        console.log("Error in PollSession", error)
      }
      setRefreshing(true)
      console.log('Session Id Check Here', sessionId)
      setRefreshing(true)
      console.log("Check Payment Method in Poll Session", paymentMethod)
      // amountDeductionProcess(paymentMethod)


      axios.get(appconfig.TOTAL_BASE_URL + '/api_app/sessions/allunpaid/' + username + '?app_version=' + appconfig.APP_VERSION_NUMBER).then((r) => {
        axios.get(appconfig.TOTAL_BASE_URL + '/api_app/sessions/showRefundDialog/' + sessionId + '/' + username).then(res => {
          console.log("Response Restart API", res.data.data)
          if (res.data.success) {
            setChargingCost(res.data.data.chargingCost / 100)
            setRemainingCost(res.data.data.remainingAmount / 100)
            setShowRestart(true)
            setRefreshing(false)
          } else {
            // setIsVisible(true)
            setShowFeedbackModel({ "isVisible": true, "locid": locDetails?.id, "evseid": evDetails?.uid })
            navigation.reset({
              index: 0,
              routes: [{ name: routes.dashboard }],
            });
            // setOpenCommonModal({
            //   isVisible: true,
            //   message: 'Charging Completed. Are You Ready To Drive ?',
            //   showBtnText: 'Yes',
            //   onOkPress: () => {
            //     navigation.navigate(routes.dashboard)
            //     console.log("Charging Completed")
            //   }
            // })
            setRefreshing(false)
          }
        }).catch(error => {
          console.log("Error Restart API", error)
          setRefreshing(false)
        })
      }).catch(error => {
        console.log("All Unpaid API Catch", error)
        setRefreshing(false)
      })
      return
    }

    console.log('counternumber1 1 :' + contSucc + " " + active + " " + failcounter + " " + contSucc)

    if (contSucc == 0 && active == 0 && failcounter > 4) {
      active = 1;
      console.log('counternumber1 2 :' + contSucc + " " + active + " " + failcounter + " " + contSucc)
    }
    let data = {
      auth_id: authID
    }

    axios.post(appconfig.BASE_URL + "/api_app/sessions/", data).then((r) => {
      console.log("Check Auth Id", data)
      console.log("2 Response of session Api", r.data)
      console.log(r.data)
      console.log('Stop pressed', mStoppedPressed)
      console.log('r2.data.status', r.data.status + " " + chargerState)
      if (r.data.status === 'COMPLETED' && active == 1) {
        setChargeSessionID("")
        // setChargerText("Start")
        console.log("CHARGING COMPLETED!!")
        sessionId = r.data.id
        // setTimeout(()=>pollSessions(authID),2000)
        lastPaidSession = r.data
        setTimeout(() => pollSessions(authID, contSucc + 1, active, 0), 1500)
        mStoppedPressed = false;
        // pollSessions(authID,contSucc+1)
        return
      } else if (r.data.status === 'ACTIVE') {
        setChargerState("CHARGING")
        console.log("ACTIVE COMMAND")
        active = 1;
        failcounter = 0;
        setChargeSessionID(r.data.id)
        sessionId = r.data.id
        if (!mStoppedPressed) {
          //** */
          // setChargerText('STOP')
          // setChargerState('CHARGING')
          setChargerText("Stop")
          try {
            counterinterval = setInterval(() => {
              setChargeTime(GetCouterTime(r.data.start_datetime))
            }, 1000);
          } catch (error) {
            console.log("Error After Charging", error)
          }
        }
      } else {
        console.log(r.data.status + "!!!")
      }
      setTimeout(() => pollSessions(authID, contSucc, active, failcounter + 1), 2000)
    }).catch(err => {
      console.log(err)
    })
  }

  const commandsCall = (uid, tr) => {
    if (tr > 30) {
      setChargerState("STOP")
      setChargerText("Failed")
      return
    }
    let data = {
      uid: uid + ""
    }
    console.log("Check Command Auth", data)
    axios.post(appconfig.BASE_URL + "/api_app/commands/", data).then((r) => {
      console.log("commandsCall")
      console.log(r.data.result)
      if (r.data.result === 'ACCEPTED') {
        console.log("ACCEPTED!!! COMMAND!")
        pollSessions(r.data.token.auth_id, 0, 0, 0)
      } else {
        console.log(r.data)
        setTimeout(() => commandsCall(uid, tr + 1), 3000)
        console.log("REJECTED COMMAND")
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const startChargerCallWithToken = () => {
    setChargerState("STARTING")
    setChargerText("Starting...")
    console.log("Start PRessed")
    axios.get(appconfig.BASE_URL + "/api_app/charging_keys/ids/" + username).then(resp => {
      console.log("/charging_keys/ids/", resp.data)
      let vtoken = {}
      let vtoken_id = ''
      resp.data.forEach((item, index) => {
        console.log("my item", item.auth_id)
        if (item.auth_id.startsWith("token_") || item.auth_id.startsWith("fleet")) {
          vtoken_id = item
          console.log(vtoken_id)
          axios.get(appconfig.BASE_URL + "/api_app/tokens/" + vtoken_id.auth_id).then(token => {
            vtoken = token.data
            let data = {}
            if (paymentMethod === 'CLOSED_WALLET') {
              data = {
                token: vtoken,
                location_id: locDetails?.id,
                evse_uid: evDetails?.uid,
                payment_method: paymentMethod,
              }
            } if (paymentMethod === 'PAY_AS_U_GO') {
              data = {
                token: vtoken,
                location_id: locDetails?.id,
                evse_uid: evDetails?.uid,
                payment_method: paymentMethod,
                order_id: payAsYouGoOrderId,
              }
            } if (paymentMethod === 'PREPAID_CARD') {
              data = {
                token: vtoken,
                location_id: locDetails?.id,
                evse_uid: evDetails?.uid,
                payment_method: paymentMethod,
                CardPin: route?.params?.CardPin,
                minimum_balance: evDetails?.connectors[0]?.pricing?.min_balance
              }
            }
            // data = {
            //   token: vtoken,
            //   location_id: locDetails?.id,
            //   evse_uid: evDetails?.uid,
            //   payment_method: paymentMethod,
            //   order_id: payAsYouGoOrderId,
            //   cardPin: route?.params?.CardPin
            // }
            // if (payAsYouGoOrderId === '' || paymentMethod === 'PREPAID_CARD') {
            //   delete data.order_id
            // }
            // if (paymentMethod === 'CLOSED_WALLET' || paymentMethod === 'PAY_AS_U_GO') {
            //   delete data.cardPin
            // }
            console.log("PUSH TO SERVER", data)
            axios.put(appconfig.TOTAL_BASE_URL + "/ocpi/emsp/2.1.1/commands/START_SESSION", data).then((r) => {

              console.log("commands/START_SESSION response")
              console.log(r.data)

              if (Array.isArray(r.data) && r.data.length > 0 && r.data[0].amount) {
                //existing bill
                setChargerState("STOP")
                setChargerText("Start")
                setOpenCommonModal({
                  isVisible: true, message: `You have existing bill, Please fill it first before charging`,
                  onOkPress: () => {
                    axios.get(appconfig.BASE_URL + "/api_app/sessions/initiateJuspay/" + mUserDetails?.username + "/" + r.data[0].session_id).then((result) => {
                      if (result.data.success) {
                        navigation.navigate(routes.PaymentScreenJuspay, {
                          amount: 0,
                          email_address: '',
                          orderid: '',
                          mobile_number: '',
                          description: 'EV Charge Invoice',
                          callback_url: '',
                          juspay_process_payload: result.data.data.juspay_payload
                        })
                      } else {
                        // manage exxception
                      }
                    }).catch((e) => {
                      console.log("error", e)
                    })
                  }
                })
                console.log("initiateJuspayr.data", r.data)
                return
              }
              if (r.data?.data?.data?.result === 'ACCEPTED') {
                console.log("ACCEPTED!!!", r.data)
                commandsCall(r.data.uid, 0)
                setChargerStart(true)
                setShow(false)
              } else {
                console.log("REJECTED")
              }
            }).catch(err => {
              console.log("start session error", err)
              setChargerState("STOP")
              setChargerText("Failed")
            })
          })
        }
      })

    }).catch(err => { console.log(err) })
  }

  const stopChargeSession = (id) => {
    mStoppedPressed = true;
    setChargerState("STOPPING")
    setChargerText("Stopping...")
    setStopPressed(true)
    console.log("Stopping called")
    let data = {
      "session_id": id
    }
    console.log(data)
    axios.put(appconfig.TOTAL_BASE_URL + "/ocpi/emsp/2.1.1/commands/STOP_SESSION", data).then((r) => {
      // console.log(r.data.data.data.result)
      if (r.data.data.data.result === 'ACCEPTED') {
        console.log("ACCEPTED!!!", r.data.uid)
        // commandsCall(r.data.uid,0)
      } else {
        console.log("REJECTED")
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const startChargerFlow = () => {
    console.log("pressed")
    startChargerCallWithToken()
  }

  if (route.params?.started) {
    useEffect(() => {
      pollSessions(route.params.auth_id, 0, 0, 0)
    }, [])
  }

  const getButtonColor = (status) => {
    if (chargerText == 'STOP' || chargerText == 'Stop' || chargerText == 'Stopping...') {
      return colors.blue;
    }
    if (((evDetails?.status === "AVAILABLE" || route.params?.started == true || isSessionActive == true) && (evDetails?.connectors[0]?.pricing?.min_balance == 0 || evDetails?.connectors[0]?.pricing?.min_balance == undefined)) || (evDetails?.status === "AVAILABLE" || route.params?.started == true || isSessionActive == true) && (payAsYouGoOrderStatus == 'CHARGED' || goodToGo)) {
      return null;
    } else {
      return colors.grey
    }
  }

  const orderStatus = (data) => {
    console.log("LOGS DATA FROM CHILD", data);
    setPayAsYouGoOrderStatus(data)
    if (data === "CHARGED") {
      setShow(false)
      setMsg("You are ready to charge.")
    }
  }

  const initiateRefund = async (sessionId) => {
    setLoadingRefund(true)
    try {
      const result = await refundPayAsUGo(username, sessionId)
      console.log("Result initiateRefund", result.data)
      setShowRestart(false)
      setSnack({ message: result.data.message, open: true, color: 'error' })
      navigation.reset({
        index: 0,
        routes: [{ name: 'MapStack' }],
      });
      setLoadingRefund(false)
    } catch (error) {
      console.log("Result initiateRefund error", error)
      setLoadingRefund(false)
    }
  }

  const initiateWalletRefund = async (sessionId) => {
    setLoadingWallet(true)
    try {
      const result = await refundCloseLoopWallet(username, sessionId)
      console.log("Result initiateWalletRefund", result.data)
      setShowRestart(false)
      setSnack({ message: result.data.message, open: true, color: 'error' })
      navigation.reset({
        index: 0,
        routes: [{ name: 'MapStack' }],
      });
      setLoadingWallet(false)
    } catch (error) {
      console.log("Result initiateWalletRefund Catch", error)
      setLoadingWallet(false)
    }
  }


  return (
    <CommonView>
      <Header showText={'Charging'} />
      <ScrollView>
        <View style={styles.textCon}>
          <CommonText showText={locDetails?.name} customstyles={{ marginBottom: 7 }} regular fontSize={14} />
          <CommonText showText={`${locDetails?.address?.city} ${locDetails?.address?.street} ${locDetails?.address?.postalCode}`} bold />
        </View>

        <DenseCard>
          <View style={styles.topCard}>
            <Charger1 height={40} width={40} />
            <View>
              <CommonText
                showText={getChargerMapObject(evDetails?.connectors[0]?.standard)?.name + ' - ' + (evDetails?.connectors[0]?.amperage * evDetails?.connectors[0]?.voltage / 1000)?.toFixed(2) + 'kW'}
                fontSize={15}
                customstyles={{ marginLeft: 10 }}
                bold
              />
              {evDetails?.connectors[0]?.pricing?.price && <CommonText
                showText={'₹ ' + parseFloat(evDetails?.connectors[0]?.pricing?.price).toFixed(2) + ' / ' + (evDetails?.connectors[0]?.pricing?.type === "TIME" ? "min" : evDetails?.connectors[0]?.pricing?.type === "FLAT" ? "flat" : "kWh+GST")}
                fontSize={15}
                customstyles={{ marginLeft: 10, marginTop: 5 }}
                regular
              />}
            </View>
          </View>
        </DenseCard>

        {/* <DenseCard>
            <SelectPaymentMode
              min_balance={evDetails?.connectors[0]?.pricing?.min_balance}
              addMoneyPress={() => navigation.navigate(routes.RechargeWallet, {
                routeDirection: "SelectPaymentMode",
                minBalance: evDetails?.connectors[0]?.pricing?.min_balance,
                gstState: mUserDetails?.defaultState
              })}
              setPaymentMethod={setPaymentMethod}
              setMsg={setMsg}
              setGoodToGo={setGoodToGo}
              evsesUid={evDetails?.uid}
              isShow={isShow}
              setPayAsYouGoOrderId={setPayAsYouGoOrderId}
              orderStatus={orderStatus}
            />

            {
              msg != '' &&
              <CommonText showText={msg} regular fontSize={13} customstyles={{ color: colors.red, textAlign: 'center', paddingHorizontal: 10 }} />
            }
          </DenseCard> */}


        {/* chargeTime != '' && (chargerText == 'STOP' || chargerText == 'Stop' || chargerText == 'Stopping...') ? */}

        <DenseCard>
          <View style={styles.middleCard}>
            <View style={styles.middleInner}>
              <CommonText showText={'Time'} fontSize={18} />
            </View>
            <View style={styles.timeContainer}>
              <View>
                <DenseCard>
                  <CommonText showText={chargeTime != '' && (chargerText == 'STOP' || chargerText == 'Stop' || chargerText == 'Stopping...') ? chargeTime?.hours : '00'} customstyles={{ textAlign: 'center' }} />
                </DenseCard>
                <CommonText showText={'  Hours'} />
              </View>
              <CommonText showText={':'} customstyles={{ marginTop: -25 }} fontSize={18} />
              <View>
                <DenseCard>
                  <CommonText showText={chargeTime != '' && (chargerText == 'STOP' || chargerText == 'Stop' || chargerText == 'Stopping...') ? chargeTime?.minutes : '00'} customstyles={{ textAlign: 'center' }} />
                </DenseCard>
                <CommonText showText={' Minutes'} />
              </View>
              <View>
                <CommonText showText={':'} customstyles={{ marginTop: -25 }} fontSize={18} />
              </View>
              <View>
                <DenseCard>
                  <CommonText
                    showText={chargeTime != '' && (chargerText == 'STOP' || chargerText == 'Stop' || chargerText == 'Stopping...') ? chargeTime?.seconds : '00'}
                    customstyles={{ textAlign: 'center' }}
                  />
                </DenseCard>
                <CommonText showText={' Seconds'} />
              </View>
            </View>
          </View>
        </DenseCard>

        <PayAsUGoModal
          modalVisible={showRestart}
          bgStyle={'rgba(0,0,0,0.5)'}
          chargingCost={chargingCost}
          remainingCost={remainingCost}
          loadingRefund={loadingRefund}
          loadingWallet={loadingWallet}
          cancelClick={() => {
            console.log("cancelClick")
            setShowRestart(!showRestart)
          }}
          onRestartClick={() => {
            setShowRestart(!showRestart)
            navigation.goBack()
          }}
          onRefundClick={() => {
            console.log("Refund Click", sessionId)
            initiateRefund(sessionId)
            navigation.goBack()
          }}
          onWalletClick={() => {
            console.log("Refund In Wallet Click", sessionId)
            initiateWalletRefund(sessionId)
            navigation.goBack()
          }}
        />

        <CommonCard>
          <TouchableOpacity style={styles.topCard}>
            <CommonIconCard Svg={Report} />
            <CommonText showText={'Report'} customstyles={{ color: colors.lightRed, alignSelf: 'center', marginLeft: 10 }} />
          </TouchableOpacity>
        </CommonCard >

        <CommonCard>
          <TouchableOpacity style={styles.topCard} onPress={() => navigation.navigate(routes.Support)}>
            <CommonIconCard Svg={SupportSvg} />
            <CommonText showText={'Support'} customstyles={{ alignSelf: 'center', marginLeft: 10 }} />
          </TouchableOpacity>
        </CommonCard>
      </ScrollView>

      <View style={styles.bottomButon}>
        <Button showText={chargerText}
          onPress={() => {
            console.log('my state', chargerState)
            if (chargerState === "STOP") {
              startChargerFlow()
            } else if (chargerState === 'CHARGING') {
              console.log("chargeSessionID")
              console.log(chargeSessionID)
              stopChargeSession(chargeSessionID)
            } else if (isSessionActive == true && chargerState === 'CHARGING') {
              console.log("chargeSessionID")
              console.log(chargeSessionID)
              stopChargeSession(chargeSessionID)
            }
          }}
          disable={chargerText == 'Stop' || ((evDetails?.status === "AVAILABLE" || route.params?.started == true || isSessionActive == true) && (evDetails?.connectors[0]?.pricing?.min_balance == 0 || evDetails?.connectors[0]?.pricing?.min_balance == undefined)) || ((evDetails?.status === "AVAILABLE" || route.params?.started == true || isSessionActive == true || evDetails?.connectors[0]?.pricing?.min_balance == 0 || evDetails?.connectors[0]?.pricing?.min_balance == undefined) && (payAsYouGoOrderStatus === "CHARGED" && paymentMethod === 'PAY_AS_U_GO') || goodToGo && !disableButton) ? false : true}
          bg={getButtonColor("")}
        />
      </View>
    </CommonView>
  )
}

const styles = StyleSheet.create({
  textCon: {
    marginTop: 60,
    marginBottom: 20
  },
  middleInner: {
    alignSelf: 'center'
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    marginVertical: 10
  },
  topCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  bottomButon: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    left: 10
  }
})

export default OngoingDetails
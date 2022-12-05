import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFCMToken()
    }
}

async function GetFCMToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log("Old Token", fcmToken)
    if (!fcmToken) {
        try {
            let fcmToken = await messaging().getToken()
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken)
                console.log("New Token", fcmToken)
            }
        } catch (error) {
            console.log("Error in GetFCMToken", error)
        }
    }
}

export const NotificationListner = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

    messaging().onMessage(async remoteMessage => {
        console.log("Foreground Notification", remoteMessage)
    })
}
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'flashcards:notification'

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createNotification() {
  return {
    title: 'Time to do your flashcards!',
    body: "Check out the new questions",
    ios: {
      sound: true
    },
    android: {
        sound: true,
    }
  }
}

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
              if (status === 'granted') {
                  Notifications.cancelAllScheduledNotificationsAsync()

                  let tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  tomorrow.setHours(8)
                  tomorrow.setMinutes(0)

                  Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                      time: tomorrow,
                      repeat: 'day'
                    }
                  )

                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
          })
      }
  })
}

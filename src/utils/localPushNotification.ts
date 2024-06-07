import notifee, { AndroidColor, AndroidImportance } from '@notifee/react-native'

export const displayLocalPushNotification = async (title: string, body: string) => {
  const channelId = await notifee.createChannel({
    id: 'incoming_task',
    name: 'Incoming Task',
    importance: AndroidImportance.HIGH
  })

  await notifee.displayNotification({
    title: 'Message from Sarah Lanewww',
    body: 'Tap to view your unread message from Sarah.',
    subtitle: 'Messages',
    android: {
      channelId,
      largeIcon: require('../../assets/favicon.png'),
      showTimestamp: true,
      importance: AndroidImportance.HIGH,
      showChronometer: true,
      chronometerDirection: 'down',
      timestamp: Date.now() + 10000,

      asForegroundService: true,
      color: AndroidColor.RED,
      colorized: true
    }
  })
  // await notifee.displayNotification({
  //   title,
  //   body,
  //   android: {
  //     channelId: 'default',
  //     importance: AndroidImportance.HIGH
  //   }
  // })
}

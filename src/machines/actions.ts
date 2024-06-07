import notifee, { AndroidCategory, AndroidColor, AndroidImportance } from '@notifee/react-native'
import { MachineSection } from '../types/timerMachine'

const pushNotificationTexts = {
  [MachineSection.FOCUS]: {
    title: 'Stay on Track!',
    body: "You're in Focus Mode. Keep up the great work and stay productive!"
  },
  [MachineSection.SHORT_BREAK]: {
    title: 'Time to Recharge!',
    body: "Take a short break and refresh your mind. You've earned it!"
  },
  [MachineSection.LONG_BREAK]: {
    title: 'Take a Breather!',
    body: 'Enjoy a longer break. Relax and recharge for the next focus session!'
  },
  [MachineSection.PAUSED]: {
    title: 'Paused and Ready',
    body: "You've paused your session. Whenever you're ready, jump back in and continue your progress!"
  }
}

export const displayLocalPushNotification = (
  _: unknown,
  params: { machineSection: MachineSection }
) => {
  notifee
    .createChannel({
      id: 'incoming_task',
      name: 'Incoming Task',
      importance: AndroidImportance.HIGH
    })
    .then(channelId => {
      notifee.displayNotification({
        title: pushNotificationTexts[params.machineSection].title,
        body: pushNotificationTexts[params.machineSection].body,
        id: 'tracker_machine',
        android: {
          channelId,
          largeIcon: require('../../assets/favicon.png'),
          importance: AndroidImportance.HIGH,
          autoCancel: false,
          lightUpScreen: true,
          category: AndroidCategory.ALARM,
          asForegroundService: true
        }
      })
    })
}

import { fromCallback, EventObject, NonReducibleUnknown } from 'xstate'
import { InvokeCallback } from 'xstate/dist/declarations/src/actors/callback'
import { MachineEvents } from '../types/timerMachine'

export function enhancedFromCallback<
  TReceive extends EventObject = MachineEvents,
  TSend extends EventObject = MachineEvents,
  TInput = NonReducibleUnknown
>(invokeCallback: InvokeCallback<TReceive, TSend, TInput>) {
  return fromCallback(invokeCallback)
}

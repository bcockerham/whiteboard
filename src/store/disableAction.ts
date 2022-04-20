import { selectorFamily } from 'recoil'
import { ActionType } from '../types/Action'
import items from './items'

const disableAction = selectorFamily<boolean, ActionType>({
  key: 'disableAction',
  get: actionType => ({ get }) => {
    switch (actionType) {
      case 'webcam':
        return get(items).some(item => item.type === actionType)
      case 'remove':
        return !get(items).length
      default:
        return false
    }
  },
})

export default disableAction

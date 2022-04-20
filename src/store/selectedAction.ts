import { atom } from 'recoil'
import { ActionType } from '../types/Action'

const selectedAction = atom<ActionType>({
  key: 'selectedAction',
  default: null,
})

export default selectedAction

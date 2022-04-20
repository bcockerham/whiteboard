import { ElementType } from 'react'
import { ItemType } from './Item'

export type ActionType =
  | ItemType
  | 'undo'
  | 'redo'
  | 'remove'
  | 'reset'

export interface Action {
  type: ActionType
  tooltip?: string
  Icon: ElementType
}

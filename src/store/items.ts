import { selector } from 'recoil'
import { ItemInterface } from '../types/Item'
import history from './history'

const items = selector<ItemInterface[]>({
  key: 'items',
  get: ({ get }) => get(history).present,
  set: ({ set }, newValue) => set(history, currVal => ({
    future: [],
    past: [...currVal.past, currVal.present],
    present: newValue,
  })),
})

export default items

import { DefaultValue, selectorFamily } from 'recoil'
import { ItemInterface } from '../types/Item'
import items from './items'
import nextLayer from './nextLayer'

const item = selectorFamily<ItemInterface, string>({
  key: 'item',
  get: id => ({ get }) => get(items).find(item => item.id === id),
  set: id => ({ get, set }, newValue) => set(items, currVal => {
    if (newValue instanceof DefaultValue) return currVal

    return currVal.map(item => item.id === id ? ({
      ...item,
      ...newValue,
      ...(item.x !== newValue.x || item.y !== newValue.y) && {
        layer: get(nextLayer),
      },
    }) : item)
  }),
})

export default item

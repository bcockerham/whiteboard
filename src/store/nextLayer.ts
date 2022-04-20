import { selector } from 'recoil'
import items from './items'

const nextLayer = selector({
  key: 'nextLayer',
  get: ({ get }) => Math.max(-1, ...get(items).map(item => item.layer || 0)) + 1,
})

export default nextLayer

import { atom } from 'recoil'

const selectedItem = atom<string>({
  key: 'selectedItem',
  default: null,
})

export default selectedItem

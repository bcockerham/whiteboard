import { atom } from 'recoil'

const selectedEmoji = atom({
  key: 'selectedEmoji',
  default: '😀',
})

export default selectedEmoji

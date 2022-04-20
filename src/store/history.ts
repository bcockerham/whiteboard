import { atom, selector } from 'recoil'

const itemsKey = 'items'

const history = atom({
  key: 'history',
  default: selector({
    key: 'history/default',
    get: () => {
      const storedItems = localStorage.getItem(itemsKey)

      return {
        future: [],
        past: [],
        present: storedItems ? JSON.parse(storedItems) : [],
      }
    },
  }),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem(itemsKey, JSON.stringify(newValue.present))
      })
    },
  ],
})

export default history

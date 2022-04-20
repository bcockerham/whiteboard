import { useRecoilState } from 'recoil'
import store from '../store'

const useHistory = () => {
  const [history, setHistory] = useRecoilState(store.history)

  const reset = () => setHistory({ future: [], past: [], present: [] })

  const undo = () => setHistory(currVal => {
    const past = [...currVal.past]
    const present = past.pop()

    return {
      future: [...currVal.future, currVal.present],
      past,
      present,
    }
  })

  const redo = () => setHistory(currVal => {
    const future = [...currVal.future]
    const present = future.pop()

    return {
      future,
      past: [...currVal.past, currVal.present],
      present,
    }
  })

  reset.disabled = !history.present.length
  undo.disabled = history.past.length === 0
  redo.disabled = history.future.length === 0

  return {
    reset,
    undo,
    redo,
  }
}

export default useHistory

import { Box } from '@mui/material'
import { nanoid } from 'nanoid'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import store from '../store'
import { ItemType } from '../types/Item'
import Item, { componentTypes } from './Item/Item'

const getEmojiCursor = (emoji: string) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='80' height='80' viewport='0 0 100 100' style='fill:black;font-size:40px;'><text y='50%'>${emoji}</text></svg>") 0 0, auto;`

const Board = () => {
  const [items, setItems] = useRecoilState(store.items)
  const selectedAction = useRecoilValue(store.selectedAction)
  const nextLayer = useRecoilValue(store.nextLayer)
  const resetSelectedAction = useResetRecoilState(store.selectedAction)
  const selectedEmoji = useRecoilValue(store.selectedEmoji)
  const isEmoji = selectedAction === 'emoji'
  const cursor = isEmoji ? getEmojiCursor(selectedEmoji) : 'copy'

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        ...selectedAction && selectedAction !== 'remove' && { cursor },
      }}
      onClick={(event) => {
        resetSelectedAction()
        if (componentTypes.has(selectedAction)) {
          return setItems(currVal => [
            ...currVal,
            {
              id: nanoid(),
              x: event.clientX,
              y: event.clientY,
              layer: nextLayer,
              type: selectedAction as ItemType,
              ...isEmoji && { value: selectedEmoji },
            },
          ])
        }
      }}
    >
      {items.map(item => <Item key={item.id} itemId={item.id} />)}
    </Box>
  )
}

export default Board

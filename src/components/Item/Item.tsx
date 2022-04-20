import { Box } from '@mui/material'
import { nanoid } from 'nanoid'
import { ElementType, useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import store from '../../store'
import { ItemType } from '../../types/Item'
import Emoji from './Emoji'
import Note from './Note'
import Webcam from './Webcam'

export interface ItemComponentProps {
  itemId: string
}

type ComponentMap = {
  [K in ItemType]: ElementType
}

const components: ComponentMap = {
  'note': Note,
  'webcam': Webcam,
  'emoji': Emoji,
}
export const componentTypes = new Set(Object.keys(components))

const Item = (props: ItemComponentProps) => {
  const [currentItem, setCurrentItem] = useRecoilState(store.item(props.itemId))
  const selectedAction = useRecoilValue(store.selectedAction)
  const setItems = useSetRecoilState(store.items)
  const offset = useRef({ x: 0, y: 0 })
  const isCopy = useRef(false)
  
  const Component = components[currentItem.type]

  return (
    <Box
      sx={{
        position: 'absolute',
        top: currentItem.y,
        left: currentItem.x,
        zIndex: currentItem.layer || 0,
        ...!selectedAction && { cursor: 'move' },
        ...selectedAction === 'remove' && { cursor: 'not-allowed' },
      }}
      draggable={!selectedAction}
      onClick={() => selectedAction === 'remove' && setItems(currVal => currVal.filter(item => item.id !== currentItem.id))}
      onDragStart={(event: any) => {
        isCopy.current = event.altKey && currentItem.type !== 'webcam'
        offset.current = {
          x: currentItem.x - event.clientX,
          y: currentItem.y - event.clientY,
        }
        setTimeout(() => {
          if (!isCopy.current) {
            event.target.style.display = 'none'
          }
        })
      }}
      onDragEnd={(event: any) => {
        const { current: { x, y } } = offset
        const newItem = {
          x: Math.max(event.clientX + x, 50),
          y: Math.max(event.clientY + y, 0),
        }

        event.target.style.display = 'unset'

        return isCopy.current
          ? setItems(currVal => [...currVal, { ...currentItem, ...newItem, id: nanoid() }])
          : setCurrentItem(currVal => ({ ...currVal, ...newItem }))
      }}
    >
      <Component {...props} />
    </Box>
  )
}

export default Item

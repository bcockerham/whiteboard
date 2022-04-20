import { Box } from '@mui/material'
import { useRecoilValue } from 'recoil'
import store from '../../store'
import { ItemComponentProps } from './Item'

const Emoji = (props: ItemComponentProps) => {
  const item = useRecoilValue(store.item(props.itemId))

  return (
    <Box sx={{ fontSize: 40, userSelect: 'none' }}>
      {item.value}
    </Box>
  )
}


export default Emoji

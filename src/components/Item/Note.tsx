import { Paper, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import store from '../../store'
import { ItemComponentProps } from './Item'

const Note = (props: ItemComponentProps) => {
  const [item, setItem] = useRecoilState(store.item(props.itemId))
  const [value, setValue] = useState(item.value)

  useEffect(() => {
    setValue(currVal => currVal !== item.value ? item.value : currVal)
  }, [item.value])

  return (
    <Paper sx={{ p: .5, minWidth: 275, backgroundColor: 'lightgoldenrodyellow' }}>
      <TextField
        fullWidth
        multiline
        maxRows={10}
        placeholder="New note"
        autoFocus={!value}
        value={value || ''}
        onChange={event => setValue(event.target.value)}
        onBlur={() => setItem(currVal => ({ ...currVal, value }))}
      />
    </Paper>
  )
}

export default Note

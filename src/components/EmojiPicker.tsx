import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Picker } from 'emoji-mart'
import { Box, Popover } from '@mui/material'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import store from '../store'

const EmojiPicker = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [emoji, setEmoji] = useRecoilState(store.selectedEmoji)

  return (
    <>
      <Box onClick={event => setAnchorEl(event.currentTarget)}>
        {emoji}
      </Box>
      <Popover 
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{ sx: { left: '60px !important', '& .emoji-mart-preview': { display: 'none' } }}}
      >
        <Picker onClick={({ native }: BaseEmoji) => {
          setEmoji(native)
          setAnchorEl(null)
        }} />
      </Popover>
    </>
  )
}

export default EmojiPicker

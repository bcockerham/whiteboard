import { Backspace, Delete, Redo, StickyNote2, Undo, Videocam } from '@mui/icons-material'
import { Drawer, IconButton, List, ListItem, Typography } from '@mui/material'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import useHistory from '../hooks/useHistory'
import store from '../store'
import { Action } from '../types/Action'
import EmojiPicker from './EmojiPicker'
import { componentTypes } from './Item/Item'
import Tooltip from './Tooltip'

const actions: Action[] = [
  {
    type: 'note',
    tooltip: 'Note',
    Icon: StickyNote2,
  },
  {
    type: 'webcam',
    tooltip: 'Webcam',
    Icon: Videocam,
  },
  {
    type: 'emoji',
    Icon: EmojiPicker,
  },
  {
    type: 'undo',
    tooltip: 'Undo',
    Icon: Undo,
  },
  {
    type: 'redo',
    tooltip: 'Redo',
    Icon: Redo,
  },
  {
    type: 'remove',
    tooltip: 'Remove Item',
    Icon: Backspace,
  },
  {
    type: 'reset',
    tooltip: 'Reset',
    Icon: Delete,
  },
]

const ActionListItem = ({ action }: { action: Action }) => {
  const [selectedAction, setSelectedAction] = useRecoilState(store.selectedAction)
  const resetSelectedAction = useResetRecoilState(store.selectedAction)
  const history = useHistory()

  const handleClickAction = (action: Action) => {
    switch (action.type) {
      case 'reset':
      case 'undo':
      case 'redo': {
        resetSelectedAction()
        return history[action.type]()
      }
      default:
        return setSelectedAction(action.type)
    }
  }

  const disabled = useRecoilValue(store.disableAction(action.type))
  const historyDisabled = (action.type === 'reset' || action.type === 'undo' || action.type === 'redo')
    && history[action.type].disabled

  return (
    <ListItem selected={selectedAction === action.type && !disabled}>
      <Tooltip title={action.tooltip} placement="right">
        <IconButton color="inherit" disabled={disabled || historyDisabled} onClick={() => handleClickAction(action)}>
          <action.Icon />
        </IconButton>
      </Tooltip>
    </ListItem>
  )
}

const ActionList = (props: { actions: Action[] }) => (
  <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {props.actions.map(action => (
      <ActionListItem key={action.type} action={action} />
    ))}
  </List>
)

const Toolbar = () => (
  <Drawer
    open
    variant="permanent"
    PaperProps={{ sx: { width: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}}
  >
    <ActionList actions={actions.filter(action => componentTypes.has(action.type))} />

    <Typography sx={{ transform: 'rotate(-90deg)', userSelect: 'none' }} variant="h6">
      Whiteboard
    </Typography>

    <ActionList actions={actions.filter(action => !componentTypes.has(action.type))} />
  </Drawer>
)

export default Toolbar

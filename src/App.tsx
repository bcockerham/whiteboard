import { Box } from '@mui/material'
import Toolbar from './components/Toolbar'
import Board from './components/Board'

const App = () => (
  <Box onDragOver={e => e.preventDefault()}>
    <Toolbar />
    <Board />
  </Box>
)

export default App

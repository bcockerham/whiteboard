import { Paper } from '@mui/material'
import ReactWebcam from 'react-webcam'

const Webcam = () => (
  <Paper sx={{ p: .5 }}>
    <ReactWebcam videoConstraints={{ width: 320, height: 180 }} />
  </Paper>
)

export default Webcam

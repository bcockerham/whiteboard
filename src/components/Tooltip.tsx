import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material'

const Tooltip = ({ children, ...props }: TooltipProps) => props.title ? (
  <MuiTooltip arrow {...props}>
    <span>{children}</span>
  </MuiTooltip>
) : children

export default Tooltip

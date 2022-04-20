export interface ItemInterface {
  id: string
  x: number
  y: number
  layer: number
  type: ItemType
  value?: string
}

export type ItemType = 
  | 'note'
  | 'webcam'
  | 'emoji'

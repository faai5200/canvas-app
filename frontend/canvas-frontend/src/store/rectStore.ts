import { create } from 'zustand'
import { socket } from '../socket'

type Rect = {
  id: string
  x: number
  y: number
  width: number
  height: number
  fill: string
}

type RectState = {
  rectangles: Rect[]
  addRectangle: (broadcast?: boolean) => void
  updatePosition: (id: string, x: number, y: number, broadcast?: boolean) => void
  
}

export const useRectStore = create<RectState>((set, get) => ({
  rectangles: [],
  addRectangle: (broadcast = true) => {
    const newRect: Rect = {
      id: crypto.randomUUID(),
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: '#4F46E5',
    }

    set((state) => ({
      rectangles: [...state.rectangles, newRect],
    }))

    if (broadcast) socket.emit('rectangle_add', newRect)
  },

  updatePosition: (id, x, y, broadcast = true) => {
  set((state) => ({
    rectangles: state.rectangles.map((rect) =>
      rect.id === id ? { ...rect, x, y } : rect
    ),
  }))

  if (broadcast) socket.emit('rectangle_move', { id, x, y })
},
  deleteRectangle: (id: string, broadcast = true) => {
  set((state) => ({
    rectangles: state.rectangles.filter((r) => r.id !== id),
  }))
  if (broadcast) {
    socket.emit('rectangle_delete', { id })
  }
},
}))
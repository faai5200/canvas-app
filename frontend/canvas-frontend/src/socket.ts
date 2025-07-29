import { io } from 'socket.io-client'
import { useRectStore } from './store/rectStore'
import { useSocketStore } from './store/socketStore'

export const socket = io('http://localhost:8000')

// --- Connection events ---
// Request full state on connect
socket.on('connect', () => {
  useSocketStore.getState().setConnected(true)
  socket.emit('request_init')
})

// Receive initial state
socket.on('init:state', (rects) => {
  useRectStore.setState({ rectangles: rects })
})

socket.on('disconnect', () => {
  console.warn('🔴 Disconnected')
  useSocketStore.getState().setConnected(false)
})

socket.on('clients:update', ({ count }) => {
  useSocketStore.getState().setClientCount(count)
})

// --- Rectangle events ---
socket.on('rectangle:add', (data) => {
  const { id, x, y, width, height, fill } = data
  useRectStore.setState((state) => ({
    rectangles: [...state.rectangles, { id, x, y, width, height, fill }],
  }))
})

socket.on('rectangle:move', ({ id, x, y }) => {
  useRectStore.setState((state) => ({
    rectangles: state.rectangles.map((rect) =>
      rect.id === id ? { ...rect, x, y } : rect
    ),
  }))
})

socket.on('rectangle:delete', ({ id }) => {
  useRectStore.getState().deleteRectangle(id, false)
})
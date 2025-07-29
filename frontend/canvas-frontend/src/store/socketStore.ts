import { create } from 'zustand'

type SocketState = {
  connected: boolean
  clientCount: number
  setConnected: (status: boolean) => void
  setClientCount: (count: number) => void
}

export const useSocketStore = create<SocketState>((set) => ({
  connected: false,
  clientCount: 0,
  setConnected: (connected) => set({ connected }),
  setClientCount: (count) => set({ clientCount: count }),
}))
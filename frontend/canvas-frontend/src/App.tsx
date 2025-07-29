import CanvasStage from './components/CanvasStage'
import { useRectStore } from './store/rectStore'
import { useSocketStore } from './store/socketStore'

function App() {
  const addRectangle = useRectStore((state) => state.addRectangle)
  const { connected, clientCount } = useSocketStore()

  return (
    <div className="h-screen w-screen bg-gray-50 relative font-sans overflow-hidden">
      {/* Sidebar Panel */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-3">
        {/* Add Rectangle Button */}
        <button
          onClick={addRectangle}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-lg shadow-md transition duration-200 z-10"
        >
          + Add Rectangle
        </button>

       
      </div>


        {/* Client Info Panel */}
       <div className="bg-white shadow-lg rounded-lg px-5 py-3 w-60 border border-gray-200 text-sm text-gray-700 absolute top-0 right-0">
          <p className="mb-1">
            <span className="font-semibold">Status:</span>{' '}
            <span className={connected ? 'text-green-600' : 'text-red-500'}>
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </p>
          <p>
            <span className="font-semibold">Clients Connected:</span>{' '}
            <span className="text-indigo-600 font-bold">{clientCount}</span>
          </p>
        </div>

      {/* Canvas */}
      <CanvasStage />
    </div>
  )
}

export default App
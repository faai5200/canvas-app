import { Stage, Layer, Rect, Text, Group } from 'react-konva'
import { useRectStore } from '../store/rectStore'
import throttle from 'lodash.throttle'


const throttledUpdate = throttle((id: string, x: number, y: number) => {
  useRectStore.getState().updatePosition(id, x, y)
}, 50)

const CanvasStage = () => {
  const { rectangles, updatePosition, deleteRectangle } = useRectStore()

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {rectangles.map((rect) => (
          <Group key={rect.id}>
            <Rect
              {...rect}
              draggable
              onDragMove={(e) =>
                updatePosition(rect.id, e.target.x(), e.target.y())
              }
            />
            <Text
              text="×"
              fontSize={16}
              x={rect.x + rect.width - 10}
              y={rect.y - 10}
              fill="red"
              onClick={() => deleteRectangle(rect.id)}
              listening={true}
            />
          </Group>
        ))}
      </Layer>
    </Stage>
  )
}

export default CanvasStage
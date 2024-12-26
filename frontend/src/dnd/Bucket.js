import { useDrop } from 'react-dnd'

function Bucket({onDrop, children, id, stageId}) {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      // The type (or types) to accept - strings or symbols
      accept: "BOX",
      drop: (item) => onDrop(item, id, stageId),
      // Props to collect
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    }))

    return (
      <div
        ref={drop}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {canDrop ? `Release to drop`: `Drag a box here`}
        {children}
      </div>
    )
}

export default Bucket;
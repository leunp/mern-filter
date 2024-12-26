import { useDrop } from 'react-dnd'

function Trash({onDrop, children, id, stageId}) {
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
          width: "25%",
          float:'right',
          backgroundColor:'red'
        }}
      >
        {canDrop ? `Release to Trash`: `Trash here`}
        {children}
      </div>
    )
}

export default Trash;
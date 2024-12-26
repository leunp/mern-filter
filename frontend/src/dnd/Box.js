import { useDrag } from 'react-dnd'
import { useRef } from 'react';

function Box({ keyValue, operator, inputValue, id, bucketId, stageId, onValueChange}) {
    const keyRef = useRef();
    const operatorRef = useRef();
    const inputRef = useRef();

    const [{ isDragging }, drag] = useDrag(() => ({
      // "type" is required. It is used by the "accept" specification of drop targets.
      type: "BOX",
      item: () => ({
        id:id,
        bucketId: bucketId,
        stageId: stageId,
        keyValue: keyValue ? keyValue : keyRef.current.value,
        operator: operator ? operator : operatorRef.current.value,
        inputValue: inputValue ? inputValue : inputRef.current.value,
        }),
      // The collect function utilizes a "monitor" instance (see the Overview for what this is)
      // to pull important pieces of state from the DnD system.
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
    })
  }))

    return (
        <div ref={drag} style={{ opacity: isDragging ? 1 : 1,
          cursor: 'move',
          border: '1px solid #ccc',
          padding: '5px',
          borderRadius: '1px',
          margin: '1px',
          backgroundColor: 'lightblue',
          width: '35vh'
        }}
        >
          <select name="key" ref={keyRef} id = "key" style={{ flex: '1',   width: '10vh',}} defaultValue={keyValue} onChange={onValueChange}>
              <option value="rb">rb</option>
              <option value="drb">drb</option>
              <option value="galactic_latitude">galactic_latitude (abs)</option>
              <option value="age">age</option>
          </select>
          <select name="operator" ref={operatorRef} id = "operator" style={{ flex: '1',   width: '10vh',}} defaultValue={operator} onChange={onValueChange}>
              <option value="<">less than</option>
              <option value="<=">less than or equal to</option>
              <option value="=">equal to</option>
              <option value=">">greater than</option>
              <option value=">=">greater than or equal to</option>
          </select>
          <input type="number" ref={inputRef} name="input" id = "input" style={{ flex: '1',   width: '10vh',}} defaultValue={inputValue} onChange={onValueChange}>
          </input>

        </div>
    )
}

export default Box;
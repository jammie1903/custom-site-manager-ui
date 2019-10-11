import React from 'react'
import { useDrag } from 'react-dnd'

const types = {}

var draggable = new Proxy({}, {
  get: function(obj, prop) {
      return (item) => props => <Draggable type={prop} item={item} {...props} />
  }
});

function Draggable(props) {
  const {item: Component, type, ...childProps} = props

  const [{isDragging}, drag] = useDrag({
    item: { type },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })

  return <div ref={drag} isDragging={isDragging}>
    <Component {...childProps} isDragging={isDragging} />
  </div>
}

export default {
  get types() { return types },
  draggable
}
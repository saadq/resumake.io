import React, { ReactNode } from 'react'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
  index: number
  children: ReactNode
}

export function DraggableItem({ index, children }: Props) {
  return (
    <Draggable
      key={`draggable-${index}`}
      draggableId={`draggable-${index}`}
      index={index}
    >
      {(draggable) => (
        <div
          ref={draggable.innerRef}
          {...draggable.draggableProps}
          {...draggable.dragHandleProps}
          tabIndex={-1}
        >
          {children}
        </div>
      )}
    </Draggable>
  )
}

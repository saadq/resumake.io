import React from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

interface Props {
  onDragEnd: (result: DropResult) => void
  children: React.ReactNode
}

export function DraggableList({ onDragEnd, children }: Props) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(droppable) => (
          <div {...droppable.droppableProps} ref={droppable.innerRef}>
            {children}
            {droppable.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

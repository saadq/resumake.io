import React from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import styled from 'styled-components'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

interface Props {
  onDragEnd: (result: DropResult) => void
  children: React.ReactNode
}

export function DraggableList({ onDragEnd, children }: Props) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(droppable) => (
          <ListContainer {...droppable.droppableProps} ref={droppable.innerRef}>
            {children}
            {droppable.placeholder}
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}

import React from 'react'
import { Header } from 'common/components/Header'

interface Props {
  prevPage: () => void
  nextPage: () => void
  zoomIn: () => void
  zoomOut: () => void
}

export function Toolbar({ prevPage, nextPage, zoomIn, zoomOut }: Props) {
  return <Header accent />
}

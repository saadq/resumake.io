import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Switch from 'react-switch'
import styled from 'styled-components'
import { FaMoon as MoonIcon, FaSun as SunIcon } from 'react-icons/fa'
import { AppState } from 'app/types'
import { settingsActions } from '../slice'

const Menu = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99999;
`

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.35;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 400px;
  height: 400px;
  background: ${({ theme }) => theme.darkBlack};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 15;
  color: white;
  padding-right: 2;
`

interface Props {
  isMenuOpen: boolean
  setIsMenuOpen: (isVisible: boolean) => void
}

export function SettingsMenu({ setIsMenuOpen, isMenuOpen }: Props) {
  const { theme } = useSelector((state: AppState) => state.settings)
  const dispatch = useDispatch()

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    dispatch(settingsActions.toggleTheme())
  }

  useEffect(() => {
    const escapeKeyCode = 27
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.which === escapeKeyCode) {
        closeMenu()
      }
    }

    window.addEventListener('keyup', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  return isMenuOpen ? (
    <Menu>
      <Backdrop onClick={closeMenu} />
      <Content>
        <Switch
          checked={theme.name === 'light'}
          onChange={toggleTheme}
          offColor="#000"
          onColor="#fff"
          offHandleColor="#8A8FFF"
          onHandleColor="#8A8FFF"
          uncheckedIcon={
            <IconWrapper>
              <MoonIcon />
            </IconWrapper>
          }
          checkedIcon={
            <IconWrapper>
              <SunIcon color="black" />
            </IconWrapper>
          }
          className="react-switch"
          id="icon-switch"
        />
      </Content>
    </Menu>
  ) : null
}

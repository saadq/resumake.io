/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'

const Section = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  width: 100%;
`

const Heading = styled.h1`
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  font-size: inherit;
  font-weight: normal;
  color: #777;
`

const Label = styled.label`
  display: block;
  margin-top: 25px;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  padding: 9px 20px 10px 15px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  background: #fff;
  font-size: .9em;
  font-family: inherit;
  border: none;
  border: 1px solid #e6edf4;
  color: #7e899b;
  -webkit-transition: all .2s;
  transition: all .2s;
  border-radius: 2px;

  &:focus {
    color: #333c46;
    border-color: #007eff;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 0 3px rgba(0,126,255,.1);
  }

  @media screen and (max-width: 768px) {
    padding-right: 5px;
    padding-left: 5px;
  }
`

function Profile() {
  return (
    <Section>
      <Heading>Your Personal Info</Heading>
      <Label>Full Name</Label>
      <Input type="text" />
      <Label>Email</Label>
      <Input type="text" />
      <Label>Phone Number</Label>
      <Input type="text" />
      <Label>Address</Label>
      <Input type="text" />
      <Label>Link</Label>
      <Input type="text" />
    </Section>
  )
}

export default Profile

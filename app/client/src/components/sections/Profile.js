import React from 'react'
import { Input } from '../bulma'

function Profile() {
  return (
    <section id='profile'>
      <h1>Your Personal Info</h1>
      <Input name='profile[fullName]' title='Full Name' />
      <Input name='profile[email]' title='Email' />
      <Input name='profile[phoneNumber]' title='Phone Number' />
      <Input name='profile[address]' title='Address' />
      <Input name='profile[link]' title='Link' placeholder='GitHub, website, etc' />
    </section>
  )
}

export default Profile

import React from 'react'
import { Input } from '../bulma'

function Profile() {
  return (
    <section className="form-section" id="profile">
      <h1>Your Personal Info</h1>
      <Input
        name="profile[fullName]"
        title="Full Name"
        placeholder="John Smith"
      />
      <Input
        name="profile[email]"
        title="Email"
        placeholder="johnsmith@gmail.com"
      />
      <Input
        name="profile[phoneNumber]"
        title="Phone Number"
        placeholder="(555) 123-4567"
      />
      <Input
        name="profile[address]"
        title="Address"
        placeholder="New York, NY"
      />
      <Input
        name="profile[link]"
        title="Link"
        placeholder="github.com/myname"
      />
    </section>
  )
}

export default Profile

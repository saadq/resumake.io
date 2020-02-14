/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import Section from './Section'
import LabeledInput, {Input, Label} from '../fragments/LabeledInput'
import {Icon, RoundButton} from "../../../../common/components";
import type {FormValues} from "../../types";
import type {State} from "../../../../app/types";
import {addProfileSummary, removeProfileSummary} from "../../actions";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonRow = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 15px;
  ${props => props.hidden && 'opacity: 0;'} transition: none;
`

const MiniInput = Input.extend`
  width: 65%;

  @media screen and (max-width: 850px) {
    width: 65%;
  }
`

type Props = {
    basics: $PropertyType<FormValues, 'basics'>,
    addProfileSummary: () => void,
    removeProfileSummary: () => void
}

function Profile({ basics, addProfileSummary, removeProfileSummary }: Props) {
  const { summarys } = basics
  return (
    <Section heading="Your Personal Info">
      <LabeledInput
        name="basics.name"
        label="Full Name"
        placeholder="John Smith"
      />
      <LabeledInput
        name="basics.email"
        label="Email"
        placeholder="johnsmith@gmail.com"
      />
      <LabeledInput
        name="basics.phone"
        label="Phone Number"
        placeholder="(555) 123-4567"
      />
      <LabeledInput
        name="basics.location.address"
        label="Location"
        placeholder="New York, NY"
      />
      <LabeledInput
        name="basics.website"
        label="Link"
        placeholder="mycoolportfolio.com/myname"
      />
        <Label>Summarys</Label>
        {summarys.map((summary, i) => (
            <Row key={i}>
                <MiniInput
                    type="text"
                    name={`basics.summarys[${i}]`}
                    placeholder="Experienced Regional Manager with a demonstrated history of working in the paper supply industry."
                    component="input"
                />
                <ButtonRow hidden={i !== summarys.length - 1}>
                    <RoundButton
                        inverted
                        disabled={i !== summarys.length - 1}
                        type="button"
                        onClick={() => addProfileSummary()}
                    >
                        <Icon type="add" />
                    </RoundButton>
                    <RoundButton
                        inverted
                        disabled={summarys.length === 1}
                        type="button"
                        onClick={() => removeProfileSummary()}
                    >
                        <Icon type="remove" />
                    </RoundButton>
                </ButtonRow>
            </Row>
        ))}
    </Section>
  )
}

const mapActions = {
    addProfileSummary,
    removeProfileSummary
}

function mapState(state: State) {
    return {
        basics: state.form.resume.values.basics
    }
}

export default connect(mapState, mapActions)(Profile)

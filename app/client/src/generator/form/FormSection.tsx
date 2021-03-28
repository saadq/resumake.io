import styled from 'styled-components'
import { LabeledInput } from '../../common/components/LabeledInput'
import { Card } from '../../common/components/Card'
import { colors, sizes } from '../../common/theme'

const Section = styled.section`
  width: ${sizes.formSection.width};
  background: ${colors.gray2};
  height: calc(${sizes.formSection.height} - ${sizes.footer.height});
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
`

const Header = styled.header`
  height: ${sizes.header.height};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  background: ${colors.gray2};
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`

export function FormSection() {
  return (
    <Section>
      <Header>
        <h1>Profile</h1>
      </Header>
      <FormContent>
        <Card>
          <LabeledInput label="Full name" placeholder="John Smith" />
          <LabeledInput label="Email" placeholder="johnsmith@gmail.com" />
          <LabeledInput label="Phone number" placeholder="(555) 464-6446" />
          <LabeledInput label="Location" placeholder="Seattle, WA" />
          <LabeledInput label="Link" placeholder="https://github.com/saadq" />
        </Card>
      </FormContent>
    </Section>
  )
}

/**
 * @flow
 */

import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  margin: 5%;
`

const Logo = styled(RouterLink)`
  color: black;
  font-family: 'Earth Orbiter Title';
  letter-spacing: 0.4em;
  text-decoration: none;
`

const Line = styled.p`
  margin: 10px 0;
  line-height: 1.5;
`

const FAQ = styled.div`
  margin-top: 50px;
  max-width: 600px;
`

const Question = styled.p`
  font-weight: bold;
  margin: 30px 0 0 0;
`

const Answer = styled.div`
  font-size: 14px;
  margin: 10px;
`

const Link = styled.a`
  color: black;
`

const OrderedList = styled.ol`
  padding: 0;
  margin: 10px 15px;
`

function About() {
  return (
    <Main>
      <Content>
        <Line>
          <Logo to="/">Resumake</Logo>
          is a tool for automatically generating beautiful resumes.
        </Line>
        <Line>
          The webapp was made by <Link href="#">Saad Quadri</Link> and was built
          with Node.js, Koa, React, and Redux.
        </Line>
        <FAQ>
          <h1>FAQs</h1>
          <Question>How do I use this website?</Question>
          <Answer>
            <OrderedList>
              <li>Choose a template.</li>
              <li>Fill in as much (or as little) info as you want.</li>
              <li>
                Press the <code>Generate</code> button whenever you want to see
                how your current resume looks.
              </li>
              <li>
                Once you're satisfied, you can save your resume as a PDF or
                download the LaTeX source.
              </li>
            </OrderedList>
          </Answer>
          <Question>Where can I report any bugs or feature requests?</Question>
          <Answer>
            Feel free to open an issue{' '}
            <Link href="https://github.com/saadq/latexresu.me/issues">
              here
            </Link>.
          </Answer>
          <Question>Can I help contribute to this project?</Question>
          <Answer>
            Definitely! I'm always happy to help out first-time contributors to
            the project. You can check out the{' '}
            <Link href="https://github.com/saadq/latexresu.me/tree/master/contributing.md">
              <code>contributing.md</code>
            </Link>{' '}
            for an in-depth guide on how to get started on working on this
            project.
          </Answer>
          <Question>How can I donate or say thanks?</Question>
          <Answer>
            Glad you liked the project! If you want to show your appreciation,{' '}
            <Link href="https://www.paypal.me/saadquadri">donations</Link> are
            very much appreciated. Or, if you'd to reach out directly and say
            thanks, you can send me an{' '}
            <Link href="mailto:saad@saadq.com">email</Link> and make my day :)
          </Answer>
        </FAQ>
      </Content>
    </Main>
  )
}

export default About

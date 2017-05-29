import {
  Home,
  Generator,
  Templates,
  Profile,
  Education,
  Experience,
  Projects,
  Skills,
  Preview,
  Awards,
  NoMatch
} from '../components'

const home = {
  path: '/',
  component: Home
}

const generator = {
  path: '/generator',
  component: Generator,
  routes: [
    {
      path: '/generator/templates',
      component: Templates
    },
    {
      path: '/generator/profile',
      component: Profile
    },
    {
      path: '/generator/education',
      component: Education
    },
    {
      path: '/generator/experience',
      component: Experience
    },
    {
      path: '/generator/projects',
      component: Projects
    },
    {
      path: '/generator/skills',
      component: Skills
    },
    {
      path: '/generator/awards',
      component: Awards
    },
    {
      path: '/generator/preview',
      component: Preview
    },
    {
      path: '*',
      component: NoMatch
    }
  ]
}

const routeConfig = [home, generator]

export default routeConfig

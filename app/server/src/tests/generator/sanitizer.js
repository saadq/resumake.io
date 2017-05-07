import test from 'ava'
import sanitize from '../../generator/sanitizer'

test('sanitizer should trim excess space from values', async (t) => {
  const input = {
    profile: {
      fullName: '   Saad Quadri',
      phoneNumber: '(732) 476-8719       ',
      link: ' https://github.com/saadq ',
      address: 'Metuchen,         NJ'
    },
    jobs: [
      {
        name: '        Mozilla ',
        title: 'Software         Engineer Intern ',
        location: ' Mountain     View, CA',
        startDate: ' Jun   2016     ',
        endDate: '    Aug    2016    ',
        duties: [
          '  Refactored   disabled-host APIs to use the permission manager for both Firefox and Android’s Fennec.',
          'Fixed regressions for Firefox Electrolysis and improved dialogs and notification popups.    '
        ]
      },
      {
        name: 'Codecademy',
        title: 'Coding Advisor',
        location: 'Manhattan, NY',
        startDate: 'Dec 2015',
        endDate: 'May 2016',
        duties: [
          '  Created a JavaScript   project for Codecademy Pro members now available in the new JS course   ',
          'Taught new    coders how to avoid bugs and how to go through the process of fixing existing ones.  ',
          '  Reviewed general programming topics with students and provided assistance for lessons in Java, HTML, CSS, JavaScript, and Ruby.'
        ]
      }
    ]
  }

  const expected = {
    profile: {
      fullName: 'Saad Quadri',
      phoneNumber: '(732) 476-8719',
      link: 'https://github.com/saadq',
      address: 'Metuchen, NJ'
    },
    jobs: [
      {
        name: 'Mozilla',
        title: 'Software Engineer Intern',
        location: 'Mountain View, CA',
        startDate: 'Jun 2016',
        endDate: 'Aug 2016',
        duties: [
          'Refactored disabled-host APIs to use the permission manager for both Firefox and Android’s Fennec.',
          'Fixed regressions for Firefox Electrolysis and improved dialogs and notification popups.'
        ]
      },
      {
        name: 'Codecademy',
        title: 'Coding Advisor',
        location: 'Manhattan, NY',
        startDate: 'Dec 2015',
        endDate: 'May 2016',
        duties: [
          'Created a JavaScript project for Codecademy Pro members now available in the new JS course',
          'Taught new coders how to avoid bugs and how to go through the process of fixing existing ones.',
          'Reviewed general programming topics with students and provided assistance for lessons in Java, HTML, CSS, JavaScript, and Ruby.'
        ]
      }
    ]
  }

  const actual = sanitize(input)

  t.deepEqual(expected, actual)
})

test('sanitizer should normalize LaTeX symbols', async (t) => {
  const input = {
    jobs: [
      {
        name: 'Johnson & Johnson'
      },
      {
        name: 'LaTeX Symbols: {\\^~_%$&#}'
      }
    ]
  }

  const expected = {
    jobs: [
      {
        name: 'Johnson \\& Johnson'
      },
      {
        name: 'LaTeX Symbols: \\{\\textbackslash{}\\textasciicircum{}\\textasciitilde{}\\_\\%\\$\\&\\#\\}'
      }
    ]
  }

  const actual = sanitize(input)

  t.deepEqual(expected, actual)
})

test('sanitizer should recursively remove empty properties from complex objects', async (t) => {
  const input = {
    profile: {
      fullName: 'Saad Quadri',
      email: null,
      phoneNumber: '(732) 476-8719',
      link: '      ',
      address: 'Metuchen, NJ'
    },
    schools: [],
    complexEmptyArray: [
      {},
      {
        name: '',
        stuff: [
          {},
          '',
          NaN
        ]
      },
      '',
      null,
      undefined
    ],
    jobs: [
      {
        name: 'Mozilla',
        title: 'Software Engineer Intern',
        location: 'Mountain View, CA',
        startDate: 'Jun 2016',
        endDate: 'Aug 2016',
        duties: [
          null,
          'Refactored disabled-host APIs to use the permission manager for both Firefox and Android’s Fennec.',
          undefined
        ]
      },
      {
        name: 'Codecademy',
        title: 'Coding Advisor',
        location: 'Manhattan, NY',
        startDate: 'Dec 2015',
        endDate: 'May 2016',
        duties: [
          'Created a JavaScript project for Codecademy Pro members now available in the new JS course',
          null,
          'Reviewed general programming topics with students and provided assistance for lessons in Java, HTML, CSS, JavaScript, and Ruby.',
          undefined,
          NaN
        ]
      },
      {
        name: 'IEEE',
        title: 'Software Developer Intern',
        location: 'Piscataway, NJ',
        duties: [
          null,
          undefined,
          ''
        ],
        startDate: 'Jun 2015',
        endDate: 'Nov 2015'
      },
      {
        name: 'JNJ',
        title: 'Web Developer Intern',
        location: 'New Brunswick, NJ',
        startDate: 'Jan 2015',
        endDate: 'Jun 2015',
        randomThing: NaN,
        duties: [
          '',
          'Improved existing web pages by migrating inline-styling to external CSS files, and adding cross-browser compatibility.',
          '     '
        ]
      }
    ],
    projects: [
      {
      },
      {
        name: '',
        description: '       ',
        technologies: 'Node.js, Koa, React, Redux',
        link: 'https://github.com/saadq/flow-timer'
      },
      {
        name: '    '
      },
      {
        name: 'Anagrams',
        description: '     ',
        technologies: null,
        link: undefined
      },
      {
        name: 'Materialize',
        description: 'A collection of custom themes for Sublime Text, inspired by Material design with 30k+ installations.',
        technologies: 'XML, JSON',
        link: 'https://github.com/saadq/Materialize'
      }
    ],
    skills: {
      languages: 'JavaScript, Java, Ruby, HTML, XML, CSS, Sass',
      frameworks: 'Node.js, Koa, Express, React, Redux, jQuery, lodash'
    }
  }

  const expected = {
    profile: {
      fullName: 'Saad Quadri',
      phoneNumber: '(732) 476-8719',
      address: 'Metuchen, NJ'
    },
    jobs: [
      {
        name: 'Mozilla',
        title: 'Software Engineer Intern',
        location: 'Mountain View, CA',
        startDate: 'Jun 2016',
        endDate: 'Aug 2016',
        duties: [
          'Refactored disabled-host APIs to use the permission manager for both Firefox and Android’s Fennec.'
        ]
      },
      {
        name: 'Codecademy',
        title: 'Coding Advisor',
        location: 'Manhattan, NY',
        startDate: 'Dec 2015',
        endDate: 'May 2016',
        duties: [
          'Created a JavaScript project for Codecademy Pro members now available in the new JS course',
          'Reviewed general programming topics with students and provided assistance for lessons in Java, HTML, CSS, JavaScript, and Ruby.'
        ]
      },
      {
        name: 'IEEE',
        title: 'Software Developer Intern',
        location: 'Piscataway, NJ',
        startDate: 'Jun 2015',
        endDate: 'Nov 2015'
      },
      {
        name: 'JNJ',
        title: 'Web Developer Intern',
        location: 'New Brunswick, NJ',
        startDate: 'Jan 2015',
        endDate: 'Jun 2015',
        duties: [
          'Improved existing web pages by migrating inline-styling to external CSS files, and adding cross-browser compatibility.'
        ]
      }
    ],
    projects: [
      {
        technologies: 'Node.js, Koa, React, Redux',
        link: 'https://github.com/saadq/flow-timer'
      },
      {
        name: 'Anagrams'
      },
      {
        name: 'Materialize',
        description: 'A collection of custom themes for Sublime Text, inspired by Material design with 30k+ installations.',
        technologies: 'XML, JSON',
        link: 'https://github.com/saadq/Materialize'
      }
    ],
    skills: {
      languages: 'JavaScript, Java, Ruby, HTML, XML, CSS, Sass',
      frameworks: 'Node.js, Koa, Express, React, Redux, jQuery, lodash'
    }
  }

  const actual = sanitize(input)

  t.deepEqual(expected, actual)
})

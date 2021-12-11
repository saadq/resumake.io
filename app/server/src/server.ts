import { serve } from 'https://deno.land/std@0.117.0/http/server.ts'
import { createElement } from 'https://esm.sh/react@17.0.2'
import { renderToString } from 'https://esm.sh/react-dom@17.0.2/server'

function requestHandler() {
  const App = createElement('button', null, 'Click me')
  const appHtml = renderToString(App)

  const response = `
    <body>
      <div id="root">
        ${appHtml}
      </div>
    </body>
  `

  const headers = {
    'Content-Type': 'text/html'
  }

  return new Response(response, { headers })
}

serve(requestHandler, { addr: ':3000' })

console.log('Server listening at http://localhost:3000')

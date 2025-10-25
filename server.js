import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
 
const port = process.env.PORT || process.env.IISNODE_PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port)
 
  console.log(
    `> Server listening at ${typeof port === 'string' && port.includes('pipe') ? port : `http://localhost:${port}`} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
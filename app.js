const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const serve = require('koa-static')
const mount = require('koa-mount')
const config = require('config')

const User = require('./src/User').model

const app = new Koa()

const PORT = config.get('port')
const PROXY = config.get('proxyPath')
const PATH = config.get('static.path')
const PUBLIC_PATH = path.join(__dirname, PATH)
const INDEX_PATH = path.join(PUBLIC_PATH, config.get('static.index'))

app.proxy = config.get('proxy')
app.use(mount(PROXY, serve(PUBLIC_PATH)))
app.use(async ctx => {
  try {
    await User.connect(ctx.request.ip)
  } catch (e) {
    console.error(`Error: ${e}`)
  }
  ctx.set('Content-Type', 'text/html')
  ctx.body = fs.createReadStream(INDEX_PATH)
})

app.listen(PORT, async () => {
  await User.sync()
  console.log(`Server started at ${PORT} port`)
})

process.on('uncaughtException', err => {
  console.error(`uncaughtException: ${err}`)
})

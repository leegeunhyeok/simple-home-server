const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const mount = require('koa-mount')
const config = require('config')

const User = require('./src/User').model

const app = new Koa()
const router = new Router()

const PORT = config.get('port')
const ROOT = config.get('root')
const PATH = config.get('static.path')
const PUBLIC_PATH = path.join(__dirname, PATH)
const INDEX_PATH = path.join(PUBLIC_PATH, config.get('static.index'))
const STATISTICS = config.get('statistics')

app.proxy = config.get('proxy')
app.use(mount(ROOT, serve(PUBLIC_PATH)))

router.get(ROOT, ctx => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream(INDEX_PATH)
})

router.post(STATISTICS, async ctx => {
  const ip = ctx.request.ip
  console.log(`${ip} Connected.`)
  try {
    await User.connect(ip)
  } catch (e) {
    console.error(`Error: ${e}`)
  }
  ctx.type = 'json'
  ctx.body = null
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT, async () => {
  await User.sync()
  console.log(`Server started at ${PORT} port`)
})

process.on('uncaughtException', err => {
  console.error(`uncaughtException: ${err}`)
})

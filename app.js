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
const PROXY = config.get('proxy')
const PATH = config.get('static.path')
const PUBLIC_PATH = path.join(__dirname, PATH)
const INDEX_PATH = path.join(PUBLIC_PATH, config.get('static.index'))

app.use(mount(PROXY, serve(PUBLIC_PATH)))

router.get(PROXY, async ctx => {
  console.log(ctx.request.ip)
  try {
    // await User.connect()
  } catch (e) {
    console.error(`Error: ${e}`)
  }
  ctx.type = 'html'
  ctx.body = fs.createReadStream(INDEX_PATH)
})

router.all('*', ctx => {
  ctx.redirect('/')
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, async () => {
  await User.sync()
  console.log(`Server started at ${PORT} port`)
})

process.on('uncaughtException', err => {
  console.error(`uncaughtException: ${err}`)
})

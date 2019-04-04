const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const config = require('config')

const app = new Koa()
const router = new Router()

const PORT = config.get('port')
const PATH = config.get('static.path')

app.use(serve(__dirname + PATH))

router.get('/', () => {})

router.all('*', (ctx, _) => {
  ctx.redirect('/')
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`)
})

process.on('uncaughtException', err => {
  console.error(`uncaughtException: ${err}`)
})

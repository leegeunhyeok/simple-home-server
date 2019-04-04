const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const config = require('config')

const app = new Koa()
const router = new Router()

app.use(serve(__dirname + config.get('static.path')))

router.get('/', (ctx, _) => {
  ctx.body = 'home'
})

router.get('*', (ctx, _) => {
  ctx.redirect('/')
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.get('port'), () => {
  console.log('Server started')
})

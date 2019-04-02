const Koa = require('koa')
const Router = require('koa-router')
const config = require('config')

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) => {
  ctx.body = 'home'
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.get('port'), () => {
  console.log('Server started')
})

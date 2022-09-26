const authRouter = require('./authRouter')
const userRouter = require('./userRouter')

const routes = [
  authRouter,
  userRouter,
]

module.exports =  routes;
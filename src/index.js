import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import bodyParser from 'body-parser'
import schema from './schema'
import passport from 'passport-jwt'

const port = process.env.PORT || 3001

const app = express()

passport.initialize()

app.post('/graphql', passport.authenticate('jwt', { session: false }),
  function (req, res) {
    res.send(req.user)
  }
)

const server = new ApolloServer({
  ...schema,
  instrospection: true,
  playground: true,
  tracing: true,
  context: ({ req }) => {
    // const token = req.headers.authorization || ''
    const user = req.user
    return { user }
  }
})

server.applyMiddleware({ app })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  console.log(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  )
})

import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import schema from './schema'
import passportStrategy from './passportStrategy'

const port = process.env.PORT || 3001

const app = express()

app.use(passportStrategy)

const server = new ApolloServer({
  ...schema,
  instrospection: true,
  playground: true,
  tracing: true,
  context: ({ req }) => {
    return { user: req.user }
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

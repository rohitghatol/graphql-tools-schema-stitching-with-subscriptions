import {GraphQLServer, Options} from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { Prisma } from './generated/prisma'
import { Context } from './utils'

const resolvers = {
  Query: {
      actors(parent, args, context: Context, info) {
      return context.db.query.actors(args, info);
    }
  },
  Mutation: {
    createActor(parent, args, context: Context, info) {
      return context.db.mutation.createActor(args,info);
    },
    updateActor(parent, args, context: Context, info) {
        return context.db.mutation.updateActor(args,info);
    },
    deleteActor(parent, args, context: Context, info) {
        return context.db.mutation.deleteActor(args,info);
    },
  },
  Subscription: {
    actor: {
        subscribe: async (parent, args, ctx, info) => {
          console.log('actor');
          return ctx.db.subscription.actor(args,info);
        }
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: 'http://localhost:4466/service1/dev', // the endpoint of the Prisma DB service
      secret: 'mysecret123', // specified in database/prisma.yml
      debug: false, // log all GraphQL queries & mutations
    }),
  }),
})

const options:Options = {
    port: 4001
}
server.start(options,() => console.log('Server is running on http://localhost:4001'))

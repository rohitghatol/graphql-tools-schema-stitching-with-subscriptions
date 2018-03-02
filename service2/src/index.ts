import {GraphQLServer, Options} from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { Prisma } from './generated/prisma'
import { Context } from './utils'

const resolvers = {
    Query: {
        movies(parent, args, context: Context, info) {
            return context.db.query.movies(args, info);
        }
    },
    Mutation: {
        createMovie(parent, args, context: Context, info) {
            return context.db.mutation.createMovie(args,info);
        },
        updateMovie(parent, args, context: Context, info) {
            return context.db.mutation.updateMovie(args,info);
        },
        deleteMovie(parent, args, context: Context, info) {
            return context.db.mutation.deleteMovie(args,info);
        },
    },
    Subscription: {
        movie: {
            subscribe: async (parent, args, ctx, info) => {
                console.log('movie');
                return ctx.db.subscription.movie(args,info);
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
            endpoint: 'http://localhost:4466/service2/dev', // the endpoint of the Prisma DB service
            secret: 'mysecret123', // specified in database/prisma.yml
            debug: false, // log all GraphQL queries & mutations
        }),
    }),
})

const options:Options = {
    port: 4002
}
server.start(options,() => console.log('Server is running on http://localhost:4002'))

import {GraphQLServer, Options} from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { Prisma } from './generated/prisma'
import { Context } from './utils'

const resolvers = {
    Query: {
        genres(parent, args, context: Context, info) {
            return context.db.query.genres(args, info);
        }
    },
    Mutation: {
        createGenre(parent, args, context: Context, info) {
            return context.db.mutation.createGenre(args,info);
        },
        updateGenre(parent, args, context: Context, info) {
            return context.db.mutation.updateGenre(args,info);
        },
        deleteGenre(parent, args, context: Context, info) {
            return context.db.mutation.deleteGenre(args,info);
        },
    },
    Subscription: {
        genre: {
            subscribe: async (parent, args, ctx, info) => {
                console.log('genre');
                return ctx.db.subscription.genre(args,info);
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
            endpoint: 'http://localhost:4466/service3/dev', // the endpoint of the Prisma DB service
            secret: 'mysecret123', // specified in database/prisma.yml
            debug: false, // log all GraphQL queries & mutations
        }),
    }),
})

const options:Options = {
    port: 4003
}
server.start(options,() => console.log('Server is running on http://localhost:4003'))

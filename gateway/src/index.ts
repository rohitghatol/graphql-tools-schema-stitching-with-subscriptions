import {GraphQLServer, Options} from 'graphql-yoga'
import {mergeSchemas} from 'graphql-tools';
import {getRemoteSchema} from "./remote-schema/";

const start = async () => {

    console.log('Starting...');

    const actorSchema = await getRemoteSchema('http://localhost:4001/','ws://localhost:4001/');
    const movieSchema = await getRemoteSchema('http://localhost:4002/','ws://localhost:4002/');
    const genreSchema = await getRemoteSchema('http://localhost:4003/','ws://localhost:4003/');

    const extendedSchema = `
        extend type Movie {
            actors: [Actor!]!
            genre: [Genre!]!
        }
        extend type Genre {
            movies: [Movie!]!
        }
    `;

    const schema = mergeSchemas({
        schemas: [actorSchema, movieSchema, genreSchema, extendedSchema],

        resolvers: mergeInfo => ({
            Genre: {
                movies: {
                    fragment: `fragment GenreFragment on Genre { movieIds }`,
                    resolve(parent, args, context, info) {
                        const movieIds = parent.movieIds;
                        const whereClause = {
                            where: {movieId_in: movieIds}
                        };
                        if(movieIds && movieIds.length>0) {
                            return mergeInfo.delegate(
                                'query',
                                'movies',
                                whereClause,
                                context,
                                info,
                            );
                        }
                        else {
                            return [];
                        }
                    },
                },
            },
            Movie: {
                actors: {
                    fragment: `fragment MovieFragment on Movie { actorIds }`,
                    resolve(parent, args, context, info) {
                        const actorIds = parent.actorIds;
                        const whereClause = {
                            where: {actorId_in: actorIds}
                        };
                        if(actorIds && actorIds.length>0) {
                            return mergeInfo.delegate(
                                'query',
                                'actors',
                                whereClause,
                                context,
                                info,
                            );
                        }
                        else {
                            return [];
                        }
                    },
                },
                genre:{
                    fragment: `fragment MovieFragment on Movie { genreId }`,
                    resolve(parent, args, context, info) {
                        const genreId = parent.genreId;
                        const whereClause = {
                            where: {genreId: genreId}
                        };
                        if(genreId) {
                            return mergeInfo.delegate(
                                'query',
                                'genres',
                                whereClause,
                                context,
                                info,
                            );
                        }
                        else {
                            return null;
                        }
                    },
                }
            }
        })
    });
    const server = new GraphQLServer({
        schema
    });

    const options: Options = {
        port: 4000
    }
    server.start((options) => console.log('Server is running on http://localhost:4000'))
}

start();
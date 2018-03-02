# GraphQL Tools Schema Stitching with Subscriptions

This repository is an example of using `graphql-tools` `schema-stiching`to stitching together multiple remote schemas which also have subscriptions.

# GraphQL Services and Gateway


![Deployment Diagram](screenshots/deployment.png?raw=true )


We have 3 GraphQL Services 
* Actor Service
* Movie Service
* Genre Service

# Actor Service

## Schema

```graphql
enum Gender{
  MALE
  FEMALE
  OTHER
}

type Actor {
  id: ID! @unique
  actorId: String! @unique
  firstName: String!
  lastName: String!
  gender: Gender!
}

type Query {
  actors(where: ActorWhereInput, orderBy: ActorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Actor]!
}

type Mutation {
  createActor(data: ActorCreateInput!): Actor!
  updateActor(data: ActorUpdateInput!, where: ActorWhereUniqueInput!): Actor
  deleteActor(where: ActorWhereUniqueInput!): Actor
}

type Subscription {
  actor(where: ActorSubscriptionWhereInput): ActorSubscriptionPayload

}

```

# Movie Service 

## Schema 

```graphql
type Movie {
  id: ID! @unique
  movieId: String! @unique
  name: String!
  actorIds: [String!]!
  genreId: String
}

type Query {
  movies(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Movie]!
}

type Mutation {
  createMovie(data: MovieCreateInput!): Movie!
  updateMovie(data: MovieUpdateInput!, where: MovieWhereUniqueInput!): Movie
  deleteMovie(where: MovieWhereUniqueInput!): Movie
}

type Subscription {
  movie(where: MovieSubscriptionWhereInput): MovieSubscriptionPayload

}
``` 

# Genre Service

## Schema

```graphql
type Genre {
  id: ID! @unique
  genreId: String! @unique
  name: String!
  movieIds: [String!]!
}

type Query {
  genres(where: GenreWhereInput, orderBy: GenreOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Genre]!
}

type Mutation {
  createGenre(data: GenreCreateInput!): Genre!
  updateGenre(data: GenreUpdateInput!, where: GenreWhereUniqueInput!): Genre
  deleteGenre(where: GenreWhereUniqueInput!): Genre
}

type Subscription {
  genre(where: GenreSubscriptionWhereInput): GenreSubscriptionPayload

}
```


# Gateway

## Schema

```graphql
enum Gender{
  MALE
  FEMALE
  OTHER
}

type Actor {
  id: ID! @unique
  actorId: String! @unique
  firstName: String!
  lastName: String!
  gender: Gender!
}

type Movie {
  id: ID! @unique
  movieId: String! @unique
  name: String!
  actorIds: [String!]!
  genreId: String
  actors: [Actor!]!
  genre: Genre
}

type Genre {
  id: ID! @unique
  genreId: String! @unique
  name: String!
  movieIds: [String!]!
  movies: [Movie!]!
}

type Query {
  actors(where: ActorWhereInput, orderBy: ActorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Actor]!
  movies(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Movie]!
  genres(where: GenreWhereInput, orderBy: GenreOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Genre]!

}

type Mutation {
  createActor(data: ActorCreateInput!): Actor!
  updateActor(data: ActorUpdateInput!, where: ActorWhereUniqueInput!): Actor
  deleteActor(where: ActorWhereUniqueInput!): Actor
  createMovie(data: MovieCreateInput!): Movie!
  updateMovie(data: MovieUpdateInput!, where: MovieWhereUniqueInput!): Movie
  deleteMovie(where: MovieWhereUniqueInput!): Movie
  createGenre(data: GenreCreateInput!): Genre!
  updateGenre(data: GenreUpdateInput!, where: GenreWhereUniqueInput!): Genre
  deleteGenre(where: GenreWhereUniqueInput!): Genre
}

type Subscription {
  actor(where: ActorSubscriptionWhereInput): ActorSubscriptionPayload
  movie(where: MovieSubscriptionWhereInput): MovieSubscriptionPayload
  genre(where: GenreSubscriptionWhereInput): GenreSubscriptionPayload

}
```


# Demo

## Stitching Genre with Movie with Actor

![Demo Screenshot](screenshots/schema-stitching-appending-data.png?raw=true )

## Subscribing to Genre, Movie and Actor Changes

 ![Demo Screenshot](screenshots/genre-subscription-before.png?raw=true )
 
 ![Demo Screenshot](screenshots/movie-subscription-before.png?raw=true )
 
 ![Demo Screenshot](screenshots/actor-subscription-before.png?raw=true )
 
 ## Firing Mutation to Create Genre, Movie and Actor
  ![Demo Screenshot](screenshots/create-mutation.png?raw=true )

 
 ## Receiving New Data from Subscription
  
 ![Demo Screenshot](screenshots/genre-subscription-after.png?raw=true )
  
 ![Demo Screenshot](screenshots/movie-subscription-after.png?raw=true )
  
 ![Demo Screenshot](screenshots/actor-subscription-after.png?raw=true )
  

# Schema Stitching

__GraphQL Gateway Code__
```javascript
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
```

To make the Subscriptions works via a GraphQL API Gateway, we have to split between http and websocket in remote schema creation part

```javascript
import { HttpLink } from 'apollo-link-http';
import {split} from 'apollo-client-preset'
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities'
import * as ws from 'ws';
import { SubscriptionClient } from 'subscriptions-transport-ws/dist/client';

import fetch from 'node-fetch';
import {introspectSchema, makeRemoteExecutableSchema} from 'graphql-tools';
import {GraphQLSchema} from "graphql";


export const getRemoteSchema =  async (uri: String, subUri: String): Promise<GraphQLSchema> => {
    const httpLink = new HttpLink({ uri, fetch });
    const wsLink = new SubscriptionClient(subUri,{
        reconnect: true
    }, ws);

    const link = split(
        ({query}) => {
            const {kind, operation} = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink,
        httpLink,
    );
    const schema = await introspectSchema(httpLink);

    const executableSchema = makeRemoteExecutableSchema({
        schema,
        link,
    });
    return executableSchema;
}

```
  
# Development Setup

## Prerequistes

* Latest Node JS
* Prisma CLI 1.3

## Steps

__Terminal 1__
```bash
$>cd service1
$>npm install
$>prisma deploy
$>npm start
```
__Terminal 2__
```bash
$>cd service2
$>npm install
$>prisma deploy
$>npm start
```

__Terminal 3__
```bash
$>cd service3
$>npm install
$>prisma deploy
$>npm start
```

__Terminal 4__
```bash
$>cd gateway
$>npm install
$>npm start
``` 

__Browser__

```http://localhost:4000```

__GraphQL Playground Tab 1__

```graphql
{
  genres{
    name    
    movies{
			name 
      actors{
        firstName
        lastName
        gender
      }
    }
  } 
}
```

__GraphQL Playground Tab 2__

```graphql
subscription {
  genre {
    node {
      genreId
      name      
    }
  }
}

```

__GraphQL Playground Tab 3__
```graphql
subscription {
  movie {
    node {
      movieId
      name      
    }
  }
}

```

__GraphQL Playground Tab 4__
```graphql
subscription {
  actor {
    node {
      actorId
      firstName
      lastName
      gender
    }
  }
}

```

__GraphQL Playground Tab 5__

```graphql
mutation {
  createGenre(data: {genreId: "scifi", name: "Sci-fi"}) {
    id
    name
  }
  createMovie(data: {movieId: "stargate", name: "StarGate"}) {
    id
    name
  }
  createActor(data: {actorId: "kurt-russell", firstName: "Kurt", lastName: "Russell", gender: MALE}) {
    id
    firstName
    lastName
  }
}

```
import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type Movie implements Node {
  id: ID!
  movieId: String!
  name: String!
  actorIds: [String!]
  genreId: String
}

type AggregateMovie {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

"""
A connection to a list of items.
"""
type MovieConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [MovieEdge]!
  aggregate: AggregateMovie!
}

input MovieCreateactorIdsInput {
  set: [String!]
}

input MovieCreateInput {
  movieId: String!
  name: String!
  genreId: String
  actorIds: MovieCreateactorIdsInput
}

"""
An edge in a connection.
"""
type MovieEdge {
  """
  The item at the end of the edge.
  """
  node: Movie!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum MovieOrderByInput {
  id_ASC
  id_DESC
  movieId_ASC
  movieId_DESC
  name_ASC
  name_DESC
  genreId_ASC
  genreId_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type MoviePreviousValues {
  id: ID!
  movieId: String!
  name: String!
  actorIds: [String!]
  genreId: String
}

type MovieSubscriptionPayload {
  mutation: MutationType!
  node: Movie
  updatedFields: [String!]
  previousValues: MoviePreviousValues
}

input MovieSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [MovieSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [MovieSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: MovieWhereInput
}

input MovieUpdateactorIdsInput {
  set: [String!]
}

input MovieUpdateInput {
  movieId: String
  name: String
  genreId: String
  actorIds: MovieUpdateactorIdsInput
}

input MovieWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [MovieWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [MovieWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  movieId: String
  """
  All values that are not equal to given value.
  """
  movieId_not: String
  """
  All values that are contained in given list.
  """
  movieId_in: [String!]
  """
  All values that are not contained in given list.
  """
  movieId_not_in: [String!]
  """
  All values less than the given value.
  """
  movieId_lt: String
  """
  All values less than or equal the given value.
  """
  movieId_lte: String
  """
  All values greater than the given value.
  """
  movieId_gt: String
  """
  All values greater than or equal the given value.
  """
  movieId_gte: String
  """
  All values containing the given string.
  """
  movieId_contains: String
  """
  All values not containing the given string.
  """
  movieId_not_contains: String
  """
  All values starting with the given string.
  """
  movieId_starts_with: String
  """
  All values not starting with the given string.
  """
  movieId_not_starts_with: String
  """
  All values ending with the given string.
  """
  movieId_ends_with: String
  """
  All values not ending with the given string.
  """
  movieId_not_ends_with: String
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  genreId: String
  """
  All values that are not equal to given value.
  """
  genreId_not: String
  """
  All values that are contained in given list.
  """
  genreId_in: [String!]
  """
  All values that are not contained in given list.
  """
  genreId_not_in: [String!]
  """
  All values less than the given value.
  """
  genreId_lt: String
  """
  All values less than or equal the given value.
  """
  genreId_lte: String
  """
  All values greater than the given value.
  """
  genreId_gt: String
  """
  All values greater than or equal the given value.
  """
  genreId_gte: String
  """
  All values containing the given string.
  """
  genreId_contains: String
  """
  All values not containing the given string.
  """
  genreId_not_contains: String
  """
  All values starting with the given string.
  """
  genreId_starts_with: String
  """
  All values not starting with the given string.
  """
  genreId_not_starts_with: String
  """
  All values ending with the given string.
  """
  genreId_ends_with: String
  """
  All values not ending with the given string.
  """
  genreId_not_ends_with: String
}

input MovieWhereUniqueInput {
  id: ID
  movieId: String
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

type Mutation {
  createMovie(data: MovieCreateInput!): Movie!
  updateMovie(data: MovieUpdateInput!, where: MovieWhereUniqueInput!): Movie
  deleteMovie(where: MovieWhereUniqueInput!): Movie
  upsertMovie(where: MovieWhereUniqueInput!, create: MovieCreateInput!, update: MovieUpdateInput!): Movie!
  updateManyMovies(data: MovieUpdateInput!, where: MovieWhereInput!): BatchPayload!
  deleteManyMovies(where: MovieWhereInput!): BatchPayload!
}

type Query {
  movies(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Movie]!
  movie(where: MovieWhereUniqueInput!): Movie
  moviesConnection(where: MovieWhereInput, orderBy: MovieOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MovieConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  movie(where: MovieSubscriptionWhereInput): MovieSubscriptionPayload
}
`

export type MovieOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'movieId_ASC' |
  'movieId_DESC' |
  'name_ASC' |
  'name_DESC' |
  'genreId_ASC' |
  'genreId_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface MovieCreateInput {
  movieId: String
  name: String
  genreId?: String
  actorIds?: MovieCreateactorIdsInput
}

export interface MovieCreateactorIdsInput {
  set?: String[] | String
}

export interface MovieUpdateInput {
  movieId?: String
  name?: String
  genreId?: String
  actorIds?: MovieUpdateactorIdsInput
}

export interface MovieWhereUniqueInput {
  id?: ID_Input
  movieId?: String
}

export interface MovieUpdateactorIdsInput {
  set?: String[] | String
}

export interface MovieSubscriptionWhereInput {
  AND?: MovieSubscriptionWhereInput[] | MovieSubscriptionWhereInput
  OR?: MovieSubscriptionWhereInput[] | MovieSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: MovieWhereInput
}

export interface MovieWhereInput {
  AND?: MovieWhereInput[] | MovieWhereInput
  OR?: MovieWhereInput[] | MovieWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  movieId?: String
  movieId_not?: String
  movieId_in?: String[] | String
  movieId_not_in?: String[] | String
  movieId_lt?: String
  movieId_lte?: String
  movieId_gt?: String
  movieId_gte?: String
  movieId_contains?: String
  movieId_not_contains?: String
  movieId_starts_with?: String
  movieId_not_starts_with?: String
  movieId_ends_with?: String
  movieId_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  genreId?: String
  genreId_not?: String
  genreId_in?: String[] | String
  genreId_not_in?: String[] | String
  genreId_lt?: String
  genreId_lte?: String
  genreId_gt?: String
  genreId_gte?: String
  genreId_contains?: String
  genreId_not_contains?: String
  genreId_starts_with?: String
  genreId_not_starts_with?: String
  genreId_ends_with?: String
  genreId_not_ends_with?: String
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

/*
 * An edge in a connection.

 */
export interface MovieEdge {
  node: Movie
  cursor: String
}

export interface BatchPayload {
  count: Long
}

export interface MoviePreviousValues {
  id: ID_Output
  movieId: String
  name: String
  actorIds?: String[]
  genreId?: String
}

export interface MovieSubscriptionPayload {
  mutation: MutationType
  node?: Movie
  updatedFields?: String[]
  previousValues?: MoviePreviousValues
}

export interface AggregateMovie {
  count: Int
}

export interface Movie extends Node {
  id: ID_Output
  movieId: String
  name: String
  actorIds?: String[]
  genreId?: String
}

/*
 * A connection to a list of items.

 */
export interface MovieConnection {
  pageInfo: PageInfo
  edges: MovieEdge[]
  aggregate: AggregateMovie
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  movies: (args: { where?: MovieWhereInput, orderBy?: MovieOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Movie[]>
  movie: (args: { where: MovieWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Movie | null>
  moviesConnection: (args: { where?: MovieWhereInput, orderBy?: MovieOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<MovieConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createMovie: (args: { data: MovieCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Movie>
  updateMovie: (args: { data: MovieUpdateInput, where: MovieWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Movie | null>
  deleteMovie: (args: { where: MovieWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Movie | null>
  upsertMovie: (args: { where: MovieWhereUniqueInput, create: MovieCreateInput, update: MovieUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Movie>
  updateManyMovies: (args: { data: MovieUpdateInput, where: MovieWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyMovies: (args: { where: MovieWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  movie: (args: { where?: MovieSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<MovieSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    Movie: (where: MovieWhereInput): Promise<boolean> => super.existsDelegate('query', 'movies', { where }, {}, '{ id }')
  }

  query: Query = {
    movies: (args, info): Promise<Movie[]> => super.delegate('query', 'movies', args, {}, info),
    movie: (args, info): Promise<Movie | null> => super.delegate('query', 'movie', args, {}, info),
    moviesConnection: (args, info): Promise<MovieConnection> => super.delegate('query', 'moviesConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createMovie: (args, info): Promise<Movie> => super.delegate('mutation', 'createMovie', args, {}, info),
    updateMovie: (args, info): Promise<Movie | null> => super.delegate('mutation', 'updateMovie', args, {}, info),
    deleteMovie: (args, info): Promise<Movie | null> => super.delegate('mutation', 'deleteMovie', args, {}, info),
    upsertMovie: (args, info): Promise<Movie> => super.delegate('mutation', 'upsertMovie', args, {}, info),
    updateManyMovies: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyMovies', args, {}, info),
    deleteManyMovies: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyMovies', args, {}, info)
  }

  subscription: Subscription = {
    movie: (args, infoOrQuery): Promise<AsyncIterator<MovieSubscriptionPayload>> => super.delegateSubscription('movie', args, {}, infoOrQuery)
  }
}
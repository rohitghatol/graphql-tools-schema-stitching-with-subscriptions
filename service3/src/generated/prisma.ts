import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type Genre implements Node {
  id: ID!
  genreId: String!
  name: String!
  movieIds: [String!]
}

type AggregateGenre {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

"""
A connection to a list of items.
"""
type GenreConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [GenreEdge]!
  aggregate: AggregateGenre!
}

input GenreCreateInput {
  genreId: String!
  name: String!
  movieIds: GenreCreatemovieIdsInput
}

input GenreCreatemovieIdsInput {
  set: [String!]
}

"""
An edge in a connection.
"""
type GenreEdge {
  """
  The item at the end of the edge.
  """
  node: Genre!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum GenreOrderByInput {
  id_ASC
  id_DESC
  genreId_ASC
  genreId_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type GenrePreviousValues {
  id: ID!
  genreId: String!
  name: String!
  movieIds: [String!]
}

type GenreSubscriptionPayload {
  mutation: MutationType!
  node: Genre
  updatedFields: [String!]
  previousValues: GenrePreviousValues
}

input GenreSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [GenreSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [GenreSubscriptionWhereInput!]
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
  node: GenreWhereInput
}

input GenreUpdateInput {
  genreId: String
  name: String
  movieIds: GenreUpdatemovieIdsInput
}

input GenreUpdatemovieIdsInput {
  set: [String!]
}

input GenreWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [GenreWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [GenreWhereInput!]
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
}

input GenreWhereUniqueInput {
  id: ID
  genreId: String
}

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

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
  createGenre(data: GenreCreateInput!): Genre!
  updateGenre(data: GenreUpdateInput!, where: GenreWhereUniqueInput!): Genre
  deleteGenre(where: GenreWhereUniqueInput!): Genre
  upsertGenre(where: GenreWhereUniqueInput!, create: GenreCreateInput!, update: GenreUpdateInput!): Genre!
  updateManyGenres(data: GenreUpdateInput!, where: GenreWhereInput!): BatchPayload!
  deleteManyGenres(where: GenreWhereInput!): BatchPayload!
}

type Query {
  genres(where: GenreWhereInput, orderBy: GenreOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Genre]!
  genre(where: GenreWhereUniqueInput!): Genre
  genresConnection(where: GenreWhereInput, orderBy: GenreOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): GenreConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  genre(where: GenreSubscriptionWhereInput): GenreSubscriptionPayload
}
`

export type GenreOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'genreId_ASC' |
  'genreId_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface GenreCreateInput {
  genreId: String
  name: String
  movieIds?: GenreCreatemovieIdsInput
}

export interface GenreCreatemovieIdsInput {
  set?: String[] | String
}

export interface GenreUpdateInput {
  genreId?: String
  name?: String
  movieIds?: GenreUpdatemovieIdsInput
}

export interface GenreWhereUniqueInput {
  id?: ID_Input
  genreId?: String
}

export interface GenreUpdatemovieIdsInput {
  set?: String[] | String
}

export interface GenreSubscriptionWhereInput {
  AND?: GenreSubscriptionWhereInput[] | GenreSubscriptionWhereInput
  OR?: GenreSubscriptionWhereInput[] | GenreSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: GenreWhereInput
}

export interface GenreWhereInput {
  AND?: GenreWhereInput[] | GenreWhereInput
  OR?: GenreWhereInput[] | GenreWhereInput
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
export interface GenreEdge {
  node: Genre
  cursor: String
}

export interface BatchPayload {
  count: Long
}

export interface GenrePreviousValues {
  id: ID_Output
  genreId: String
  name: String
  movieIds?: String[]
}

export interface GenreSubscriptionPayload {
  mutation: MutationType
  node?: Genre
  updatedFields?: String[]
  previousValues?: GenrePreviousValues
}

export interface AggregateGenre {
  count: Int
}

export interface Genre extends Node {
  id: ID_Output
  genreId: String
  name: String
  movieIds?: String[]
}

/*
 * A connection to a list of items.

 */
export interface GenreConnection {
  pageInfo: PageInfo
  edges: GenreEdge[]
  aggregate: AggregateGenre
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
  genres: (args: { where?: GenreWhereInput, orderBy?: GenreOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Genre[]>
  genre: (args: { where: GenreWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Genre | null>
  genresConnection: (args: { where?: GenreWhereInput, orderBy?: GenreOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<GenreConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createGenre: (args: { data: GenreCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Genre>
  updateGenre: (args: { data: GenreUpdateInput, where: GenreWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Genre | null>
  deleteGenre: (args: { where: GenreWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Genre | null>
  upsertGenre: (args: { where: GenreWhereUniqueInput, create: GenreCreateInput, update: GenreUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Genre>
  updateManyGenres: (args: { data: GenreUpdateInput, where: GenreWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyGenres: (args: { where: GenreWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  genre: (args: { where?: GenreSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<GenreSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    Genre: (where: GenreWhereInput): Promise<boolean> => super.existsDelegate('query', 'genres', { where }, {}, '{ id }')
  }

  query: Query = {
    genres: (args, info): Promise<Genre[]> => super.delegate('query', 'genres', args, {}, info),
    genre: (args, info): Promise<Genre | null> => super.delegate('query', 'genre', args, {}, info),
    genresConnection: (args, info): Promise<GenreConnection> => super.delegate('query', 'genresConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createGenre: (args, info): Promise<Genre> => super.delegate('mutation', 'createGenre', args, {}, info),
    updateGenre: (args, info): Promise<Genre | null> => super.delegate('mutation', 'updateGenre', args, {}, info),
    deleteGenre: (args, info): Promise<Genre | null> => super.delegate('mutation', 'deleteGenre', args, {}, info),
    upsertGenre: (args, info): Promise<Genre> => super.delegate('mutation', 'upsertGenre', args, {}, info),
    updateManyGenres: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyGenres', args, {}, info),
    deleteManyGenres: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyGenres', args, {}, info)
  }

  subscription: Subscription = {
    genre: (args, infoOrQuery): Promise<AsyncIterator<GenreSubscriptionPayload>> => super.delegateSubscription('genre', args, {}, infoOrQuery)
  }
}
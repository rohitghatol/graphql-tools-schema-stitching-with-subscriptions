import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type Actor implements Node {
  id: ID!
  actorId: String!
  firstName: String!
  lastName: String!
  gender: Gender!
}

"""
A connection to a list of items.
"""
type ActorConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ActorEdge]!
  aggregate: AggregateActor!
}

input ActorCreateInput {
  actorId: String!
  firstName: String!
  lastName: String!
  gender: Gender!
}

"""
An edge in a connection.
"""
type ActorEdge {
  """
  The item at the end of the edge.
  """
  node: Actor!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ActorOrderByInput {
  id_ASC
  id_DESC
  actorId_ASC
  actorId_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  gender_ASC
  gender_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ActorPreviousValues {
  id: ID!
  actorId: String!
  firstName: String!
  lastName: String!
  gender: Gender!
}

type ActorSubscriptionPayload {
  mutation: MutationType!
  node: Actor
  updatedFields: [String!]
  previousValues: ActorPreviousValues
}

input ActorSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ActorSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ActorSubscriptionWhereInput!]
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
  node: ActorWhereInput
}

input ActorUpdateInput {
  actorId: String
  firstName: String
  lastName: String
  gender: Gender
}

input ActorWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ActorWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ActorWhereInput!]
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
  actorId: String
  """
  All values that are not equal to given value.
  """
  actorId_not: String
  """
  All values that are contained in given list.
  """
  actorId_in: [String!]
  """
  All values that are not contained in given list.
  """
  actorId_not_in: [String!]
  """
  All values less than the given value.
  """
  actorId_lt: String
  """
  All values less than or equal the given value.
  """
  actorId_lte: String
  """
  All values greater than the given value.
  """
  actorId_gt: String
  """
  All values greater than or equal the given value.
  """
  actorId_gte: String
  """
  All values containing the given string.
  """
  actorId_contains: String
  """
  All values not containing the given string.
  """
  actorId_not_contains: String
  """
  All values starting with the given string.
  """
  actorId_starts_with: String
  """
  All values not starting with the given string.
  """
  actorId_not_starts_with: String
  """
  All values ending with the given string.
  """
  actorId_ends_with: String
  """
  All values not ending with the given string.
  """
  actorId_not_ends_with: String
  firstName: String
  """
  All values that are not equal to given value.
  """
  firstName_not: String
  """
  All values that are contained in given list.
  """
  firstName_in: [String!]
  """
  All values that are not contained in given list.
  """
  firstName_not_in: [String!]
  """
  All values less than the given value.
  """
  firstName_lt: String
  """
  All values less than or equal the given value.
  """
  firstName_lte: String
  """
  All values greater than the given value.
  """
  firstName_gt: String
  """
  All values greater than or equal the given value.
  """
  firstName_gte: String
  """
  All values containing the given string.
  """
  firstName_contains: String
  """
  All values not containing the given string.
  """
  firstName_not_contains: String
  """
  All values starting with the given string.
  """
  firstName_starts_with: String
  """
  All values not starting with the given string.
  """
  firstName_not_starts_with: String
  """
  All values ending with the given string.
  """
  firstName_ends_with: String
  """
  All values not ending with the given string.
  """
  firstName_not_ends_with: String
  lastName: String
  """
  All values that are not equal to given value.
  """
  lastName_not: String
  """
  All values that are contained in given list.
  """
  lastName_in: [String!]
  """
  All values that are not contained in given list.
  """
  lastName_not_in: [String!]
  """
  All values less than the given value.
  """
  lastName_lt: String
  """
  All values less than or equal the given value.
  """
  lastName_lte: String
  """
  All values greater than the given value.
  """
  lastName_gt: String
  """
  All values greater than or equal the given value.
  """
  lastName_gte: String
  """
  All values containing the given string.
  """
  lastName_contains: String
  """
  All values not containing the given string.
  """
  lastName_not_contains: String
  """
  All values starting with the given string.
  """
  lastName_starts_with: String
  """
  All values not starting with the given string.
  """
  lastName_not_starts_with: String
  """
  All values ending with the given string.
  """
  lastName_ends_with: String
  """
  All values not ending with the given string.
  """
  lastName_not_ends_with: String
  gender: Gender
  """
  All values that are not equal to given value.
  """
  gender_not: Gender
  """
  All values that are contained in given list.
  """
  gender_in: [Gender!]
  """
  All values that are not contained in given list.
  """
  gender_not_in: [Gender!]
}

input ActorWhereUniqueInput {
  id: ID
  actorId: String
}

type AggregateActor {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

enum Gender {
  MALE
  FEMALE
  OTHER
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
  createActor(data: ActorCreateInput!): Actor!
  updateActor(data: ActorUpdateInput!, where: ActorWhereUniqueInput!): Actor
  deleteActor(where: ActorWhereUniqueInput!): Actor
  upsertActor(where: ActorWhereUniqueInput!, create: ActorCreateInput!, update: ActorUpdateInput!): Actor!
  updateManyActors(data: ActorUpdateInput!, where: ActorWhereInput!): BatchPayload!
  deleteManyActors(where: ActorWhereInput!): BatchPayload!
}

type Query {
  actors(where: ActorWhereInput, orderBy: ActorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Actor]!
  actor(where: ActorWhereUniqueInput!): Actor
  actorsConnection(where: ActorWhereInput, orderBy: ActorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActorConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  actor(where: ActorSubscriptionWhereInput): ActorSubscriptionPayload
}
`

export type ActorOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'actorId_ASC' |
  'actorId_DESC' |
  'firstName_ASC' |
  'firstName_DESC' |
  'lastName_ASC' |
  'lastName_DESC' |
  'gender_ASC' |
  'gender_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Gender = 
  'MALE' |
  'FEMALE' |
  'OTHER'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface ActorCreateInput {
  actorId: String
  firstName: String
  lastName: String
  gender: Gender
}

export interface ActorWhereUniqueInput {
  id?: ID_Input
  actorId?: String
}

export interface ActorUpdateInput {
  actorId?: String
  firstName?: String
  lastName?: String
  gender?: Gender
}

export interface ActorSubscriptionWhereInput {
  AND?: ActorSubscriptionWhereInput[] | ActorSubscriptionWhereInput
  OR?: ActorSubscriptionWhereInput[] | ActorSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ActorWhereInput
}

export interface ActorWhereInput {
  AND?: ActorWhereInput[] | ActorWhereInput
  OR?: ActorWhereInput[] | ActorWhereInput
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
  actorId?: String
  actorId_not?: String
  actorId_in?: String[] | String
  actorId_not_in?: String[] | String
  actorId_lt?: String
  actorId_lte?: String
  actorId_gt?: String
  actorId_gte?: String
  actorId_contains?: String
  actorId_not_contains?: String
  actorId_starts_with?: String
  actorId_not_starts_with?: String
  actorId_ends_with?: String
  actorId_not_ends_with?: String
  firstName?: String
  firstName_not?: String
  firstName_in?: String[] | String
  firstName_not_in?: String[] | String
  firstName_lt?: String
  firstName_lte?: String
  firstName_gt?: String
  firstName_gte?: String
  firstName_contains?: String
  firstName_not_contains?: String
  firstName_starts_with?: String
  firstName_not_starts_with?: String
  firstName_ends_with?: String
  firstName_not_ends_with?: String
  lastName?: String
  lastName_not?: String
  lastName_in?: String[] | String
  lastName_not_in?: String[] | String
  lastName_lt?: String
  lastName_lte?: String
  lastName_gt?: String
  lastName_gte?: String
  lastName_contains?: String
  lastName_not_contains?: String
  lastName_starts_with?: String
  lastName_not_starts_with?: String
  lastName_ends_with?: String
  lastName_not_ends_with?: String
  gender?: Gender
  gender_not?: Gender
  gender_in?: Gender[] | Gender
  gender_not_in?: Gender[] | Gender
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface ActorPreviousValues {
  id: ID_Output
  actorId: String
  firstName: String
  lastName: String
  gender: Gender
}

export interface BatchPayload {
  count: Long
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

export interface ActorSubscriptionPayload {
  mutation: MutationType
  node?: Actor
  updatedFields?: String[]
  previousValues?: ActorPreviousValues
}

export interface Actor extends Node {
  id: ID_Output
  actorId: String
  firstName: String
  lastName: String
  gender: Gender
}

/*
 * A connection to a list of items.

 */
export interface ActorConnection {
  pageInfo: PageInfo
  edges: ActorEdge[]
  aggregate: AggregateActor
}

export interface AggregateActor {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface ActorEdge {
  node: Actor
  cursor: String
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

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
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  actors: (args: { where?: ActorWhereInput, orderBy?: ActorOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Actor[]>
  actor: (args: { where: ActorWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Actor | null>
  actorsConnection: (args: { where?: ActorWhereInput, orderBy?: ActorOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ActorConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createActor: (args: { data: ActorCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Actor>
  updateActor: (args: { data: ActorUpdateInput, where: ActorWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Actor | null>
  deleteActor: (args: { where: ActorWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Actor | null>
  upsertActor: (args: { where: ActorWhereUniqueInput, create: ActorCreateInput, update: ActorUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Actor>
  updateManyActors: (args: { data: ActorUpdateInput, where: ActorWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyActors: (args: { where: ActorWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  actor: (args: { where?: ActorSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ActorSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    Actor: (where: ActorWhereInput): Promise<boolean> => super.existsDelegate('query', 'actors', { where }, {}, '{ id }')
  }

  query: Query = {
    actors: (args, info): Promise<Actor[]> => super.delegate('query', 'actors', args, {}, info),
    actor: (args, info): Promise<Actor | null> => super.delegate('query', 'actor', args, {}, info),
    actorsConnection: (args, info): Promise<ActorConnection> => super.delegate('query', 'actorsConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createActor: (args, info): Promise<Actor> => super.delegate('mutation', 'createActor', args, {}, info),
    updateActor: (args, info): Promise<Actor | null> => super.delegate('mutation', 'updateActor', args, {}, info),
    deleteActor: (args, info): Promise<Actor | null> => super.delegate('mutation', 'deleteActor', args, {}, info),
    upsertActor: (args, info): Promise<Actor> => super.delegate('mutation', 'upsertActor', args, {}, info),
    updateManyActors: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyActors', args, {}, info),
    deleteManyActors: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyActors', args, {}, info)
  }

  subscription: Subscription = {
    actor: (args, infoOrQuery): Promise<AsyncIterator<ActorSubscriptionPayload>> => super.delegateSubscription('actor', args, {}, infoOrQuery)
  }
}